/** @format */

import { spreads } from "@prisma/client";
import Head from "next/head";
import { getSpread } from "~/lib/queries";

interface Props {
	spread: spreads;
}

interface Params {
	params: {
		slug: string;
	};
}

export async function getServerSideProps({ params }: Params) {
	return {
		props: {
			spread: await getSpread(params.slug),
		},
	};
}

export default function SpreadPage({ spread }: Props) {
	return (
		<div className="spread">
			<Head>
				<title>{spread.title} | The Tower</title>
				<meta property="og:title" content={spread.title + " | The Tower"} />
				<meta property="og:description" content="Read more about this article!" />
			</Head>
			<style jsx>{`
				.spread {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				object {
					width: 60vw;
					height: 100vh;
				}
			`}</style>
			<h1>{spread.title}</h1>
			<object data={spread.src} type="application/pdf">
				<a href={spread.src}>to the PDF!</a>
			</object>
		</div>
	);
}
