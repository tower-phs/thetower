import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link"
// import MDEditor from "@uiw/react-md-editor";

export default function Upload() {
    const [category, setCategory] = useState("");
    // const [text, setText] = useState("Type your article here.")

    function changeCategory(event: ChangeEvent<HTMLSelectElement>) {
        setCategory(event.target.value)
    }

    async function submitArticle(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let f = new FormData(event.currentTarget)

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: f,
          })
       
          // Handle response if necessary
          response.json().then((data) => {console.log(data)})
    }

    return (
        <div>
            <Head>
				<title>Upload Articles | The Tower</title>
				<meta property="og:title" content="Upload Articles | The Tower" />
				<meta property="og:description" content="Section editors upload content here." />
			</Head>
            <div style={{textAlign: "center"}}>
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
                        <select style={{display: (category == "") ? "inline" : "none"}} disabled={true}>
                            <option>Select subcategory</option>
                        </select>
                        <select id="newfe-subcat" style={{display: (category == "news-features") ? "inline" : "none"}}>
                            <option>None</option>
                            <option>PHS Profiles</option>
                        </select>
                        <select id="ops-subcat" style={{display: (category == "opinions") ? "inline" : "none"}}>
                            <option>None</option>
                            <option>Editorials</option>
                            <option>Cheers & Jeers</option>
                        </select>
                        <select id="ae-subcat" style={{display: (category == "arts-entertainment") ? "inline" : "none"}}>
                            <option>None</option>
                            <option>Student Artists</option>
                        </select>
                        <select id="sports-subcat" style={{display: (category == "sports") ? "inline" : "none"}}>
                            <option>None</option>
                            <option>Student Athletes</option>
                        </select>
                    </div>
                    <br /><br />

                    <div id="std-sections" style={{display: (category == "vanguard" || category == "multimedia") ? "none" : "block"}}>
                        <h2>Article</h2>
                            <h3>Header image</h3>
                            <input type="file" accept="image/*"/>

                            <br/> <br />

                            <h3>Title</h3>
                            <input type="text" />

                            <br/> <br />

                            <h3>Author</h3>
                            <p>Separate each author with a comma, and do not include titles. Leave this blank for the editorial.</p>
                            <p>Example: &quot;John Doe, NEWS AND FEATURES CO-EDITOR and Jane Doe, OPINIONS CO-EDITOR&quot; is entered as &quot;John Doe, Jane Doe&quot;.</p>
                            <input type="text" />
                            
                            <br /> <br />

                            <p>You can write the article in <Link href="https://www.markdownguide.org/cheat-sheet/" style={{textDecoration: "underline", color: "blue"}}>Markdown format</Link> to add details like italics, pullquotes, and more. Format special notes as they appear on the print edition (usually italics).</p>
                            <textarea></textarea>
                            {/* <MDEditor value={text} onChange={setText}/>
                            <MDEditor.Markdown source={text} style={{ whiteSpace: 'pre-wrap' }} /> */}
                    </div>
                    <div id="vanguard" style={{display: (category != "vanguard") ? "none" : "block"}}>
                        <h2>Spread</h2>
                        <p>Upload your pages as one PDF (as they appear on the physical issue).</p>
                        <input type="file" accept=".pdf" />
                    </div>
                    <div id="multimedia" style={{display: (category != "multimedia") ? "none" : "block"}}>
                        <h2>Video</h2>
                        <p>Submit the link to the video on YouTube.</p>
                        <input type="text" />

                        <br /> <br />

                        <h2>Podcast</h2>
                        <p>Submit the link to the podcast on RSS.</p>
                        <input type="text" />
                    </div>
                    <br />

                    <input type="submit"/>
                </form>
            </div>
        </div>
    );
}