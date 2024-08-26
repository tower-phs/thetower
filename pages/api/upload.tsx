/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { createClient } from "@supabase/supabase-js";
import { readFile } from "fs/promises";
import { uploadArticle, uploadMulti, uploadSpread } from "~/lib/queries";

// console.log(process.env, process.env.DATABASE_URL, process.env.DATABASE_KEY)
if (process.env.SERVICE_ROLE == undefined) {
	throw new Error("Set up your .env!");
}
const supabase = createClient("https://yusjougmsdnhcsksadaw.supabase.co/", process.env.SERVICE_ROLE);

async function uploadFile(file: formidable.File, bucket: string) {
	const fileContent = await readFile(file.filepath);
	const { data, error } = await supabase.storage
		.from(bucket)
		.upload(`unverified/${file.originalFilename}`, fileContent, { contentType: file.mimetype || "file/unknown", upsert: false });
	if (error) {
		console.error("we have a problem:", error);
		
		//@ts-ignore
		// error.statusCode exists but for some reason ts says it doesn't
		if (error.statusCode == "409") return { code: 409, message: "A file with that name already exists. Has your co-editor uploaded for you?"} 
		
		//@ts-ignore
		// error.error & error.message exist but for some reason ts says they don't
		return { code: 500, message: `Unexpected problem in the server! Message: "${error.error}: ${error.message}". Contact Online editor(s).`}
	} else {
		console.log("File uploaded to ", data.fullPath);
		return { code: 200, message: supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl }
	}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") return res.status(400).json({ error: "Invalid method" });

	const form = formidable({ multiples: false });
	
	form.parse(req, async (err: any, fields: formidable.Fields, files: formidable.Files) => {
		if (err) {
			console.error("Error parsing form data:", err);
			return res.status(500).json({ error: "Error parsing form data" });
		}
		
		const today = new Date();

		if (!fields.category) return res.status(500).json({message: "Did you provide a category?"})
		if (fields.category[0] == "vanguard") {
			if (!files.spread) return res.status(500).json({message: "Did you upload a spread?"})
			let upload = await uploadFile(files.spread[0], "spreads")
			if (upload.code != 200) return res.status(upload.code).json({ message: upload.message })
			try {
				await uploadSpread({
					title: fields.title ? fields.title[0] : "No title provided",
					src: upload.message,
					month: today.getMonth(),
					year: today.getFullYear()
				})
				return res.status(200).json({ message: "Uploaded!" })
			} catch (e) {
				return res.status(500).json({ message: `Unexpected problem in the server! Message: ${e}` })
			}
		} else if (fields.category[0] == "multimedia") {
			if (!fields.subcategory || !fields.multi) return res.status(500).json({message: "Did you provide a subcategory and a link to the resource?"})
			try {
				await uploadMulti({
					format: fields.subcategory[0],
					src_id: fields.multi[0],
					month: today.getMonth(),
					year: today.getFullYear(),
					title: fields.title ? fields.title[0] : ""
				})
				return res.status(200).json({ message: "Uploaded!" })
			} catch (e) {
				return res.status(500).json({ message: `Unexpected problem in the server! Message: ${e}` })
			}

		} else {
			let imgURL = "";
			if (files.img) {
					let upload = await uploadFile(files.img[0], "images")
					if (upload.code != 200) return res.status(upload.code).json({ message: upload.message })
					imgURL = upload.message
			}

			if (!fields.subcategory || !fields.title || !fields.authors || !fields.content) return res.status(500).json({message: "you shouldn't be here?"})

			const articleInfo = {
				category: fields.category[0],
				subcategory: fields.subcategory[0],
				title: fields.title[0],
				authors: JSON.parse(fields.authors[0]),
				content: fields.content[0],
				img: imgURL,
				month: today.getMonth(),
				year: today.getFullYear(),
				markdown: true,
			};

			try {
				uploadArticle(articleInfo);
			} catch (e) {
				console.log(e);
				return res.status(500).json({ message: `Unexpected problem in the server! Message: ${e}` });
			}

			return res.status(200).json({ message: "Uploaded!" });
		}
	});
}

export const config = {
	api: {
		bodyParser: false,
	},
};
