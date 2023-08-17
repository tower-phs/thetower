/** @format */

import Head from "next/head";
import styles from "~/lib/styles";

export default function About() {
	return (
		<div className="about">
			<Head>
				<title>About | The Tower</title>
				<meta property="og:title" content="About | The Tower" />
				<meta property="og:description" content="About the Tower" />
			</Head>
			<style jsx>{`
				.about {
					max-width: 100vw;
					min-height: 100vh;
				}
				h1 {
					text-align: center;
					border-bottom: 3px solid gainsboro;
					margin-bottom: 4vh;
				}
				p {
					margin-left: 24vw;
				}
				p,
				b {
					max-width: 45vw;
					font-family: ${styles.font.text}, ${styles.font.stack};
				}
				b {
					font-size: large;
				}
			`}</style>
			<h1>About</h1>
			<p>
				<b>Mission Statement:</b> The Tower serves as a medium of information for the community through reporting and/or analyzing the inner
				workings of Princeton High School, the school district, and cultural and athletic events that affect the student body; providing a
				source of general news for parents, teachers, and peers; voicing various opinions from an informed group of writers; and maintaining
				quality in accurate content and appealing aesthetics, as well as upholding professionalism and journalistic integrity.
			</p>
			<br />
			<br />

			<p>
				<b>Editorial Board:</b> The Editoral Board of the Tower consists of a select group of 13 Tower 2022 staff members. The views of board
				members are accurately reflected in the editorial, which is co-written each month by the Board with primary authorship changing
				monthly.
			</p>
			<br />
			<br />

			<p>
				<b>Letter and Submission Policy:</b> All letters and articles are welcome for consideration. Please email all submissions to{" "}
				<span>phstowersenioreditors@gmail.com</span>. The editors reserve the rights to alter letters for length and to edit articles. The
				Editors-in-Chief take full responsibility for the content of this paper.
			</p>
			<br />
			<br />

			<p>
				<b>Publication Policy:</b> The newspaper accepts advice from the administration and the advisors in regard to the newspaper’s content;
				however, the final decision to print the content lies with the Editors-in-Chief. The Tower’s articles do not necessarily represent the
				views of the administration, faculty, or staff.
			</p>
			<br />
			<br />

			<p>
				<b>Corrections:</b> The Tower aims to uphold accuracy in articles and welcomes suggestions regarding the content of the articles.
				Corrections and retractions of articles will be determined on a case-by-case basis; please email all requests to{" "}
				<span>phstowersenioreditors@gmail.com</span> for consideration.
			</p>
		</div>
	);
}
