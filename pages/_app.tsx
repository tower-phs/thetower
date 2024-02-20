/** @format */

import type { AppProps, NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { FaFacebookSquare } from "@react-icons/all-files/fa/FaFacebookSquare";
import { FaInstagramSquare } from "@react-icons/all-files/fa/FaInstagramSquare";
import { FaYoutubeSquare } from "@react-icons/all-files/fa/FaYoutubeSquare";
import { FaSpotify } from "@react-icons/all-files/fa/FaSpotify";
import { SiApplepodcasts } from "@react-icons/all-files/si/SiApplepodcasts";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import Button from "~/components/button.client";

import "~/styles/styles.scss";
import styles from "~/lib/styles";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div>
			<Head>
				<title>Home | The Tower</title>
				<link rel="icon" href="/favicon.ico" sizes="32x32" />
			</Head>
			<Banner />
			<NavBar />
			<main className="content">
				<style jsx>{`
					main {
						display: block;
						margin-top: 4vh;
						margin-left: 5vw;
						margin-right: 5vw;
					}
				`}</style>
				<Component {...pageProps} />
			</main>
			<Footer />
		</div>
	);
}

function Banner() {
	return (
		<div className="banner">
			<style jsx>{`
				.banner {
					margin: 0px;
					padding-top: 0px;
					position: relative;
					background-color: ${styles.color.navbar};
				}
				.image {
					display: block;
					margin-left: auto;
					text-align: center;
					margin: 0px;
					padding: 0;
				}
				.image Image {
					display: inline-block;
					padding: 0;
					margin: 0;
				}
				.image:hover {
					cursor: pointer;
				}
				.sub {
					position: absolute;
					left: 1vw;
					top: 5px;
					bottom: 5px;
					font-family: ${styles.font.folio};
				}
				.search {
					position: absolute;
					right: 1vw;
					bottom: 20px;
				}
				.search input {
					width: 200px;
					height: 30px;
					border: 1px solid ${styles.color.accent};
					border-radius: 5px 0px 0px 5px;
					padding: 5px;
					font-family: ${styles.font.folio};
					box-sizing: border-box;
					vertical-align: middle;
					color: ${styles.color.accent};
				}
				.search input::placeholder {
					color: ${styles.color.accent};
				}
				.search button {
					width: 30px;
					height: 29.5px;
					border: 1px solid ${styles.color.accent};
					border-radius: 5px 0px 0px 5px;
					transform: scaleX(-1);
					background-color: ${styles.color.accent};
					color: ${styles.color.navbar};
					font-family: ${styles.font.folio};
					cursor: pointer;
					box-sizing: border-box;
					padding: 5px;
					vertical-align: middle;
				}
				@media screen and (max-width: 1000px) {
					.sub,
					.search {
						display: none;
					}
				}
			`}</style>
			<div className="sub">
				<Link href="/subscribe">
					<span style={{ color: "white", cursor: "pointer", fontFamily: styles.font.folio }}>SUBSCRIBE</span>
				</Link>
				<br />
				<Link href="https://yusjougmsdnhcsksadaw.supabase.co/storage/v1/object/public/prints/1223-full.pdf">
					<span style={{ color: "white", cursor: "pointer", fontFamily: styles.font.folio }}>PRINT EDITION</span>
				</Link>
				<br />
				<span style={{ fontFamily: styles.font.folio, color: "lightgray" }}>{dayjs().format("dddd, MMMM D, YYYY ").toUpperCase()}</span>
			</div>
			<div className="search">
				<input
					type="text"
					placeholder="Search"
					onKeyDown={e => {
						if (e.key === "Enter") {
							window.location.href = "/search/" + document.getElementsByTagName("input")[0].value;
						}
					}}
				/>
				<button
					onClick={() => {
						window.location.href = "/search/" + document.getElementsByTagName("input")[0].value;
					}}
				>
					🔎︎
				</button>
			</div>
			<div className="image">
				<Link href="/home" passHref>
					<Image src="/assets/logo.png" alt="Tower banner" width={250} height={75} priority />
				</Link>
			</div>
		</div>
	);
}

