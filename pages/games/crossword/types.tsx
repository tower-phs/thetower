/** @format */

type UsedCellData = { used: true; num?: number; guess?: string; answer: string };
type UnusedCellData = { used: false };

type CellData = UsedCellData | UnusedCellData;
type GridData = CellData[][];

type Direction = "across" | "down";

type Clue = { clue: string; answer: string; row: number; col: number };
type RuntimeClue = Clue & { num: number };

type PuzzleInput = Record<Direction, Record<number, Clue>>;

// These two arrays will be sorted by num so that we can display the two columns easily
type Clues = { across: RuntimeClue[]; down: RuntimeClue[] };

type Pos = { row: number; col: number };

type GameState = {
	rows: number;
	cols: number;
	grid: GridData;
	clues: Clues;

	focused: boolean;
	selectedPosition: Pos;
	selectedDirection: Direction;
};
