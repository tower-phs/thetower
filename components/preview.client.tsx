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
					padding-bottom: 2vh;
					margin-bottom: 2vh;
					border: none;
					border-bottom: 1px solid gainsboro;
					grid-template-columns: 1fr 1.5fr;
					grid-gap: 1vw;
				}
				.article-preview.row.small {
					display: grid;
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
					color: ${styles.color.secondary} !important !important !important;
				}
				.title .medium {
					font-size: large;
					color: ${styles.color.tertiary} !important !important !important;
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
					border-radius: 0px;
				}
				.article-preview > .large-preview {
					background-color: #f5f5f5;
					padding: 10px;
					margin-bottom: 10px;
					border-left: 2px solid ${styles.color.secondary};
				}
				.article-preview > .large-preview:hover {
					background-color: #f0f0f0;
				}
				.article-preview > .medium-preview {
					display: contents;
				}
				.article-preview > .small-preview {
					display: contents;
				}
			`}</style>
			<div className={size + "-preview"}>
				<div className="img-wrapper">
					<img src={article.img} className={size}></img>
				</div>
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
								{index < article.authors.length - 1 ? <span style={{ marginLeft: "5px", marginRight: "5px" }}> • </span> : ""}
							</>
						))}
					</section>

					<section className="preview-text">{shortenText(article.content, charlen)}</section>
				</div>
			</div>
		</div>
	);
}