function Footer() {
	return (
		<div className="footer">
			<style jsx>{`
				.footer {
					display: grid;
					padding-top: 2vh;
					width: 90vw;
					margin-left: 5vw;
				}
				hr {
					align-self: center;
					background-color: #ccc;
					border: none;
					margin-top: 3vh;
					margin-bottom: 1vh;
					height: 3px;
				}
				.top h1 {
					font-family: Canterbury;
					font-size: xxx-large;
					float: left;
					padding-right: 10px;
				}
				.top a {
					display: inline-block;
					position: relative;
					padding-top: 2.5vh;
				}
				.top .home-btn {
					font-size: small;
					color: #274370;
					float: right;
					margin-right: 2.5vh;
				}
				.bottom {
					font-family: "Courier New";
					margin: 1vh;
					display: grid;
					grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
				}
				@media screen and (max-width: 700px) {
					.bottom {
						grid-template-columns: 1fr;
					}
				}
				.bottom b {
					font-size: 1.1em;
					font-weight: bolder;
				}

				.bottom a {
					font-size: 0.9em;
				}
				span {
					padding-bottom: 2vh;
				}

				.sub {
					text-align: center;
					align-items: center;
				}

				.sub h2 {
					font-weight: bold;
				}

				.sub p {
					margin-left: 20%;
					margin-right: 20%;
				}

				.sub-link {
					font-size: 1.25rem;
					border-color: ${styles.color.navbar};
					border-style: solid;
					background-color: white;
					transition: 0.25s;
					padding: 0.5rem;
				}

				.sub-link:hover {
					color: white;
					background-color: ${styles.color.navbar};
				}
			`}</style>
			<hr />
			<div className="sub">
				<h2>Consider subscribing to The Tower.</h2>
				{/* <p>You'll be supporting an award-winning school newspaper.</p> */}
				<p>
					For $30.00 a year, subscribers to The Tower will receive all eight issues shipped to their home or business over the course of the
					year.
				</p>
				<br />
				<Link href="/subscribe">
					<p className="sub-link">Learn more</p>
				</Link>
			</div>
			<hr />
			<div className="top">
				<h1>The Tower</h1>
				<a href="https://www.instagram.com/thetowerphs/" target="_blank" rel="noopener noreferrer">
					<FaInstagramSquare size="2.2em" />
				</a>
				<a href="https://www.facebook.com/phstower" target="_blank" rel="noopener noreferrer">
					<FaFacebookSquare size="2.2em" />
				</a>
				<a href="https://www.youtube.com/channel/UCoopcAJbsz-qlTS2xkVWplQ" target="_blank" rel="noopener noreferrer">
					<FaYoutubeSquare size="2.2rem" />
				</a>
				<a href="https://open.spotify.com/show/2c0TlU1f01LKoVPaMMDxB8?si=f1fa622c0339438e" target="_blank" rel="noopener noreferrer">
					<FaSpotify size="2.2rem" />
				</a>
				<a href="https://podcasts.apple.com/us/podcast/phs-talks/id1674696258" target="_blank" rel="noopener noreferrer">
					<SiApplepodcasts size="2.2rem" />
				</a>
				<Link href="/home" legacyBehavior>
					<a className="home-btn">Go to home page »</a>
				</Link>
			</div>
			<div className="bottom">
				<div>
					<b>
						<Link style={{ fontFamily: styles.font.header }} href="/category/news-features">
							NEWS & FEATURES
						</Link>
						<br />
					</b>
					<Link href="/category/news-features/phs-profiles">PHS Profiles</Link>
					<br />
				</div>
				<div>
					<b>
						<Link style={{ fontFamily: styles.font.header }} href="/category/opinions">
							OPINIONS
						</Link>
						<br />
					</b>
					<Link href="/category/opinions/editorials">Editorials</Link>
					<br />
					<Link href="/category/opinions/cheers-jeers">Cheers & Jeers</Link>
					<br />
				</div>
				<div>
					<b>
						<Link style={{ fontFamily: styles.font.header }} href="/category/vanguard">
							VANGUARD
						</Link>
						<br />
					</b>
					<Link href="/category/vanguard/random-musings">Random Musings</Link>
					<br />
					<Link href="/category/vanguard/spreads">Spreads</Link>
					<br />
				</div>
				<div>
					<b>
						<Link style={{ fontFamily: styles.font.header }} href="/category/arts-entertainment">
							ARTS & ENTERTAINMENT
						</Link>
						<br />
					</b>
					<Link href="/category/arts-entertainment/student-artists">Student Artists</Link>
					<br />
				</div>
				<div>
					<b>
						<Link style={{ fontFamily: styles.font.header }} href="/category/sports">
							SPORTS
						</Link>
						<br />
					</b>
					<Link href="/category/sports/student-athletes">Student Athletes</Link>
				</div>
			</div>
			<hr />
			<span>© 2017-2024 The Tower</span>
			<span>Site by Luke Tong &apos;23, Jieruei Chang &apos;24, Henry Langmack &apos;25, and Ayush Shrivastava &apos;25</span>
		</div>
	);
}

