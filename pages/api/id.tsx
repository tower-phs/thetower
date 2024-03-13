/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import { getArticlesByCategory, getIdOfNewest } from "~/lib/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method != "POST") return res.status(400);

	const category = req.body.cateogry;
	const id = await getIdOfNewest(category, null);
	return res.status(200).json(id);
}
