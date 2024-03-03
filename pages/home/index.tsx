/** @format */

import { article } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import ArticlePreview from "~/components/preview.client";
import Video from "~/components/video.client";
import Podcast from "~/components/podcast.client";
import { getFrontpageArticles } from "~/lib/queries";
import styles from "~/lib/styles";

export async function getServerSideProps() {
	const articles = await getFrontpageArticles();

	return {
		props: {
			articles,
		},
	};
}

interface Props {
	articles: { [name: string]: article[] };
}

export default function FrontPage({ articles }: Props) {
	return (
		<div>
			<style jsx>{`
				.mosaic {
					display: grid;
					grid-gap: 10px;
					margin-left: 0vw;
					margin-right: 0vw;
				}
				.triple {
					display: grid;
					grid-gap: 10px;
					grid-template-columns: 0.625fr 1.75fr 0.625fr;
				}

				.one {
					padding-bottom: 10px;
					border-bottom: 1px solid gainsboro;
					display: none;
				}

				@media (max-width: 1000px) {
					.triple {
						display: none;
					}

					.one {
						display: block;
					}
				}

				.three {
					padding-top: 10px;
					border-top: 1px solid gainsboro;
				}

				.dark-banner {
					position: relative;
					background-color: ${styles.color.primary};
					width: 100vw;
					left: -2.5vw;
					padding-top: 2.5rem;
					padding-bottom: 2.5rem;
				}

				.dark-banner * {
					color: ${styles.color.background};
					text-align: center;
					font-size: 2.5rem;
					font-family: "Neue Montreal Medium";
					// margin-right: 0.75rem;
				}

				// .dark-banner .big-tag {
				// 	border-color: lightgray;
				// 	color: lightgray;
				// 	border-style: solid;
				// 	border-thickness: 5px;
				// 	border-radius: 2rem;
				// }

				// .dark-banner .big-tag:hover {
				// 	text-decoration: underline;
				// }

				#dark-banner-content {
					margin-left: 7.5rem;
					margin-right: 7.5rem;
				}

				#dark-banner-content h1 {
					font-size: calc(1rem + 1vw);
				}

				// #tag-container {
				// 	padding-top: 0.5rem;
				// 	display: grid;
				// 	gap: 0.75rem;
				// 	grid-template-columns: auto auto auto auto auto auto;
				// }

				// @media (max-width: 1000px) {
				// 	#tag-container {
				// 		grid-template-columns: auto;
				// 	}
				// }
			`}</style>
			<Head>
				<meta property="og:title" content="Home | The Tower" />
				<meta property="og:description" content="The Tower is Princeton High School's newspaper club." />
			</Head>
			<div className="mosaic">
				<div className="triple">
					<div>
						<ArticlePreview article={articles["opinions"][0]} style="box" size="large" />
						<ArticlePreview article={articles["opinions"][1]} style="box" size="large" />
						<ArticlePreview article={articles["opinions"][2]} style="box" size="large" />
					</div>
					<div>
						<ArticlePreview article={articles["news-features"][3]} style="box" size="featured" />
					</div>
					<div>
						<ArticlePreview article={articles["sports"][0]} style="box" size="large" />
						<ArticlePreview article={articles["sports"][1]} style="box" size="large" />
						<ArticlePreview article={articles["sports"][2]} style="box" size="large" />
					</div>
				</div>
				<div className="one">
					<ArticlePreview article={articles["news-features"][3]} style="box" size="featured" />

					<ArticlePreview article={articles["opinions"][0]} style="box" size="large" />
					<ArticlePreview article={articles["opinions"][1]} style="box" size="large" />
					<ArticlePreview article={articles["opinions"][2]} style="box" size="large" />

					<ArticlePreview article={articles["sports"][0]} style="box" size="large" />
					<ArticlePreview article={articles["sports"][1]} style="box" size="large" />
					<ArticlePreview article={articles["sports"][2]} style="box" size="large" />
				</div>
			</div>
			<div className="dark-banner">
				<div id="dark-banner-content">
					<hr />
					<h1 style={{ marginTop: "2.5rem" }}>The Tower is Princeton High School&apos;s student-run newspaper.</h1>
					<Image src="/assets/white-tower.png" width={309} height={721} alt="Tower logo" style={{ width: "10rem", height: "auto" }} />
					<h1 style={{ marginBottom: "2.5rem" }}>
						Since 1928, the Tower has been reporting on the inner workings of PHS, the district, and cultural and athletic events that
						affect the student body.
					</h1>
					<hr />
					{/* <div id="tag-container">
						<div className="big-tag">
							<Link href="/category/news-features">
								<h1>NEWFE</h1>
							</Link>
						</div>
						<div className="big-tag">
							<Link href="/category/opinions">
								<h1>OPS</h1>
							</Link>
						</div>
						<div className="big-tag">
							<Link href="/category/arts-entertainment">
								<h1>A&E</h1>
							</Link>
						</div>
						<div className="big-tag">
							<Link href="/category/sports">
								<h1>SPORTS</h1>
							</Link>
						</div>
						<div className="big-tag">
							<Link href="/category/vanguard">
								<h1>VANGUARD</h1>
							</Link>
						</div>
						<div className="big-tag">
							<Link href="/category/multimedia">
								<h1>MULTIMEDIA</h1>
							</Link>
						</div>
					</div> */}
				</div>
				{/* <div>
					<ArtsEntertainment {...articles["arts-entertainment"]}/>
					<Multimedia />
				</div> */}
			</div>
		</div>
	);
}

