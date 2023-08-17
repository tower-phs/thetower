/**
 * eslint-disable react/jsx-key
 *
 * @format
 */

/** @format */

import { article } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import { getArticle } from "~/lib/queries";
import { displayDate } from "~/lib/utils";
import styles from "~/lib/styles";
import CreditLink from "~/components/credit.client";

interface Props {
	article: article;
}

interface Params {
	params: {
		year: string;
		month: string;
		cat: string;
		slug: string;
	};
}

export async function getServerSideProps({ params }: Params) {
	return {
		props: {
			article: await getArticle(params.year, params.month, params.cat, params.slug),
		},
	};
}

export default function Article({ article }: Props) {
	const paragraphs = article.content.split("\n");

	return (
		<div className="article">
			<Head>
				<title>{article.title} | The Tower</title>
				<meta property="og:title" content={article.title + " | The Tower"} />
				<meta property="og:description" content="Read more about this article!" />
			</Head>
			<style jsx>{`
				.article {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.article .main-img {
					width: 55vw;
					height: 70vh;
					position: relative;
				}
				.article .img {
					width: 48vw;
					height: 60vh;
					position: relative;
				}
				.article .content {
					margin-top: 5vh;
					max-width: 50vw;
				}
				.main-article::first-letter {
					initial-letter: 3;
					margin-right: 10px;
				}
				@media screen and (max-width: 1000px) {
					.article .content {
						max-width: 100vw;
						margin-left: 10px;
						margin-right: 10px;
					}
					.main-article::first-letter {
						initial-letter: 1;
						margin-right: 0px;
					}
				}
				.article .content p {
					font-family: ${styles.font.text}, ${styles.font.stack};
					font-size: 1.2rem;
				}
				.article p {
					margin-top: 3vh;
					margin-bottom: 3vh;
				}
				.article .titleblock {
					display: block;
					text-align: center;
				}
				.article .titleblock h1 {
					font-size: 2rem;
				}
			`}</style>

			<section className="content">
				<div className="titleblock">
					<h1>{article.title}</h1>

					<span>{displayDate(article.year, article.month)}</span>

					{article.authors.length > 0 && (
						<section className="authors">
							{article.authors.map((author, index) => (
								<>
									<CreditLink key={index} author={author} />
									{index < article.authors.length - 1 ? <span style={{ marginLeft: "5px", marginRight: "5px" }}> • </span> : ""}
								</>
							))}
						</section>
					)}
				</div>
				<br></br>
				<br></br>
				{article.img && <img src={article.img} width="100%" height="auto"></img>}

				<div className="main-article">
					{paragraphs.map((paragraph, index) =>
						paragraph.startsWith("@img=") ? (
							<img src={paragraph.substring(5)} width="100%" height="auto" key={index}></img>
						) : (
							<p key={index}>{paragraph.replace("&lt;", "<").replace("&gt;", ">")}</p>
						)
					)}
				</div>
			</section>
		</div>
	);
}
