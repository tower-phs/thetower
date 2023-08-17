/** @format */

import { article, spreads } from "@prisma/client";
import shuffle from "lodash/shuffle";
import Head from "next/head";
import ArticlePreview from "~/components/preview.client";
import Video from "~/components/video.client";
import Podcast from "~/components/podcast.client";
import { getArticlesByCategory } from "~/lib/queries";
import NoSSR from "~/components/nossr.client";

interface Props {
	spreads: spreads[];
}

export async function getServerSideProps() {
	return {
		props: {
			//spreads: await getSpreadsByCategory("VANGUARD"),
		},
	};
}

export default function Category(/*{ spreads }: Props*/) {
	return (
		<div className="multimedia">
			<Head>
				<title>Multimedia | The Tower</title>
				<meta property="og:title" content="Multimedia | The Tower" />
				<meta property="og:description" content="Multimedia at the Tower" />
			</Head>
			<style jsx>{`
				h1 {
					text-align: center;
					border-bottom: 3px double black;
					margin-bottom: 1vh;
				}
				.grid {
					display: grid;
					grid-template-columns: 2fr 1fr 1fr;
					/*height: 100vh;*/
				}
				@media (max-width: 1000px) {
					.grid {
						grid-template-columns: 1fr;
					}
				}
				.grid > section:nth-child(even) {
					border-left: 1px solid gainsboro;
					border-right: 1px solid gainsboro;
				}
				section {
					padding: 1vw;
					box-sizing: border-box;
				}
				.sm-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
					gap: 1vw;
				}
				.videos,
				.papercasts {
					height: 100%;
					/*overflow-y: scroll;*/
				}
				iframe {
					background-color: #f6f6f6;
				}
			`}</style>
			<h1>Multimedia</h1>
			<div className="grid">
				<NoSSR>
					<section className="videos">
						<Video link="NlVjqI7eSfc" title="To Track or Not To Track? - A Math Talk with NCTM President Kevin Dykema" />
						<br />
						<Video link="VEcVyFME3M0" title="The Making of Newsies" />
						<br />
						<Video link="Z4bZBXoVseo" title="Artist of the Month: Kevin Huang Profile" />
						{/*
						<div className="sm-grid">
							<Video link="Z4bZBXoVseo" title="Artist of the Month: Kevin Huang Profile" />
						</div>*/}
					</section>
					{/*<section className="papercasts">
						<h2>Papercasts</h2>
					</section>*/}
					<section className="papercasts">
						<h2>PHS Talks</h2>
						<Podcast link="937713" />
						<Podcast link="927613" />
						<Podcast link="844939" />
					</section>
					<section className="rightbar">
						<h2>Inside PHS</h2>
						<Podcast link="876635" />
					</section>
				</NoSSR>
			</div>
		</div>
	);
}
