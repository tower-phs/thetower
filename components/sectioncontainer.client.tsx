import styles from "~/lib/styles";
import ArticlePreview from "./preview.client";
import { article } from "@prisma/client";

interface Props {
    category: string;
    desc: string;
    articles: article[];
}

export function SectionContainer({category, desc, articles}: Props) {
	return (
		<div className="newfe">
			<style jsx>{`
				.row-container {
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
					scroll-snap-align: start;
				}

				h3 {
					font-family: ${styles.font.sans};
				}

			`}</style>
			<h3>{category}</h3>
			<p>{desc}</p>
			<ul className="row-container">
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