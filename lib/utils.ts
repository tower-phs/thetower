/** @format */

import { article } from "@prisma/client";
import camelCase from "lodash/camelCase";
import startCase from "lodash/startCase";

import { months, categorySlugs } from "./constants";

export interface ArticleData {
	slug: string;
	articles: article[];
}

export function expandCategorySlug(slug: string) {
	const expanded = categorySlugs.get(slug);
	if (expanded) return expanded;
	return startCase(camelCase(slug));
}

export function displayDate(year: number, month: number) {
	return months[month] + ", " + year;
}

export function shortenText(text: string, length: number) {
	if (length === 0) return "";

	const sentences = text.substring(0, length).split(" ");
	sentences.pop();
	return sentences.join(" ").replace(/[\n\r\t\s]+/g, " ") + "...";
}