function NavBar() {
	return (
		<div className="navbar">
			<style jsx>{`
				.navbar {
					display: block;
					background-color: ${styles.color.navbar} !important;
					margin-bottom: 2vh;
					text-align: center;
					width: 100%;
					border-top: 1px solid ${styles.color.accent};
					font-family: ${styles.font.folio}, "Courier New";
				}

				.navbar hr {
					background-color: #ccc;
					border: none;
					height: 1px;
					margin-top: 5px;
					margin-bottom: 5px;
				}

				.menu {
					display: contents;
					font-family: ${styles.font.folio}, "Courier New";
				}

				@media screen and (max-width: 1000px) {
					.menu {
						display: none;
					}
					.show {
						display: contents !important;
					}
				}
			`}</style>
			<Button
				name="☰"
				href=""
				className="showMenu"
				onClick={() => {
					let menu = document.querySelector(".menu");
					console.log(menu);
					if (menu) menu.classList.toggle("show");
				}}
			></Button>
			<div className="menu">
				<Button name="NEWS & FEATURES" href="/category/news-features">
					<Link href="/category/news-features/phs-profiles">PHS Profiles</Link>
				</Button>

				<Button name="MULTIMEDIA" href="/category/multimedia"></Button>

				<Button name="OPINONS" href="/category/opinions">
					<Link href="/category/opinions/editorials">Editorials</Link>
					<hr />
					<Link href="/category/opinions/cheers-jeers">Cheers & Jeers</Link>
				</Button>

				<Button name="VANGUARD" href="/category/vanguard">
					<Link href="/category/vanguard">Spreads</Link>
					<hr />
					<Link href="/category/vanguard/vanguard">Articles</Link>
				</Button>

				<Button name="ARTS & ENTERTAINMENT" href="/category/arts-entertainment">
					<Link href="/category/arts-entertainment/student-artists">Student Artists</Link>
				</Button>

				<Button name="SPORTS" href="/category/sports">
					<Link href="/category/sports/student-athletes">Student Athletes</Link>
				</Button>

				<Button name="ABOUT" href="/about">
					<Link href="/about/2024">2024 Staff</Link>
					<hr />
					<Link href="/about/2023">2023 Staff</Link>
					<hr />
					<Link href="/about/2022">2022 Staff</Link>
				</Button>

				<Button name="ARCHIVES" href="/archives">
					<Link href="/category/special/nsi">New Student Issues</Link>
				</Button>
			</div>
		</div>
	);
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
	console.log(metric);
}
