/** @format */

import Link from "next/link";
import styles from "~/lib/styles";

interface Props {
	name: string;
	href: string;
	children?: any;
	className?: string;
	onClick?: () => void;
}

export default function Button({ name, href, children, className, onClick }: Props) {
	return (
		<div className={`dropdown ${className}`} onClick={onClick}>
			<style jsx>{`
				.dropdown {
					position: relative;
					display: inline-block;
					text-decoration: none;
				}
				.showMenu {
					display: none;
				}
				.dropdown:hover .content {
					display: block;
					opacity: 1;
				}
				.btn {
					color: /*${styles.color.primary}*/ white;
					background-color: ${styles.color.navbar};
					display: inline-block;
					padding: 15px;
					font-size: medium;
					transition: 0.1s ease-in;
					box-sizing: border-box;
					position: relative;
				}
				.btn::after {
					content: "";
					display: block;
					position: absolute;
					top: 0;
					right: 0;
					width: 100%;
					height: 0%;
					background-color: ${styles.color.accent};
					transition: 0.1s ease-in;
				}
				.btn:hover::after {
					height: 10%;
				}
				.content {
					display: block;
					position: absolute;
					font-size: medium;
					padding: 12px;

					min-width: 14vw;
					box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
					z-index: 1;
					opacity: 0;
					transition: 0.1s ease-in opacity;

					background-color: ${styles.color.background};
				}
				.content a:hover {
					cursor: pointer;
					color: #474747;
				}
				@media screen and (max-width: 1000px) {
					.showMenu,
					.dropdown,
					.btn {
						display: block;
						width: 100%;
					}
				}
			`}</style>
			<Link href={href}>
				<a className="btn">{name}</a>
			</Link>
			{children && <div className="content">{children}</div>}
		</div>
	);
}
