/** @format */

import Head from "next/head";
import VirtualArchive from "~/components/archive.client";

export default function Archives() {
	return (
		<div className="archives">
			<Head>
				<title>Virtual Archives | The Tower</title>
				<meta property="og:title" content="Archives | The Tower" />
				<meta property="og:description" content="Read scanned PDF newspapers here" />
			</Head>
			<style jsx>{`
				h1 {
					text-align: center;
				}
				.container {
					margin-left: 10%;
					width: 80%;
					display: grid;
					grid-template-columns: 1fr 1fr 1fr 1fr;
				}
			`}</style>
			<h1>Archives</h1>
			<div className="container">
				<VirtualArchive month={2} year={2021} />
				<VirtualArchive month={3} year={2021} />
				<VirtualArchive month={9} year={2021} />
				<VirtualArchive month={10} year={2021} />
				<VirtualArchive month={11} year={2021} />
				<VirtualArchive month={12} year={2021} />
				<VirtualArchive month={2} year={2022} />
				<VirtualArchive month={3} year={2022} />
				<VirtualArchive month={4} year={2022} />
				<VirtualArchive month={9} year={2022} />
				<VirtualArchive month={10} year={2022} />
				<VirtualArchive month={11} year={2022} />
				<VirtualArchive month={2} year={2023} />
				<VirtualArchive month={3} year={2023} />
			</div>
		</div>
	);
}
