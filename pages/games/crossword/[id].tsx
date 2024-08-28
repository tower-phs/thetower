/** @format */

import { GetServerSidePropsResult } from "next";
import { getCrosswordById } from "~/lib/queries";
import CrosswordGame from "~/components/crossword.client";
import { PuzzleInput } from "~/lib/crossword/types";

type Props = { puzzleInput: PuzzleInput };

interface Params {
    id: number;
}

export async function getServerSideProps({id}: Params): Promise<GetServerSidePropsResult<Props>> {
	const crossword = await getCrosswordById(id)
    if (crossword == null) return {redirect: {permanent: false, destination: "/404"}}
    return {
		props: {
			puzzleInput: crossword,
		},
	};
}

export default function Game(props: Props) {
	return (<CrosswordGame puzzleInput={props.puzzleInput} />)
}