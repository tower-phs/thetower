/** @format */

import { article } from "@prisma/client";
import ArticlePreview from "./preview.client";

interface MosaicProps {
	articles: article[];
}

export default function Mosaic({ articles }: MosaicProps) {
	return (
		<div className="front-page">
			<style jsx>{`
				.front-page {
					min-height: 100vh;
					display: grid;
					grid-template-columns: 4fr 2fr;
					grid-column-gap: 1vw;
				}
				.column {
					display: grid;
					grid-column-gap: 2vw;
				}
				.column.two {
					grid-template-columns: 1fr 1fr;
				}
				.column.three {
					grid-template-columns: 1fr 1fr 1fr;
				}
			`}</style>
			<div>
				<ArticlePreview article={articles[0]} style="box" size="large" category />
				<div className="column two">
					<ArticlePreview article={articles[1]} style="box" size="medium" category />
					<ArticlePreview article={articles[2]} style="box" size="medium" category />
				</div>
				<div className="column three">
					<ArticlePreview article={articles[3]} style="box" size="small" category />
					<ArticlePreview article={articles[4]} style="box" size="small" category />
					<ArticlePreview article={articles[5]} style="box" size="small" category />
				</div>
			</div>
			<div>
				<ArticlePreview article={articles[6]} style="box" size="medium" category />
				<ArticlePreview article={articles[7]} style="row" size="small" category />
				<ArticlePreview article={articles[8]} style="row" size="small" category />
				<ArticlePreview article={articles[9]} style="row" size="small" category />
				<ArticlePreview article={articles[10]} style="row" size="small" category />
				<ArticlePreview article={articles[11]} style="row" size="small" category />
				<ArticlePreview article={articles[12]} style="row" size="small" category />
				<ArticlePreview article={articles[14]} style="row" size="small" category />
				<ArticlePreview article={articles[15]} style="box" size="medium" category />
			</div>
		</div>
	);
}
