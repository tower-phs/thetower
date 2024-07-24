/** @format */

import { article } from "@prisma/client";
import shuffle from "lodash/shuffle";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArticlePreview from "~/components/preview.client";
import { getArticlesBySubcategory, getCurrArticles, getIdOfNewest } from "~/lib/queries";
import styles from "~/lib/styles";
import { expandCategorySlug } from "~/lib/utils";

interface Params {
	params: {
		subcategory: string;
	};
}

interface Props {
	subcategory: string;
	articles: article[];
	sidebar: article[];
}

export async function getServerSideProps({ params }: Params) {
	return {
		props: {
			subcategory: params.subcategory,
			articles: await getArticlesBySubcategory(params.subcategory, 10, await getIdOfNewest(params.subcategory, params.subcategory), 0),
			sidebar: await getCurrArticles(),
		},
	};
}

export default function Subcategory(props: Props) {
	const [articles, setArticles] = useState(props.articles);
	const [cursor, setCursor] = useState(null);
	const subcategory = props.subcategory;
	const sidebar = props.sidebar;
	const route = useRouter().asPath;

	async function newArticles() {
		let loading = document.getElementById("loading");
		if (loading == null) return; // to make the compiler happy
		loading.setAttribute("style", "display: block");
		const response = await fetch("/api/loadsub", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ subcategory, cursor }),
		});

		const loaded = await response.json();
		if (loaded.length != 0) {
			setArticles([...articles, ...loaded]);
			setCursor(loaded[loaded.length - 1].id);
			loading.setAttribute("style", "display: none");
		} else {
			loading.innerText = "No more articles to load.";
		}
	}

	useEffect(() => {
		async function setData() {
			let loading = document.getElementById("loading");
			if (loading == null) return;
			loading.innerText = "Loading articles, please wait...";
			loading.setAttribute("style", "display: block");

			setCursor(null);

			const articleRes = await fetch("/api/loadsub", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ subcategory, cursor: null }),
			});

			articleRes.json().then(recvd => {
				console.log(recvd);
				setArticles(recvd);
				setCursor(recvd[recvd.length - 1].id);
			});
			loading.setAttribute("style", "display: none;");
		}

		setData();
	}, [route]);

	return (
		<div className="subcategory">
			<Head>
				<title>{expandCategorySlug(subcategory)} | The Tower</title>
				<meta property="og:title" content={expandCategorySlug(subcategory) + " | The Tower"} />
				<meta property="og:description" content={expandCategorySlug(subcategory) + " at the Tower"} />
			</Head>
			<style jsx>{`
				.subcategory {
					min-height: 100vh;
				}
				h1 {
					text-align: center;
					border-bottom: 3px double black;
					margin-bottom: 1vh;
				}
				.grid {
					display: grid;
					grid-template-columns: 2.25fr 0.75fr;
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

				#loadmore {
					border-radius: 2rem;
					font-family: ${styles.font.sans};
					font-size: calc(0.25rem + 1vw);
					color: black;
					background-color: white;
					border-style: solid;
					border-color: black;
					padding: 0.5rem;
					padding-left: 0.75rem;
					padding-right: 0.75rem;
					transition: 0.25s;
				}

				#loadmore:hover {
					color: white;
					background-color: black;
				}

				#loading {
					display: none;
				}
			`}</style>
			<h1>{expandCategorySlug(subcategory)}</h1>
			<div className="grid">
				<div>
					<section>
						{articles.map(article => (
							<ArticlePreview key={article.id} article={article} style="row" size="category-list" />
						))}
					</section>
					<h3 id="loading">Loading articles, please wait...</h3>
					<button id="loadmore" onClick={newArticles}>
						Load more
					</button>
				</div>
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
