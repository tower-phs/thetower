/** @format */

import { article } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { displayDate, expandCategorySlug, shortenText } from "~/lib/utils";
import CreditLink from "./credit.client";
import styles from "~/lib/styles";

interface Props {
	article: article;
	category?: boolean;
	style?: "box" | "row";
	size?: "small" | "medium" | "large";
}

export default function ArticlePreview({ article, category, style = "row", size = "medium" }: Props) {
	if (!article) return <></>;

	let charlen = 0;
	if (style === "box") {
		// BOX STYLE
		switch (size) {
			case "large":
				charlen = 200;
				break;
			case "medium":
				charlen = 100;
				break;
			case "small":
				break;
		}
	} else {
		// ROW STYLE
		switch (size) {
			case "large":
				charlen = 250;
				break;
			case "medium":
				charlen = 150;
				break;
			case "small":
				break;
		}
	}

	if (!article.img?.includes(".")) article.img = "/assets/default.png";

	return (
		<div className={"article-preview " + style + " " + size}>
			<style jsx>{`
				.article-preview a:hover {
					text-decoration: underline;
				}
				.article-preview.box {
					display: grid;
					padding: 1px;
					border: none;
				}
				.article-preview.box.small {
					display: grid;
					padding: 1px;
					border: none;
				}
				.article-preview.row {
					display: grid;
					padding-bottom: 2vh;
					margin-bottom: 2vh;
					border: none;
					border-bottom: 1px solid gainsboro;
					grid-template-columns: 1fr 1.5fr;
					grid-gap: 1vw;
				}
				.article-preview.row.small {
					grid-template-columns: 1fr 1.5fr;
				}
				.img-container {
					position: relative;
					max-width: 100%;
					max-height: 100%;
				}
				.img-container.row.large {
					width: 32vw;
				}
				.img-container.row.medium {
					width: 12vw;
				}
				.img-container.row.small {
					width: 10vw;
				}
				span {
					margin-left: 1vw;
					font-size: smaller;
				}
				.title {
					font-weight: bolder;
				}
				.title .large {
					font-size: xx-large;
				}
				.title .medium {
					font-size: large;
				}
				.title .small {
					font-size: medium;
				}
				.category {
					font-size: 12pt;
					margin-bottom: 1vh;
					margin-top: 1vh;
				}
				.preview-text {
					font-family: ${styles.font.text}, ${styles.font.stack};
					margin-top: 1vh;
					margin-bottom: 2vh;
				}
				img {
					width: 100%;
					background-color: #f7f7f7;
					border: 1px solid gainsboro;
				}
			`}</style>
			<img src={article.img} width="100%" height="auto"></img>
			<div>
				<section className="category">
					<em>
						{category && (
							<Link href={"/category/" + article.category}>
								<span style={{ margin: "0px", fontFamily: "Open Sans" }}>{expandCategorySlug(article.category)}</span>
							</Link>
						)}
					</em>
				</section>
				<section className="title">
					<Link href={"/articles/" + article.year + "/" + article.month + "/" + article.category + "/" + encodeURI(article.title)}>
						<a className={size}>{article.title}</a>
					</Link>
				</section>
				<br></br>
				<section className="authors">
					{article.authors?.map((author, index) => (
						<>
							<CreditLink key={index} author={author} />
							<span style={{ marginLeft: "5px", marginRight: "5px" }}>{index < article.authors.length - 1 ? " | " : ""}</span>
						</>
					))}
				</section>

				<section className="preview-text">{shortenText(article.content, charlen)}</section>
			</div>
		</div>
	);
}
