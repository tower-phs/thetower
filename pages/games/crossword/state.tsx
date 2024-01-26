/** @format */

import { createContext, useContext } from "react";
import { MutativeReducer, useMutativeReducer } from "use-mutative";

type Dispatcher = ReturnType<typeof useMutativeReducer<GameState, Action>>[1];

type Action = {};

export function initialStateFromInput(input: PuzzleInput): GameState {
	// Initialize rows and columns
	let rows = 0;
	let cols = 0;

	// Calculate grid size based on clues
	for (const directionKey in input) {
		const direction = directionKey as Direction;
		for (const num in input[direction]) {
			const clue = input[direction][num];
			if (direction === "across") {
				rows = Math.max(rows, clue.row);
				cols = Math.max(cols, clue.col + clue.answer.length);
			} else if (direction === "down") {
				rows = Math.max(rows, clue.row + clue.answer.length);
				cols = Math.max(cols, clue.col);
			}
		}
	}

	// Initialize grid with unused cells
	const grid: GridData = Array(rows)
		.fill(null)
		.map(() => Array(cols).fill({ used: false }));

	// Populate grid with used cells and set numbers for starting positions
	let clueNumber = 1;
	const clues: Clues = { across: [], down: [] };

	for (const directionKey in input) {
		const direction = directionKey as Direction;
		for (const num in input[direction]) {
			const clue = input[direction][num];
			const runtimeClue = { ...clue, num: clueNumber };
			clues[direction].push(runtimeClue);

			for (let i = 0; i < clue.answer.length; i++) {
				const row = clue.row + (direction === "down" ? i : 0);
				const col = clue.col + (direction === "across" ? i : 0);
				grid[row][col] = { used: true, answer: clue.answer[i] };
			}

			clueNumber++;
		}
	}

	// Sort the clues by their numbers
	for (const direction in clues) {
		clues[direction as Direction].sort((a, b) => a.num - b.num);
	}

	// Set initial state
	return {
		rows,
		cols,
		grid,
		clues,
		focused: false,
		selectedPosition: { row: 0, col: 0 },
		selectedDirection: "across",
	};
}

export function crosswordStateReducer(state: GameState, action: Action) {}

export const CrosswordDispatchContext = createContext<Dispatcher>(_ => {});

export function useDispatchContext(): Dispatcher {
	return useContext(CrosswordDispatchContext);
}
