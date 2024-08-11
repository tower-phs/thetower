/** @format */

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method != "POST") return res.status(400);

    console.log("body:")
	console.log(req.body)
	return res.status(200).json({content: req.body});
}
