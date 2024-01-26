/** @format */

import { createContext, useContext } from "react";
import { useMutativeReducer } from "use-mutative";
import { Clues, Direction, GameState, GridData, PuzzleInput } from "./types";

type Dispatcher = ReturnType<typeof useMutativeReducer<GameState, Action>>[1];

type Action = { type: "selectCell"; col: number; row: number } | { type: "enterGuess"; letter: string };

export function initialStateFromInput(input: PuzzleInput): GameState {
	// Initialize rows and columns
	let max = 0;

	// Calculate grid size based on clues
	for (const directionKey in input) {
		const direction = directionKey as Direction;
		for (const num in input[direction]) {
			const clue = input[direction][num];
			if (direction === "across") {
				max = Math.max(max, clue.row);
				max = Math.max(max, clue.col + clue.answer.length);
			} else if (direction === "down") {
				max = Math.max(max, clue.row + clue.answer.length);
				max = Math.max(max, clue.col);
			}
		}
	}

	// Initialize grid with unused cells
	const grid: GridData = Array(max)
		.fill(null)
		.map(() => Array(max).fill({ used: false }));

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
		rows: max,
		cols: max,
		grid,
		clues,
		focused: false,
		selectedPosition: { row: 0, col: 0 },
		selectedDirection: "across",
	};
}

export function crosswordStateReducer(state: GameState, action: Action) {
	switch (action.type) {
		case "selectCell": {
			if (state.selectedPosition.col == action.col && state.selectedPosition.row == action.row) {
				state.selectedDirection = state.selectedDirection == "across" ? "down" : "across";
			} else {
				state.selectedPosition = { col: action.col, row: action.row };
			}
			// state.focused = true
			break;
		}
		case "enterGuess": {
			const cell = state.grid[state.selectedPosition.row][state.selectedPosition.col];
			if (cell.used) {
				cell.guess = action.letter;
			}
			break;
		}
	}
}

export const CrosswordDispatchContext = createContext<Dispatcher>(_ => {});

export function useDispatchContext(): Dispatcher {
	return useContext(CrosswordDispatchContext);
}
