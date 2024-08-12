/** @format */

import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
// import MDEditor from "@uiw/react-md-editor";

export default function Upload() {
	type FormDataType = {
		category?: string | null | undefined;
		subcategory?: string | null | undefined;
		title?: string | null | undefined;
		authors?: string | null | undefined;
		content?: string | null | undefined;
		img?: File | null | undefined;
		spread?: File | null | undefined;
		yt?: string | null | undefined;
		rss?: string | null | undefined;
	};
	const [category, setCategory] = useState("");
	const [formData, setFormData] = useState<FormDataType>();
	const [uploadResponse, setUploadResponse] = useState("");
	// const [text, setText] = useState("Type your article here.")

	function changeCategory(event: ChangeEvent<HTMLSelectElement>) {
		setCategory(event.target.value);
		setFormData({ ...formData, category: event.target.value });
	}

	function changeSubcategory(event: ChangeEvent<HTMLSelectElement>) {
		setFormData({ ...formData, subcategory: event.target.value });
		// console.log(formData)
	}

	function updateTitle(event: ChangeEvent<HTMLInputElement>) {
		console.log(event.target.value);
		setFormData({ ...formData, title: event.target.value });
	}

	function updateAuthors(event: ChangeEvent<HTMLInputElement>) {
		console.log(event.target.value);
		setFormData({ ...formData, authors: event.target.value });
	}

	function updateContent(event: ChangeEvent<HTMLTextAreaElement>) {
		console.log(event.target.value);
		setFormData({ ...formData, content: event.target.value });
	}

	function updateImage(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files ? event.target.files[0] : null;
		setFormData({ ...formData, img: file });
	}

	async function submitArticle(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!formData) return;
		if (formData.category == "") return setUploadResponse("You need to select a category.");
		if (formData.category == "vanguard") {
			console.log("vang");
		} else if (formData.category == "multimedia") {
			console.log("multi");
		} else {
			if (!formData.title) return setUploadResponse("You need a title to upload a standard article.");
			// if (formData.category == "opinions" && formData.subcategory != "editorial" && !formData.authors) return setUploadResponse("You need to include an author (except for editorials).")
		}

		const authors = formData.authors ? formData.authors.split(", ") : [""];
		console.log("authors:", authors);

		let fd = new FormData();
		if (formData.category) fd.append("category", formData.category);
		// if (!formData.subcategory) setFormData({...formData, subcategory: formData.category})
		// fd.append("subcategory", formData.subcategory)
		if (formData.subcategory) {
			fd.append("subcategory", formData.subcategory);
		} else {
			fd.append("subcategory", formData.category);
		}
		if (formData.title) fd.append("title", formData.title);
		fd.append("authors", JSON.stringify(authors));
		if (formData.content) fd.append("content", formData.content);
		if (formData.img) fd.append("img", formData.img);
		console.log("Sending: ", formData);
		const response = await fetch("/api/upload", {
			method: "POST",
			body: fd,
		});

		// Handle response if necessary
		response.json().then(data => setUploadResponse(data.message));
	}

	return (
		<div>
			<Head>
				<title>Upload Articles | The Tower</title>
				<meta property="og:title" content="Upload Articles | The Tower" />
				<meta property="og:description" content="Section editors upload content here." />
			</Head>
			<div style={{ textAlign: "center" }}>
				<h1>PHS Tower Submission Platform</h1>
				<p>Upload articles for the next issue here. For editor use only.</p>
				<form onSubmit={submitArticle}>
					<h2>Section</h2>
					<select id="cat" onChange={changeCategory}>
						<option value="">Select category</option>
						<option value="news-features">News & Features</option>
						<option value="opinions">Opinions</option>
						<option value="vanguard">Vanguard</option>
						<option value="arts-entertainment">Arts & Entertainment</option>
						<option value="sports">Sports</option>
						<option value="multimedia">Multimedia</option>
					</select>
					<div id="subcats">
						<select style={{ display: category == "" ? "inline" : "none" }} disabled={true} onChange={changeSubcategory}>
							<option>Select subcategory</option>
						</select>
						<select id="newfe-subcat" style={{ display: category == "news-features" ? "inline" : "none" }} onChange={changeSubcategory}>
							<option value="">None</option>
							<option value="phs-profiles">PHS Profiles</option>
						</select>
						<select id="ops-subcat" style={{ display: category == "opinions" ? "inline" : "none" }} onChange={changeSubcategory}>
							<option value="">None</option>
							<option value="editorial">Editorials</option>
							<option value="cheers-jeers">Cheers & Jeers</option>
						</select>
						<select id="ae-subcat" style={{ display: category == "arts-entertainment" ? "inline" : "none" }} onChange={changeSubcategory}>
							<option value="">None</option>
							<option value="student-artists">Student Artists</option>
						</select>
						<select id="sports-subcat" style={{ display: category == "sports" ? "inline" : "none" }} onChange={changeSubcategory}>
							<option value="">None</option>
							<option value="student-atheletes">Student Athletes</option>
						</select>
					</div>
					<br />
					<br />

					<div id="std-sections" style={{ display: category == "vanguard" || category == "multimedia" ? "none" : "block" }}>
						<h2>Article</h2>
						<h3>Header image</h3>
						<input type="file" accept="image/*" id="img" onChange={updateImage} />
						<br /> <br />
						<h3>Title</h3>
						<input type="text" id="title" onChange={updateTitle} />
						<br /> <br />
						<h3>Author</h3>
						<p>Separate each author with a comma, and do not include titles. Leave this blank for the editorial.</p>
						<p>
							Example: &quot;John Doe, NEWS AND FEATURES CO-EDITOR and Jane Doe, OPINIONS CO-EDITOR&quot; is entered as &quot;John Doe,
							Jane Doe&quot;.
						</p>
						<input type="text" id="authors" onChange={updateAuthors} />
						<br /> <br />
						<p>
							You can write the article in Markdown (see{" "}
							<Link
								href="http://localhost:3000/articles/1970/1/news-features/Writing-in-markdown-568"
								style={{ textDecoration: "underline" }}
							>
								here
							</Link>{" "}
							for more info). Format special notes as they appear on the physical paper (usually italics).
							<strong> Separate paragraphs with empty lines (hit enter twice).</strong>
						</p>
						<textarea id="text" onChange={updateContent}></textarea>
					</div>
					<div id="vanguard" style={{ display: category != "vanguard" ? "none" : "block" }}>
						<h2>Spread</h2>
						<p>Upload your pages as one PDF (as they appear on the physical issue).</p>
						<input type="file" accept=".pdf" />
					</div>
					<div id="multimedia" style={{ display: category != "multimedia" ? "none" : "block" }}>
						<h2>Video</h2>
						<p>Submit the link to the video on YouTube.</p>
						<input type="text" />
						<br /> <br />
						<h2>Podcast</h2>
						<p>Submit the link to the podcast on RSS.</p>
						<input type="text" />
					</div>
					<br />

					<input type="submit" />
					<p id="bruh">{uploadResponse}</p>
				</form>
			</div>
		</div>
	);
}
