/** @format */

export type UsedCellData = { used: true; num?: number; guess?: string; answer: string };
export type UnusedCellData = { used: false };

export type CellData = UsedCellData | UnusedCellData;
export type GridData = CellData[][];

export type Direction = "across" | "down";

export type Clue = { clue: string; answer: string; row: number; col: number };
export type RuntimeClue = Clue & { num: number };

export type PuzzleInput = Record<Direction, Record<number, Clue>>;

// These two arrays will be sorted by num so that we can display the two columns easily
export type Clues = { across: RuntimeClue[]; down: RuntimeClue[] };

export type Pos = { row: number; col: number };

export type GameState = {
	rows: number;
	cols: number;
	grid: GridData;
	clues: Clues;

	focused: boolean;
	selectedPosition: Pos;
	selectedDirection: Direction;
};