export function NewsFeatures(articles: article[]) {
	return (
		<div className="newfe">
			<style jsx>{`
				.newfe {
					padding-right: 10px;
					border-right: 1px solid gainsboro;
				}
				.double {
					display: grid;
					grid-gap: 10px;
					grid-template-columns: 1fr 1fr;
				}
			`}</style>
			<ArticlePreview article={articles[0]} style="box" size="large" category />
			<div className="double">
				{Object.values(articles)
					.slice(1)
					.map(article => (
						<ArticlePreview key={article.id} article={article} style="box" size="small" category />
					))}
			</div>
		</div>
	);
}

export function Opinions(articles: article[]) {
	return (
		<div className="opinions">
			<style jsx>{``}</style>
			<div>
				<ArticlePreview article={articles[0]} style="box" size="medium" category />
				<div>
					{Object.values(articles)
						.slice(1)
						.map(article => (
							<ArticlePreview key={article.id} style="row" size="medium" category article={article} />
						))}
				</div>
			</div>
		</div>
	);
}

export function ArtsEntertainment(articles: article[]) {
	return (
		<div className="ane">
			<style jsx>{`
				.ane {
					padding-left: 10px;
					border-left: 1px solid gainsboro;
				}
			`}</style>
			<ArticlePreview article={articles[0]} style="box" size="medium" category />
			<div>
				{Object.values(articles)
					.slice(1)
					.map(article => (
						<ArticlePreview key={article.id} style="row" size="medium" article={article} category />
					))}
			</div>
		</div>
	);
}

export function Sports(articles: article[]) {
	return (
		<div className="sports">
			<style jsx>{`
				.sports {
					padding-right: 10px;
					border-right: 1px solid gainsboro;
				}
				.double {
					display: grid;
					grid-gap: 10px;
					grid-template-columns: 1fr 1fr;
				}
			`}</style>
			<ArticlePreview article={articles[0]} style="box" size="medium" category />
			<div>
				{Object.values(articles)
					.slice(1)
					.map(article => (
						<ArticlePreview key={article.id} style="row" size="medium" article={article} category />
					))}
			</div>
		</div>
	);
}

export function Multimedia() {
	return (
		<div className="multimedia">
			<div>
				<section className="category">
					<em>
						<Link href={"/category/multimedia"}>
							<span style={{ margin: "0px", fontFamily: "Open Sans" }}>Multimedia</span>
						</Link>
					</em>
				</section>
				<Video link="GDDGmRkkS5A" title="Soccer Practice with Nick Matese" />
				<Podcast link="1187999" />
			</div>
		</div>
	);
}
