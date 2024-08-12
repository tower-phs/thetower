/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { createClient } from "@supabase/supabase-js";
import { readFile } from "fs/promises";
import { uploadArticle } from "~/lib/queries";

// console.log(process.env, process.env.DATABASE_URL, process.env.DATABASE_KEY)
if (process.env.SERVICE_ROLE == undefined) {
	throw new Error("Set up your .env!");
}
const supabase = createClient("https://yusjougmsdnhcsksadaw.supabase.co/", process.env.SERVICE_ROLE);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") return res.status(400).json({ error: "Invalid method" });

	const form = formidable({ multiples: false });

	form.parse(req, async (err: any, fields: formidable.Fields, files: formidable.Files) => {
		if (err) {
			console.error("Error parsing form data:", err);
			return res.status(500).json({ error: "Error parsing form data" });
		}

		console.log("we made it");
		console.log(fields);

		let imgURL = "";
		if (fields.category[0] == "vanguard") {
		} else if (fields.category[0] == "multimedia") {
		} else {
			if (files.img) {
				const file = files.img[0];
				const fileContent = await readFile(file.filepath);
				const { data, error } = await supabase.storage
					.from("images")
					.upload(`unverified/${file.originalFilename}`, fileContent, { contentType: file.mimetype, upsert: false });
				if (error) {
					console.error("we have a problem:", error);
					if (error.statusCode == "409")
						return res.status(409).json({ message: "A file with that name already exists. Has your co-editor uploaded for you?" });
					return res
						.status(500)
						.json({
							message: `Unexpected problem in the server! Message: "${error.error}: ${error.message}". Contact Online editor(s).`,
						});
				} else {
					console.log("Image uploaded to ", data.fullPath);
					imgURL = supabase.storage.from("images").getPublicUrl(data.path).data.publicUrl;
				}
			}

			const today = new Date();
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
			console.log("Attempting to upload:", articleInfo);
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
