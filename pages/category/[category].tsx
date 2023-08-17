/** @format */

import { article } from "@prisma/client";
import Head from "next/head";
import ArticlePreview from "~/components/preview.client";
import { getArticlesByCategory, getCurrArticles, getFrontpageArticles } from "~/lib/queries";
import { expandCategorySlug } from "~/lib/utils";
import shuffle from "lodash/shuffle";

interface Params {
	params: {
		category: string;
	};
}

interface Props {
	category: string;
	articles: article[];
	sidebar: article[];
}

export async function getServerSideProps({ params }: Params) {
	return {
		props: {
			category: params.category,
			articles: await getArticlesByCategory(params.category),
			sidebar: await getCurrArticles(),
		},
	};
}

export default function Category({ category, articles, sidebar }: Props) {
	return (
		<div className="category">
			<Head>
				<title>{expandCategorySlug(category)} | The Tower</title>
				<meta property="og:title" content={expandCategorySlug(category) + " | The Tower"} />
				<meta property="og:description" content={expandCategorySlug(category) + " at the Tower"} />
			</Head>
			<style jsx>{`
				.category {
					min-height: 100vh;
				}
				h1 {
					text-align: center;
					border-bottom: 3px double black;
					margin-bottom: 1vh;
				}
				.grid {
					display: grid;
					grid-template-columns: 2fr 1fr;
					grid-column-gap: 2vw;
				}
				.grid .sidebar {
					margin-top: 2vh;
					padding-left: 1vw;
					padding-right: 1vw;
					border: none;
					border-left: 1px solid gainsboro;
					border-right: 1px solid gainsboro;
				}
			`}</style>
			<h1>{expandCategorySlug(category)}</h1>
			<div className="grid">
				<section>
					{articles.map(article => (
						<ArticlePreview key={article.id} article={article} style="row" size="small" />
					))}
				</section>
				<section className="sidebar">
					<SidebarArticles sidebar={sidebar} />
				</section>
			</div>
		</div>
	);
}

interface SidebarProps {
	sidebar: article[];
}

function SidebarArticles({ sidebar }: SidebarProps) {
	let articles = shuffle(sidebar);
	return (
		<>
			{articles.map(article => (
				<ArticlePreview key={article.id} article={article} style="row" size="small" category />
			))}
		</>
	);
}
