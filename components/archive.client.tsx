/** @format */
import Link from "next/link";
import { months } from "~/lib/constants";
import styles from "~/lib/styles";

interface Props {
	month: number;
	year: number;
}

export default function VirtualArchive({ month, year }: Props) {
	const img = "/assets/default.png";

	return (
		<div className="archive">
			<style jsx>{`
				.archive {
					display: flexbox;
					cursor: pointer;
					justify-content: left;
					background-color: #f0f0f0;
					padding: 30px;
					margin: 10px;
				}
				.archive:hover {
					background-color: #d0d0d0;
				}
				p {
					text-align: center;
					font-size: 1.5rem;
				}
				hr {
					max-width: 26vw;
					margin: 0.5vh;
					height: 1px;
					background-color: gainsboro;
					border: none;
				}
				.thumbnail {
					position: relative;
				}
			`}</style>
			<div className="thumbnail">
				<Link href={`/archives/${year}/${month}`}>
					<p>{`${months[month]} ${year}`}</p>
				</Link>
			</div>
		</div>
	);
}
