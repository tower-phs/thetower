/** @format */

import Link from "next/link";
import styles from "~/lib/styles";
import { useState } from "react";

interface Props {
	name: string;
	href: string;
	children?: any;
	className?: string;
	onClick?: () => void;
}

export default function Button({ name, href, children, className, onClick }: Props) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`dropdown ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setTimeout(() => setIsHovered(false), 150)} // Delay to prevent instant disappearance
		>
			<style jsx>{`
				.dropdown {
					position: relative;
					display: inline-block;
					text-decoration: none;
				}
				.btn {
					color: ${styles.color.accent};
					display: inline-block;
					padding: 15px;
					transition: 0.2s ease-in-out;
					box-sizing: border-box;
					position: relative;
					font-family: ${styles.font.sans};
					text-align: center;
					cursor: pointer;
					background-color: rgba(255, 255, 255, 0.9);
					border-radius: 5px;
					width: 100%;
				}
				.btn:hover {
					background-color: rgba(255, 255, 255, 1);
					transform: translateY(-2px);
					box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
				}
				.content {
					display: block;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					padding: 12px;
					min-width: 14vw;
					box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
					z-index: 1;
					opacity: ${isHovered ? "1" : "0"};
					visibility: ${isHovered ? "visible" : "hidden"};
					transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out, visibility 0.2s linear;
					background-color: ${styles.color.background};
					text-align: center;
					border-radius: 5px;
				}
				.content a {
					display: block;
					padding: 12px;
					text-decoration: none;
					color: inherit;
					white-space: nowrap;
					width: 100%;
					transition: 0.2s ease-in-out;
					border-radius: 3px;
				}
				.content a:hover {
					background-color: rgba(255, 255, 255, 1);
					transform: translateY(-2px);
					box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
				}
				@media screen and (max-width: 1000px) {
					.dropdown,
					.btn {
						display: block;
						width: 100%;
					}
					.content {
						left: 0;
						transform: none;
						min-width: 100%;
					}
				}
			`}</style>
			<Link href={href} legacyBehavior>
				<a className="btn">{name}</a>
			</Link>
			{children && <div className="content">{children}</div>}
		</div>
	);
}
