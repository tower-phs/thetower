/** @format */

import Head from "next/head";

export default function Subscribe() {
	return (
		<div className="subscribe">
			<Head>
				<title>Subscribe | The Tower</title>
				<meta property="og:title" content="Subscribe | The Tower" />
				<meta property="og:description" content="Subscribe to the Tower" />
			</Head>
			<style jsx>{`
				h1 {
					text-align: center;
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
			</div>
		</div>
	);
}
