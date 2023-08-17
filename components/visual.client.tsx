/** @format */

import Image from "next/image";

interface Props {
	credit?: string;
	graphic?: boolean;
	courtesy?: boolean;
	src: string;
}

export default function Visual({ credit, graphic, courtesy }: Props) {}
