/** @format */

import Head from "next/head";
import styles from "~/lib/styles";

export default function PageNotFound() {
	return (
		<div className="404">
			<Head>
				<title>Page Not Found | The Tower</title>
				<meta property="og:title" content={"Page Not Found | The Tower"} />
				<meta property="og:description" content={"The page you were looking for could not be found."} />
			</Head>
			<style jsx>{`
				h1 {
					font-family: ${styles.font.previewHeader};
					text-align: center;
					font-size: 3rem;
				}
			`}</style>
			<h1>The page you were looking for does not exist.</h1>
		</div>
	);
}
