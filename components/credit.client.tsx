/** @format */

import Link from "next/link";
import styles from "~/lib/styles";

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
					font-family: ${styles.font.sans};
				}
				a:hover {
					text-decoration: underline;
				}
			`}</style>
			<Link legacyBehavior className="credit-link" href={"/credit/" + encodeURI(author)}>
				<a>{author}</a>
			</Link>
		</>
	);
}
