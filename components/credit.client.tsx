/** @format */

import Link from "next/link";

interface Props {
	author: string;
	small?: boolean;
}

export default function CreditLink({ author, small }: Props) {
	return (
		<>
			<style jsx>{`
				a {
					${small ? "color: #8b8b8b;" : "font-size: large;color: #8b8b8b;"}
				}
				a:hover {
					text-decoration: underline;
				}
			`}</style>
			<Link className="credit-link" href={"/credit/" + encodeURI(author)}>
				<a>{author}</a>
			</Link>
		</>
	);
}
