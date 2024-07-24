/** @format */

import { article, spreads } from "@prisma/client";
import Head from "next/head";
import Video from "~/components/video.client";
import Podcast from "~/components/podcast.client";
import NoSSR from "~/components/nossr.client";
import styles from "~/lib/styles";

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
					font-weight: bold;
					font-size: calc(1.5rem + 1vw);
				}

				h2 {
					font-family: ${styles.font.previewHeader};
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
						<Video link="X6yiU_yupyw" title="Diving into Testing Season at PHS" />
						<br />
						<Video link="OL0By_NUTP4" title="Asian Fest Hosted by PHS" />
						<br />
						<Video link="icIwD1E3_SI" title="PHS Jazz Ensemble's Trip to Hawaii" />
						<br />
						<Video link="GDDGmRkkS5A" title="Soccer Practice with Nick Matese" />
						<br />
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
						<Podcast link="phstalks/1272351" />
						<Podcast link="phstalks/1233141" />
						<Podcast link="phstalks/1187999" />
						<Podcast link="phstalks/1187999" />
						<Podcast link="phstalks/1143064" />
					</section>
					<section className="rightbar">
						<h2>Tower Shorts</h2>
						<Podcast link="towershorts/1484378/" />
						<Podcast link="towershorts/1412519" />
						<Podcast link="towershorts/1342192" />
						<Podcast link="towershorts/1369461" />
					</section>
				</NoSSR>
			</div>
		</div>
	);
}
