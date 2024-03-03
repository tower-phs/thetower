/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import { getArticlesByCategory, getArticlesBySubcategory, getIdOfNewest } from "~/lib/queries";

const categories: { [key: string]: string } = {
	"phs-profiles": "news-features",
	"student-athletes": "sports",
	"cheers-jeers": "opinions",
	editorials: "opinions",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method != "POST") return res.status(400);

	const subcat = req.body.subcategory;
	const category = categories[subcat];
	const cursor = req.body.cursor;
	const articles =
		cursor != null
			? await getArticlesBySubcategory(subcat, 10, cursor, 1)
			: await getArticlesBySubcategory(subcat, 10, await getIdOfNewest(category, subcat), 0);
	return res.status(200).json(articles);
}
