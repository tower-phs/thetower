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
import SubBanner from "~/components/subbanner.client";
import { URL } from "node:url";

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
					background-color: ${styles.color.darkAccent};
					width: 100vw;
					left: -2.5vw;
					padding-top: 2.5rem;
					padding-bottom: 2.5rem;
				}

				.dark-banner * {
					color: ${styles.color.background};
					text-align: center;
					/* font-size: 2.5rem;
					font-family: "Neue Montreal Medium";
					margin-right: 0.75rem; */
				}

				#dark-banner-content {
					margin-left: 7.5rem;
					margin-right: 7.5rem;
				}

				#dark-banner-content h1 {
					/* font-size: calc(1rem + 1vw); */
				}

				.section-header {
					/* font-family: ${styles.font.serifHeader};
					font-style: italic; */
					text-align: center;
					/* font-weight: bold; */
				}
			`}</style>
			<Head>
				<meta property="og:title" content="Home | The Tower" />
				<meta property="og:description" content="The Tower is Princeton High School's newspaper club." />
			</Head>
			<div className="mosaic">
				<div className="triple">
					<div>
						{/* <h3 className="section-header">OPINIONS</h3> */}
						<hr />
						<ArticlePreview article={articles["opinions"][0]} style="box" size="large" />
						<ArticlePreview article={articles["opinions"][1]} style="box" size="large" />
						{/* <ArticlePreview article={articles["opinions"][2]} style="box" size="large" /> */}
					</div>
					<div>
						<ArticlePreview article={articles["featured"][0]} style="box" size="featured" />
					</div>
					<div>
						{/* <h3 className="section-header">SPORTS</h3> */}
						<hr />
						<ArticlePreview article={articles["sports"][0]} style="box" size="large" />
						{/* <ArticlePreview article={articles["sports"][1]} style="box" size="large" /> */}
						{/* <ArticlePreview article={articles["sports"][2]} style="box" size="large" /> */}
					</div>
				</div>
				<div className="one">
					<ArticlePreview article={articles["featured"][0]} style="box" size="featured" />

					<ArticlePreview article={articles["opinions"][0]} style="box" size="large" />
					<ArticlePreview article={articles["opinions"][1]} style="box" size="large" />
					<ArticlePreview article={articles["opinions"][2]} style="box" size="large" />

					<ArticlePreview article={articles["sports"][0]} style="box" size="large" />
					<ArticlePreview article={articles["sports"][1]} style="box" size="large" />
					<ArticlePreview article={articles["sports"][2]} style="box" size="large" />
				</div>
			</div>
			{/* <div className="dark-banner">
				<div id="dark-banner-content">
					<hr />
					<div style={{display: "flex", marginLeft: "5vw", marginRight: "5vw", gap: "1rem"}}>
						<Image src="/assets/white-tower.png" width={309} height={721} alt="Tower logo" style={{ width: "15rem", height: "auto" }} />
						<div>
							<h2 style={{ marginTop: "2.5rem", marginBottom: "2.5rem", textAlign: "left"}}>
								The Tower is Princeton High School&apos;s student-run newspaper.
							</h2>
							<p style={{textAlign: "left", fontSize: "2.5rem"}}>
								Since 1928, the Tower has been reporting on the inner workings of PHS, the district, and the cultural and athletic events that
								affect the student body.
								<br />

							</p>
						</div>
						
					</div>
					<hr />
				</div>
			</div> */}
			<br />
			<hr />
			<br />
			<NewsFeatures {...articles["news-features"]} />
			<hr />
			<br />
			<Opinions {...articles["opinions"]} />
			<div className="dark-banner">
				<div id="dark-banner-content">
					<hr />
					<h1 style={{ marginTop: "2.5rem" }}> Thank you to our sponsors for supporting the Tower!</h1>
					<Image
						src="/assets/milk-cookies.png"
						width={2500}
						height={2500}
						alt="Milk & Cookies"
						style={{ width: "25rem", height: "auto", marginBottom: "1rem" }}
					/>
					<hr />
				</div>
			</div>
			<br />
			<hr />
			<br />
			<ArtsEntertainment {...articles["arts-entertainment"]} />
			<hr />
			<br />
			<Sports {...articles["sports"]} />
			<SubBanner title="Consider subscribing to The Tower." />
		</div>
	);
}

export function NewsFeatures(articles: article[]) {
	return (
		<div className="newfe">
			<style jsx>{`
				.newfe-row-container {
					display: flex;
					gap: 1.5rem;
					// margin: 0 auto;
					list-style: none;
					overflow-x: scroll;
					scroll-snap-type: x mandatory;
					// border: 1px solid black;
				}

				.item {
					flex-shrink: 0;
					width: 25rem;
					height: 100%;
					background-color: #FFF;
					scroll-snap-align: center;
				}
		
			`}</style>
			<h3>NEWS & FEATURES</h3>
			<p>The latest stories on PHS and the district.</p>
			<ul className="newfe-row-container">
					{Object.values(articles)
						.map(article => (
							<li key={article.id} className="item">
								<ArticlePreview key={article.id} style="box" size="large" article={article} />
							</li>
						))}
			</ul>
		</div>
	);
}

export function Opinions(articles: article[]) {
	return (
		<div className="opinions">
			<style jsx>{`
				.opinions-row-container {
					display: flex;
					gap: 1.5rem;
					// margin: 0 auto;
					list-style: none;
					overflow-x: scroll;
					scroll-snap-type: x mandatory;
					// border: 1px solid black;
				}

				.item {
					flex-shrink: 0;
					width: 25rem;
					height: 100%;
					background-color: #FFF;
					scroll-snap-align: center;
				}
			`}</style>
			<h3>OPINIONS</h3>
			<p>Read the opinions of the student body, with topics ranging from school policies to global issues.</p>
			<ul className="opinions-row-container">
					{Object.values(articles)
						.map(article => (
							<li key={article.id} className="item">
								<ArticlePreview key={article.id} style="box" size="large" article={article} />
							</li>
						))}
			</ul>
		</div>
	);
}

export function ArtsEntertainment(articles: article[]) {
	return (
		<div className="arts-entertainment">
			<style jsx>{`
				.ae-row-container {
					display: flex;
					gap: 1.5rem;
					// margin: 0 auto;
					list-style: none;
					overflow-x: scroll;
					scroll-snap-type: x mandatory;
					// border: 1px solid black;
				}

				.item {
					flex-shrink: 0;
					width: 25rem;
					height: 100%;
					background-color: #FFF;
					scroll-snap-align: center;
				}
			`}</style>
			<h3>ARTS & ENTERTAINMENT</h3>
			<p>Music, theatre, and more.</p>
			<ul className="ae-row-container">
					{Object.values(articles)
						.map(article => (
							<li key={article.id} className="item">
								<ArticlePreview key={article.id} style="box" size="large" article={article} />
							</li>
						))}
			</ul>
		</div>
	);
}

export function Sports(articles: article[]) {
	return (
		<div className="sports">
			<style jsx>{`
				.sports-row-container {
					display: flex;
					gap: 1.5rem;
					// margin: 0 auto;
					list-style: none;
					overflow-x: scroll;
					scroll-snap-type: x mandatory;
					// border: 1px solid black;
				}

				.item {
					flex-shrink: 0;
					width: 25rem;
					height: 100%;
					background-color: #FFF;
					scroll-snap-align: center;
				}
			`}</style>
			<h3>SPORTS</h3>
			<p>Updates on PHS sports, tales of sports history, and more.</p>
			<ul className="sports-row-container">
					{Object.values(articles)
						.map(article => (
							<li key={article.id} className="item">
								<ArticlePreview key={article.id} style="box" size="large" article={article} />
							</li>
						))}
			</ul>
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
