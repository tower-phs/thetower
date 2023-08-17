/** @format */

import { article, PrismaClient, spreads } from "@prisma/client";

const prisma = new PrismaClient();

export async function getFrontpageArticles() {
	let articles: Record<string, article[]> = { "news-features": [], opinions: [], "arts-entertainment": [], sports: [] };
	const categories = Object.keys(articles);

	await prisma.$connect();
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
				month = 12;
				year--;
			}
		}
	}

	prisma.$disconnect();

	return articles;
}

export async function getPublishedArticles() {
	await prisma.$connect();

	const articles = await prisma.article.findMany({
		where: {
			published: true,
		},
	});

	prisma.$disconnect();

	return articles;
}

export async function getArticle(year: string, month: string, cat: string, slug: string) {
	await prisma.$connect();

	const article = await prisma.article.findFirst({
		where: {
			year: parseInt(year),
			month: parseInt(month),
			category: cat,
			title: decodeURI(slug),
			published: true,
		},
	});

	prisma.$disconnect();

	return article;
}

export async function getCurrArticles() {
	await prisma.$connect();

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

	prisma.$disconnect();

	return articles;
}

export async function getArticlesByDateOld(year: string, month: string) {
	let articles: article[] = [];

	await prisma.$connect();

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

	prisma.$disconnect();

	return articles;
}

export async function getArticlesByDate(year: string, month: string) {
	let articles: Record<string, article[]> = { "news-features": [], opinions: [], "arts-entertainment": [], sports: [] };
	const categories = Object.keys(articles);

	await prisma.$connect();

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

	prisma.$disconnect();

	return articles;
}

export async function getArticlesByCategory(cat: string) {
	await prisma.$connect();

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
			category: cat,
			published: true,
		},
	});

	prisma.$disconnect();

	return articles;
}

export async function getArticlesBySearch(cat: string) {
	await prisma.$connect();
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

	prisma.$disconnect();

	return articles;
}

export async function getArticlesBySubcategory(subcat: string) {
	await prisma.$connect();

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
	});

	prisma.$disconnect();

	return articles;
}

export async function getArticlesByAuthor(author: string) {
	await prisma.$connect();

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

	prisma.$disconnect();

	return articles;
}

export async function getSpreadsByCategory(category: string) {
	await prisma.$connect();

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

	prisma.$disconnect();

	return spreads;
}

export async function getSpread(slug: string) {
	await prisma.$connect();

	const spreads = await prisma.spreads.findFirst({
		where: {
			title: decodeURI(slug),
		},
	});

	prisma.$disconnect();

	return spreads;
}
