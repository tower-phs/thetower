/** @format */

import Head from "next/head";

export default function Subscribe() {
	return (
		<div className="subscribe">
			<Head>
				<title>Subscribe | The Tower</title>
				<meta property="og:title" content="Subscribe | The Tower" />
				<meta property="og:description" content="Subscribe to the Tower" />
				<meta
					http-equiv="refresh"
					content="0; URL=https://docs.google.com/forms/d/e/1FAIpQLSepzFs9XYC-Dfenzf5Y4xnwfPs5MBzpPhgoRzNYmsBtFAfa5g/viewform"
				/>
			</Head>
			<h1>Please wait to be redirected.</h1>
			<p>
				If you are not redirected, please use{" "}
				<a href="https://docs.google.com/forms/d/e/1FAIpQLSepzFs9XYC-Dfenzf5Y4xnwfPs5MBzpPhgoRzNYmsBtFAfa5g/viewform">this link</a>.
			</p>
			{/* <style jsx>{`
				h1 {
					text-align: center;
					font-weight: 600;
				}
				iframe {
					border: none;
					display: block;
					margin: 0 auto;
					padding: 5vh;
					height: 150vh;
				}
			`}</style>
			<h1>Subscribe to The Tower</h1>
			<div>
				<iframe
					src="https://docs.google.com/forms/d/e/1FAIpQLSepzFs9XYC-Dfenzf5Y4xnwfPs5MBzpPhgoRzNYmsBtFAfa5g/viewform?embedded=true"
					width="800"
					height="600"
				>
					Loading…
				</iframe>
			</div> */}
		</div>
	);
}
