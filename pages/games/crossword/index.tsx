/** @format */

import { useMutativeReducer } from "use-mutative";
import { CrosswordDispatchContext, crosswordStateReducer, initialStateFromInput } from "../../../lib/crossword/state";
import { useMemo, useRef } from "react";
import { GetServerSidePropsResult } from "next";
import { Direction, PuzzleInput, RuntimeClue } from "~/lib/crossword/types";

type Props = { puzzleInput: PuzzleInput };

export function getServerSideProps(): GetServerSidePropsResult<Props> {
	const clue = "";
	return {
		props: {
			puzzleInput: {
				across: {
					1: { clue: "This", answer: "XXX", row: 0, col: 0 },
					4: { clue: "is", answer: "XXX", row: 0, col: 4 },
					7: { clue: "not", answer: "XXX", row: 1, col: 0 },
					8: { clue: "a", answer: "XXXX", row: 1, col: 4 },
					10: { clue: "real", answer: "XX", row: 2, col: 0 },
					11: { clue: "crossword,", answer: "XX", row: 2, col: 3 },
					12: { clue: "it", answer: "XX", row: 2, col: 6 },
					13: { clue: "is", answer: "XXXXXX", row: 3, col: 0 },
					16: { clue: "only", answer: "XXXXXX", row: 4, col: 2 },
					19: { clue: "showing", answer: "XX", row: 5, col: 0 },
					21: { clue: "the", answer: "XX", row: 5, col: 3 },
					22: { clue: "kind", answer: "XX", row: 5, col: 6 },
					23: { clue: "of", answer: "XXXX", row: 6, col: 0 },
					25: { clue: "thing", answer: "XXX", row: 6, col: 5 },
					26: { clue: "you", answer: "XXX", row: 7, col: 1 },
					27: { clue: "can", answer: "XXX", row: 7, col: 5 },
				},
				down: {
					1: { clue: "create.", answer: "XXXX", row: 0, col: 0 },
					2: { clue: "All", answer: "XXXX", row: 0, col: 1 },
					3: { clue: "of", answer: "XX", row: 0, col: 2 },
					4: { clue: "the", answer: "XXXXXX", row: 0, col: 4 },
					5: { clue: "answers", answer: "XX", row: 0, col: 5 },
					6: { clue: "are", answer: "XXX", row: 0, col: 6 },
					9: { clue: '"X"', answer: "XX", row: 1, col: 7 },
					11: { clue, answer: "XXXXXX", row: 2, col: 3 },
					14: { clue, answer: "XX", row: 3, col: 2 },
					15: { clue, answer: "XX", row: 3, col: 5 },
					17: { clue, answer: "XXXX", row: 4, col: 6 },
					18: { clue, answer: "XXXX", row: 4, col: 7 },
					19: { clue, answer: "XX", row: 5, col: 0 },
					20: { clue, answer: "XXX", row: 5, col: 1 },
					24: { clue, answer: "XX", row: 6, col: 2 },
					25: { clue, answer: "XX", row: 6, col: 5 },
				},
			},
		},
	};
}

export default function CrosswordGame({ puzzleInput }: Props) {
	const [state, dispatch] = useMutativeReducer(crosswordStateReducer, initialStateFromInput(puzzleInput));
	const inputRef = useRef<HTMLInputElement>(null);
	const focused = typeof window !== "undefined" ? inputRef.current == document.activeElement : false;
	const cellSize = 30;

	// Function to find the clue associated with the selected cell
	const selectedClue = useMemo(() => {
		if (!focused) {
			return null;
		}
		const { row, col } = state.position;

		const clue =
			state.direction == "across"
				? state.clues.across.find(clue => row === clue.row && col >= clue.col && col < clue.col + clue.answer.length) ?? null
				: state.clues.down.find(clue => col === clue.col && row >= clue.row && row < clue.row + clue.answer.length) ?? null;

		return clue;
	}, [state.position, state.direction, state.clues]);

	return (
		<CrosswordDispatchContext.Provider value={dispatch}>
			<div className="crossword-container">
				<input
					ref={inputRef}
					type="text"
					className="hidden-input"
					onKeyDown={e => dispatch({ type: "keyDown", key: e.key })}
					style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
				/>
				<svg
					className="crossword-svg"
					width={state.cols * cellSize}
					height={state.rows * cellSize}
					style={{ border: "1px solid black", backgroundColor: "black" }}
				>
					{state.grid.map((row, rowIndex) =>
						row.map(
							(cell, colIndex) =>
								cell.used && (
									<Cell
										key={`${rowIndex}-${colIndex}`}
										guess={cell.guess}
										answer={cell.answer}
										num={cell.num}
										isSelected={focused && rowIndex == state.position.row && colIndex == state.position.col}
										isHighlighted={
											state.direction == "across"
												? selectedClue?.row == rowIndex &&
												  colIndex >= selectedClue?.col &&
												  colIndex < selectedClue?.col + selectedClue?.answer.length
												: selectedClue?.col == colIndex &&
												  rowIndex >= selectedClue?.row &&
												  rowIndex < selectedClue?.row + selectedClue?.answer.length
										}
										onClick={() => {
											dispatch({ type: "selectCell", row: rowIndex, col: colIndex });
											inputRef.current?.focus();
											console.log("click");
										}}
										size={cellSize}
										x={colIndex}
										y={rowIndex}
									/>
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
	onClick: () => void;
	isSelected: boolean;
	isHighlighted: boolean;
	size: number;
	num?: number;
	x: number;
	y: number;
};

function Cell({ guess, answer, isSelected, isHighlighted, size, x, y, onClick, num }: CellProps): JSX.Element {
	const fillColor = isSelected ? "blue" : isHighlighted ? "lightblue" : "white";
	const textColor = isSelected || isHighlighted ? "white" : "black";

	return (
		<g onClick={onClick}>
			<rect x={x * size} y={y * size} width={size} height={size} fill={fillColor} stroke="black" />
			num &&{" "}
			<text x={x * size + 6} y={y * size + 6} fontSize={size * 0.3} dominantBaseline="middle" textAnchor="middle" fill="black">
				{num}
			</text>
			<text
				x={x * size + size / 2}
				y={y * size + size / 2}
				dominantBaseline="middle"
				textAnchor="middle"
				fontSize={size * 0.6}
				fill={textColor}
			>
				{guess}
			</text>
		</g>
	);
}
