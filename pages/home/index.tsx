/** @format */

import { article } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
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
					padding-top: 5rem;
					padding-bottom: 5rem;
				}

				.dark-banner * {
					color: ${styles.color.background};
					text-align: center;
					font-size: 2.5rem;
					font-family: "Neue Montreal Medium";
					// margin-right: 0.75rem;
				}

				.dark-banner a {
					border-color: lightgray;
					color: lightgray;
					border-style: solid;
					border-thickness: 5px;
					border-radius: 2rem;
				}

				.dark-banner a:hover {
					text-decoration: underline;
				}

				#dark-banner-content {
					margin-left: 7.5rem;
					margin-right: 7.5rem;
				}

				#tag-container {
					padding-top: 0.5rem;
					display: grid;
					gap: 0.75rem;
					grid-template-columns: auto auto auto auto auto auto;
				}

				@media (max-width: 1000px) {
					#tag-container {
						grid-template-columns: auto;
					}
				}
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
					<h1>The Tower is Princeton High School&pos;s student-run newspaper. Explore PHS&pos;s culture through </h1>
					<div id="tag-container">
						<Link className="big-tag" href="/category/news-features">
							NEWFE
						</Link>
						<Link className="big-tag" href="/category/opinions">
							OPS
						</Link>
						<Link className="big-tag" href="/category/arts-entertainment">
							A&E
						</Link>
						<Link className="big-tag" href="/category/sports">
							SPORTS
						</Link>
						<Link className="big-tag" href="/category/vanguard">
							VANGUARD
						</Link>
						<Link className="big-tag" href="/category/multimedia">
							MULTIMEDIA
						</Link>
					</div>
				</div>
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
			<ArticlePreview article={articles[0]} style="box" size="large" category />
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
			<ArticlePreview article={articles[0]} style="box" size="large" category />
			<div>
				{Object.values(articles)
					.slice(1)
					.map(article => (
						<ArticlePreview key={article.id} style="row" size="small" article={article} category />
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
