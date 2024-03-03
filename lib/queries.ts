/** @format */

import { article, PrismaClient, spreads } from "@prisma/client";

const prisma = new PrismaClient();

export async function getFrontpageArticles() {
	let articles: Record<string, article[]> = { "news-features": [], opinions: [], "arts-entertainment": [], sports: [] };
	const categories = Object.keys(articles);

	for (let i = 0; i < categories.length; i++) {
		const curr = new Date();
		let month = curr.getMonth() + 3;
		let year = curr.getFullYear();

		while (!articles[categories[i]].length) {
			month--;

			let temp = await prisma.article.findMany({
				orderBy: [
					{
						id: "asc",
					},
				],
				where: {
					year: year,
					month: month,
					category: categories[i],
					published: true,
				},
			});
			articles[categories[i]] = temp;
			if (month === 0) {
				month = 13;
				year--;
			}
		}
	}

	return articles;
}

export async function getPublishedArticles() {
	const articles = await prisma.article.findMany({
		where: {
			published: true,
		},
	});

	return articles;
}

export async function getArticle(year: string, month: string, cat: string, id: string, slug: string) {
	// new scheme
	if (id !== "null") {
		const article = await prisma.article.findFirst({
			where: {
				id: parseInt(id),
				published: true,
			},
		});

		return article;
	}

	// old scheme
	const article = await prisma.article.findFirst({
		where: {
			year: parseInt(year),
			month: parseInt(month),
			category: cat,
			title: decodeURI(slug),
			published: true,
		},
	});

	return article;
}

export async function getCurrArticles() {
	const curr = new Date();
	let month = curr.getMonth() + 1;
	let year = curr.getFullYear();

	let articles = await getArticlesByDateOld(curr.getFullYear().toString(), (curr.getMonth() + 1).toString());
	while (articles.length === 0) {
		month--;
		if (month === 0) {
			month = 12;
			year--;
		}
		articles = await getArticlesByDateOld(year.toString(), month.toString());
	}

	return articles;
}

export async function getArticlesByDateOld(year: string, month: string) {
	let articles: article[] = [];

	articles = await prisma.article.findMany({
		orderBy: [
			{
				id: "desc",
			},
		],
		where: {
			year: parseInt(year),
			month: parseInt(month),
			published: true,
		},
	});

	return articles;
}

export async function getArticlesByDate(year: string, month: string) {
	let articles: Record<string, article[]> = { "news-features": [], opinions: [], "arts-entertainment": [], sports: [] };
	const categories = Object.keys(articles);

	for (let category of categories) {
		articles[category] = await prisma.article.findMany({
			orderBy: [
				{
					id: "asc",
				},
			],
			where: {
				year: parseInt(year),
				month: parseInt(month),
				published: true,
				category: category,
			},
		});
	}

	return articles;
}

export async function getIdOfNewest(cat: string, subcat: string) {
	subcat = subcat == null ? cat : subcat;
	const res = await prisma.article.findFirst({
		orderBy: [
			{
				year: "desc",
			},
			{
				month: "desc",
			},
			{
				id: "desc",
			},
		],
		where: {
			category: cat,
			subcategory: subcat,
			published: true,
		},
		select: {
			id: true,
		},
	});

	return res === null ? 0 : res.id;
}

export async function getArticlesByCategory(cat: string, take: number, offsetCursor: number, skip: number) {
	const articles = await prisma.article.findMany({
		orderBy: [
			{
				year: "desc",
			},
			{
				month: "desc",
			},
			{
				id: "desc",
			},
		],
		where: {
			category: cat,
			published: true,
		},
		take: take,
		cursor: {
			id: offsetCursor,
		},
		skip: skip,
	});

	return articles;
}

export async function getArticlesExceptCategory(cat: string) {
	let articles: any[] = [];
	let cats = ["news-features", "arts-entertainment", "opinions", "sports", "multimedia"];

	for (let i = 0; i < cats.length; i++) {
		// TODO: use foreach but make it actually work
		let c = cats[i];
		if (c == cat) continue;
		let id = await getIdOfNewest(c, c);
		let cArticles = await getArticlesByCategory(c, 2, id, 0);
		articles.push(...cArticles);
	}

	return articles;
}

export async function getArticlesBySearch(cat: string) {
	const articles = await prisma.article.findMany({
		orderBy: [
			{
				year: "desc",
			},
			{
				month: "desc",
			},
		],
		where: {
			OR: [
				{
					title: {
						contains: cat,
						mode: "insensitive",
					},
				},
				{
					authors: {
						has: cat
							.toLowerCase()
							.split(" ")
							.map(s => s.charAt(0).toUpperCase() + s.substring(1))
							.join(" "),
					},
				},
				{
					content: {
						contains: ` ${cat} `,
						mode: "insensitive",
					},
				},
			],
			published: true,
		},
	});

	return articles;
}

export async function getArticlesBySubcategory(subcat: string, take: number, offsetCursor: number, skip: number) {
	const articles = await prisma.article.findMany({
		orderBy: [
			{
				year: "desc",
			},
			{
				month: "desc",
			},
		],
		where: {
			subcategory: subcat,
			published: true,
		},
		take: take,
		cursor: {
			id: offsetCursor,
		},
		skip: skip,
	});

	return articles;
}

export async function getArticlesByAuthor(author: string) {
	const articles = await prisma.article.findMany({
		orderBy: [
			{
				year: "desc",
			},
			{
				month: "desc",
			},
		],
		where: {
			authors: {
				has: decodeURI(author),
			},
			published: true,
		},
	});

	return articles;
}

export async function getSpreadsByCategory(category: string) {
	const spreads = await prisma.spreads.findMany({
		orderBy: [
			{
				year: "desc",
			},
			{
				month: "desc",
			},
		],
		where: {
			title: {
				startsWith: category,
			},
		},
	});

	return spreads;
}

export async function getSpread(slug: string) {
	const spreads = await prisma.spreads.findFirst({
		where: {
			title: decodeURI(slug),
		},
	});

	return spreads;
}
