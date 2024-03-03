/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import { getArticlesByCategory, getIdOfNewest } from "~/lib/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method != "POST") return res.status(400);

	const category = req.body.category;
	const cursor = req.body.cursor;
	const articles =
		cursor != null
			? await getArticlesByCategory(category, 10, cursor, 1)
			: await getArticlesByCategory(category, 10, await getIdOfNewest(category), 0);
	return res.status(200).json(articles);
}
