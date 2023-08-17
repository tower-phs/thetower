/** @format */

export const years = ["2023", "2022"];
// add an empty string "" between every year so a line seperator appears

export const categorySlugs = new Map<string, string>([
	["news-features", "News & Features"],
	["phs-profiles", "PHS Profiles"],
	["cheers-jeers", "Cheers & Jeers"],
	["arts-entertainment", "Arts & Entertainment"],
	["special", "Special Issues"],
	["nsi", "New Student Issues"],
]);

export const categories = ["news-features", "multimedia", "opinions", "vanguard", "arts-entertainment", "sports", "special"];

export const subcategories = [
	["news-features", "phs-profiles"],
	["opinions", "editorials"],
	["opinions", "cheers-jeers"],
	["vanguard", "random-musings"],
	["vanguard", "spreads"],
	["arts-entertainment", "student-artists"],
	["sports", "student-athletes"],
	["special", "nsi"],
];

export const months: string[] = [
	"",
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
