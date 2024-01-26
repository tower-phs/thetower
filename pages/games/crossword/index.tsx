/** @format */

import { useMutativeReducer } from "use-mutative";
import { CrosswordDispatchContext, crosswordStateReducer, initialStateFromInput, useDispatchContext } from "./state";
import { useRef } from "react";
import { GetServerSidePropsResult } from "next";

type Props = { puzzleInput: PuzzleInput };

export function getServerSideProps(): GetServerSidePropsResult<Props> {
	return {
		props: {
			puzzleInput: {
				across: {
					1: {
						clue: "one plus one",
						answer: "TWO",
						row: 0,
						col: 0,
					},
				},
				down: {
					2: {
						clue: "three minus two",
						answer: "ONE",
						row: 0,
						col: 2,
					},
				},
			},
		},
	};
}

export default function CrosswordGame({ puzzleInput }: Props) {
	const [state, reducer] = useMutativeReducer(crosswordStateReducer, initialStateFromInput(puzzleInput));
	const inputRef = useRef<HTMLInputElement>(null);

	const cellSize = 30;

	return (
		<CrosswordDispatchContext.Provider value={reducer}>
			<div className="crossword-container">
				<svg className="crossword-svg" width={state.cols * cellSize} height={state.rows * cellSize} style={{ border: "1px solid black" }}>
					{state.grid.map((row, rowIndex) =>
						row.map((cell, colIndex) =>
							cell.used ? (
								<Cell
									key={`${rowIndex}-${colIndex}`}
									guess={cell.guess}
									answer={cell.answer}
									isSelected={false}
									isHighlighted={false}
									size={cellSize}
									x={colIndex * cellSize}
									y={rowIndex * cellSize}
								/>
							) : (
								<></>
							)
						)
					)}
				</svg>
				{/* Clues rendering */}
			</div>
		</CrosswordDispatchContext.Provider>
	);
}

type CellProps = {
	guess?: string;
	answer: string;
	isSelected: boolean;
	isHighlighted: boolean;
	size: number;
	x: number;
	y: number;
};

function Cell({ guess, answer, isSelected, isHighlighted, size, x, y }: CellProps): JSX.Element {
	const dispatch = useDispatchContext();

	const fillColor = isSelected ? "blue" : isHighlighted ? "lightblue" : "white";
	const textColor = isSelected || isHighlighted ? "white" : "black";

	return (
		<g onClick={() => dispatch({})}>
			<rect x={x} y={y} width={size} height={size} fill={fillColor} stroke="black" />
			<text x={x + size / 2} y={y + size / 2} dominantBaseline="middle" textAnchor="middle" fontSize={size * 0.6} fill={textColor}>
				{guess}
			</text>
		</g>
	);
}
