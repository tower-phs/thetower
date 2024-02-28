/** @format */

import { createContext, useContext } from "react";
import { useMutativeReducer } from "use-mutative";
import { Clues, Direction, GameState, GridData, PuzzleInput, SavedPuzzleState } from "./types";

type Dispatcher = ReturnType<typeof useMutativeReducer<GameState, Action>>[1];

export function initialStateFromInput(input: PuzzleInput, existingGrid?: GridData): GameState {
	console.log("create an initial state");
	let max = 0;

	for (const directionKey in input.clues) {
		const direction = directionKey as Direction;
		for (const num in input.clues[direction]) {
			const clue = input.clues[direction][num];
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
	const clues: Clues = { across: [], down: [] };

	for (const directionKey in input.clues) {
		const direction = directionKey as Direction;
		for (const num in input.clues[direction]) {
			const actualNum = num as unknown as string;
			const clue = input.clues[direction][num];
			const runtimeClue = { ...clue, num: actualNum };
			clues[direction].push(runtimeClue);

			for (let i = 0; i < clue.answer.length; i++) {
				const row = clue.row + (direction === "down" ? i : 0);
				const col = clue.col + (direction === "across" ? i : 0);
				const existing = grid[row][col];
				grid[row][col] = { used: true, answer: clue.answer[i], num: i == 0 ? actualNum : existing.used ? existing.num : undefined };
			}
		}
	}

	// Sort the clues by their numbers
	for (const direction in clues) {
		clues[direction as Direction].sort((a, b) => Number(a.num) - Number(b.num));
	}

	// Set initial state
	return {
		rows: max,
		cols: max,
		grid: existingGrid ?? grid,
		clues,
		position: { row: 0, col: 0 },
		direction: "across",
		seconds: 0,
	};
}

export type Action =
	| { type: "selectCell"; col: number; row: number }
	| { type: "keyDown"; key: string }
	| { type: "loadState"; state: SavedPuzzleState }
	| { type: "tick" };

export function crosswordStateReducer(state: GameState, action: Action) {
	function moveRelative(rows: number, cols: number) {
		const newRow = state.position.row + rows;
		const newCol = state.position.col + cols;
		if (newRow >= 0 && newRow < state.rows && state.grid[newRow][state.position.col].used) {
			state.position.row = newRow;
		}
		if (newCol >= 0 && newCol < state.cols && state.grid[state.position.row][newCol].used) {
			state.position.col = newCol;
		}
	}

	function moveForward() {
		if (state.direction == "across") {
			moveRelative(0, 1);
		} else {
			moveRelative(1, 0);
		}
	}

	function moveBackward() {
		if (state.direction == "across") {
			moveRelative(0, -1);
		} else {
			moveRelative(-1, 0);
		}
	}

	switch (action.type) {
		case "selectCell": {
			if (state.position.col == action.col && state.position.row == action.row) {
				state.direction = state.direction == "across" ? "down" : "across";
			} else {
				state.position = { col: action.col, row: action.row };
			}
			break;
		}
		case "keyDown": {
			const cell = state.grid[state.position.row][state.position.col];
			const key = action.key;
			if (!cell.used) return;

			if (key.length === 1 && action.key.match(/[a-z]/i)) {
				cell.guess = action.key.toUpperCase();
				moveForward();
			} else if (key == " ") {
				cell.guess = undefined;
				moveForward();
			} else if (key == "Backspace") {
				if (cell.guess == undefined) {
					moveBackward();
					const newCell = state.grid[state.position.row][state.position.col];
					if (newCell.used) {
						newCell.guess = undefined;
					}
				} else {
					cell.guess = undefined;
				}
			} else if (key == "ArrowLeft") {
				if (state.direction == "across") {
					moveRelative(0, -1);
				} else {
					state.direction = "across";
				}
			} else if (key == "ArrowRight") {
				if (state.direction == "across") {
					moveRelative(0, 1);
				} else {
					state.direction = "across";
				}
			} else if (key == "ArrowUp") {
				if (state.direction == "down") {
					moveRelative(-1, 0);
				} else {
					state.direction = "down";
				}
			} else if (key == "ArrowDown") {
				if (state.direction == "down") {
					moveRelative(1, 0);
				} else {
					state.direction = "down";
				}
			}

			break;
		}
		case "loadState": {
			state.seconds = action.state.seconds;
			state.grid = action.state.grid;
			break;
		}
		case "tick": {
			state.seconds++;
			break;
		}
	}
}

export const CrosswordDispatchContext = createContext<Dispatcher>(_ => {});

export function useDispatchContext(): Dispatcher {
	return useContext(CrosswordDispatchContext);
}
