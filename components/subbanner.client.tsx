import Link from "next/link"
import styles from "~/lib/styles"

interface Props {
    title: String
}

export default function SubBanner({title}: Props) {
    return (
        <div>
            <style jsx>{`
                .sub-banner {
					text-align: center;
					align-items: center;
				}

				.sub-banner h2 {
					/* font-family: ${styles.font.serifHeader};
					font-weight: bold;
					font-size: calc(1.25rem + 1vw); */
				}

				.sub-banner p {
					margin-left: 20%;
					margin-right: 20%;
					/* font-size: 1.25rem; */
				}

				.sub-link {
					/* font-size: 1.25rem; */
					border-color: ${styles.color.darkAccent};
					border-style: solid;
					background-color: white;
					transition: 0.25s;
					padding: 0.5rem;
				}

				.sub-link:hover {
					color: white;
					background-color: ${styles.color.darkAccent};
				}

                hr {
                    width: 90vw;
					align-self: center;
					background-color: #ccc;
					border: none;
					margin-top: 3vh;
					margin-bottom: 1vh;
					height: 3px;
                }

            `}</style>
            <div className="sub-banner">
                <hr />
                <h2>{title}</h2>
                <p>
                    For $30.00 a year, subscribers to The Tower will receive all eight issues shipped to their home or business over the course of the
                    year.
                </p>
                <br />
                <Link href="/subscribe">
                    <p className="sub-link">Learn more</p>
                </Link>
            </div>
        </div>   
    )
}