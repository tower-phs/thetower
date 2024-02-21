/** @format */

import { useMutativeReducer } from "use-mutative";
import { Action, CrosswordDispatchContext, crosswordStateReducer, initialStateFromInput } from "../../../lib/crossword/state";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { GetServerSidePropsResult } from "next";
import { Direction, PuzzleInput, RuntimeClue } from "~/lib/crossword/types";
import React from "react";
import { getCurrentCrossword } from "~/lib/queries";

type Props = { puzzleInput: PuzzleInput };

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Props>> {
	return {
		props: {
			puzzleInput: await getCurrentCrossword(),
		},
	};
}

export default function CrosswordGame({ puzzleInput }: Props) {
	const initialState = useMemo(() => {
		return initialStateFromInput(puzzleInput);
	}, []);

	const [state, dispatch] = useMutativeReducer(crosswordStateReducer, initialState);
	const inputRef = useRef<HTMLInputElement>(null);
	const focused = typeof window !== "undefined" ? inputRef.current == document.activeElement : false;
	const cellSize = 30;
	const hasMutatedRef = useRef(false);

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

	useEffect(() => {
		if (hasMutatedRef.current) {
			console.log("saving");
			const serializedState = JSON.stringify(state);
			localStorage.setItem("crosswordGameState", serializedState);
		}
	}, [state.grid]);

	useEffect(() => {
		console.log("loading");
		const savedState = localStorage.getItem("crosswordGameState");
		if (savedState) {
			const parsedState = JSON.parse(savedState);
			dispatch({ type: "loadState", state: parsedState });
		}
	}, []);

	const dispatchWithTracking = useCallback(
		(action: Action) => {
			dispatch(action);
			hasMutatedRef.current = true;
		},
		[dispatch]
	);

	return (
		<CrosswordDispatchContext.Provider value={dispatchWithTracking}>
			<style jsx>{`
				.crossword-container {
					display: flex;
					align-items: flex-start;
				}

				.crossword-svg {
					width: min(50vw, 75vh);
					height: min(50vw, 75vh);
					user-select: none;
					cursor: default;
					margin-top: 8px;
				}

				@media (max-width: 850px) {
					.crossword-container {
						flex-direction: column;
					}

					.crossword-svg {
						width: 90vw;
						height: 90vw;
					}
				}

				.clues-container {
					display: flex;
					flex-direction: row;
					gap: 20px;
					margin-left: 20px;
				}
			`}</style>
			<h1>The Crossword {puzzleInput.date}</h1>
			<div className="crossword-container">
				<input
					ref={inputRef}
					type="text"
					className="hidden-input"
					onKeyDown={e => dispatchWithTracking({ type: "keyDown", key: e.key })}
					style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
				/>
				<div>
					<SelectedCluePanel clue={selectedClue ?? undefined} direction={state.direction} />
					<svg
						className="crossword-svg"
						viewBox={`0 0 ${state.cols * cellSize} ${state.rows * cellSize}`}
						style={{ border: "0.25px solid black", backgroundColor: "black" }}
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
												console.log("cloick");
												dispatchWithTracking({ type: "selectCell", row: rowIndex, col: colIndex });
												inputRef.current?.focus();
											}}
											size={cellSize}
											x={colIndex}
											y={rowIndex}
										/>
									)
							)
						)}
					</svg>
				</div>
				<div className="clues-container">
					<CluesSectionMemo clues={state.clues.across} title="Across" />
					<CluesSectionMemo clues={state.clues.down} title="Down" />
				</div>
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
	const fillColor = isSelected ? "#FFD700" : isHighlighted ? "#9dd9fa" : "white";

	return (
		<g onClick={onClick}>
			<rect x={x * size} y={y * size} width={size} height={size} fill={fillColor} stroke="#555555" strokeWidth={0.6} />
			<text x={x * size + 6} y={y * size + 8} fontSize={size * 0.3} dominantBaseline="left" textAnchor="middle" fill="black">
				{num}
			</text>
			<text
				x={x * size + size / 2}
				y={y * size + (size / 3) * 2}
				dominantBaseline="middle"
				textAnchor="middle"
				fontSize={size * 0.6}
				fill="black"
			>
				{guess}
			</text>
		</g>
	);
}

type CluesSectionProps = {
	title: string;
	clues: RuntimeClue[];
};

function CluesSection({ clues, title }: CluesSectionProps): JSX.Element {
	console.log("rerendering clues");
	return (
		<div className="clues-section">
			<style jsx>{`
				.clues-section {
					margin-left: 20px; /* Adjust the margin as needed */
					display: flex;
					flex-direction: column;
				}

				ul {
					list-style: none;
					padding: 0;
					margin: 0; /* Remove default margin */
				}

				li {
					margin-bottom: 10px; /* Adjust the margin as needed */
				}

				.clue-number {
					margin-right: 5px; /* Adjust the margin as needed */
				}
			`}</style>
			<h2>{title}</h2>
			<ul>
				{clues.map((clue: RuntimeClue) => (
					<li key={clue.num}>
						<span className="clue-number">{clue.num}</span> {clue.clue}
					</li>
				))}
			</ul>
		</div>
	);
}

const CluesSectionMemo = React.memo(CluesSection);

type SelectedCluePanelProps = {
	clue?: RuntimeClue;
	direction: Direction;
};

function SelectedCluePanel({ clue, direction }: SelectedCluePanelProps) {
	return (
		<div className="panel">
			<style jsx>{`
				.panel {
					height: 70px;
					width: 100%;
					background-color: #9dd9fa99;
					display: flex;
					align-items: center;
					flex-direction: row;
				}

				.clue-ref {
					width: 70px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 16px;
				}
			`}</style>
			<div className="clue-ref">
				<b>{clue && clue.num + direction.charAt(0).toUpperCase()}</b>
			</div>
			<p>{clue && clue.clue}</p>
		</div>
	);
}
