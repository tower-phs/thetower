/** @format */

import { article, spreads } from "@prisma/client";
import shuffle from "lodash/shuffle";
import Head from "next/head";
import ArticlePreview from "~/components/preview.client";
import Spread from "~/components/spread.client";
import { getCurrArticles, getFrontpageArticles, getSpreadsByCategory } from "~/lib/queries";

interface Props {
	spreads: spreads[];
	sidebar: article[];
}

export async function getServerSideProps() {
	return {
		props: {
			spreads: await getSpreadsByCategory("NEW STUDENT ISSUE"),
			sidebar: await getCurrArticles(),
		},
	};
}

export default function Category({ spreads, sidebar }: Props) {
	return (
		<div className="nsi">
			<Head>
				<title>New Student Issue | The Tower</title>
				<meta property="og:title" content="New Student Issue | The Tower" />
				<meta property="og:description" content="New Student Issue at the Tower" />
			</Head>
			<style jsx>{`
				h1 {
					text-align: center;
					border-bottom: 3px double black;
					margin-bottom: 1vh;
				}
				.grid {
					display: grid;
					grid-template-columns: 3fr 2fr;
					grid-column-gap: 2vw;
				}
				.spreads {
				}
				.sidebar {
					margin-top: 2vh;
					padding-left: 1vw;
					padding-right: 1vw;
					border: none;
					border-left: 1px solid gainsboro;
					border-right: 1px solid gainsboro;
				}
			`}</style>
			<h1>New Student Issue</h1>
			<div className="grid">
				<section className="spreads">
					{spreads.map(spread => (
						<Spread key={spread.id} spread={spread} />
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
