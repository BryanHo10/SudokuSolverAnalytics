using System;
using System.Collections.Generic;
using System.IO;

namespace SudokuSolver
{
    public static class Globals
    {
        public static List<int> puzzle = new List<int>();
        public static int tableLength = 0;
        public static int global = 0;

    }
    class Cell
    {
        public int x, y, index, num;
        public bool unSolved;
        public List<int> invalid;
        public Cell(int x, int y, int num)
        {
            this.invalid = new List<int>();
            this.x = x;
            this.y = y;
            this.index = this.y * 9 + this.x;
            this.num = num;
            this.unSolved = true;
            if (this.num != 0)
                this.unSolved = false;
        }
        
        public bool checkError()
        {
            if (this.checkErrorBox() || this.checkErrorCol() || this.checkErrorRow())
            {
                return true;
            }
            return false;
        }
        public bool checkErrorBox()
        {
            int xBox = (int)Math.Floor(Math.Floor((double)index % 9) / (double)3);          //0, 1, 2 Col
            int yBox = (int)Math.Floor(Math.Floor((double)index / 9) / 3);          //0, 1, 2 Row
            var counterBox = ((yBox * 3) * 9) + (xBox * 3);
            invalid.Clear();
            for (var i = 0; i < 3; i++)
            {

                if (invalid.Contains(Globals.puzzle[counterBox]) && Globals.puzzle[counterBox] != 0)
                {

                    return true;
                }
                invalid.Add(Globals.puzzle[counterBox]);
                counterBox++;
            }
            counterBox += 6;
            for (var i = 0; i < 3; i++)
            {
                if (invalid.Contains(Globals.puzzle[counterBox]) && Globals.puzzle[counterBox] != 0)
                {
                    return true;
                }
                invalid.Add(Globals.puzzle[counterBox]);
                counterBox++;
            }
            counterBox += 6;
            for (var i = 0; i < 3; i++)
            {
                if (invalid.Contains(Globals.puzzle[counterBox]) && Globals.puzzle[counterBox] != 0)
                {
                    return true;
                }
                invalid.Add(Globals.puzzle[counterBox]);
                counterBox++;
            }


            return false;
        }

        public bool checkErrorRow()
        {
            int iRow = (int)Math.Floor((double)this.index / 9);
            int counter = iRow * 9;
            invalid.Clear();
            while ((int)Math.Floor((double)counter / 9) == iRow)
            {
                if (invalid.Contains(Globals.puzzle[counter]) && Globals.puzzle[counter] != 0)
                {
                    return true;
                }
                invalid.Add(Globals.puzzle[counter]);
                counter++;
            }
            return false;
        }

        public bool checkErrorCol()
        {
            int iCol = index % 9;
            var counter = iCol;
            invalid.Clear();
            while (counter <= Globals.table.Count)
            {
                if (invalid.Contains(Globals.puzzle[counter]) && Globals.puzzle[counter] != 0)
                {
                    return true;
                }
                invalid.Add(Globals.puzzle[counter]);
                counter += 9;
            }
            return false;

        }

        public bool increaseValue()
        {
            if (this.num == 9)
            {
                return false;
            }
            else
            {
                this.num++;
                return true;
            }
        }
        public void resetValue()
        {
            this.num = 0;
        }
    }
    class Solve
    {
        public List<Cell> table = new List<Cell>();
        public List<Cell> inProgress = new List<Cell>();
        public List<Cell> solutions = new List<Cell>();
        public void setUpBoard()
        {
            for (var y = 0; y < 9; y++)
            {
                for (var x = 0; x < 9; x++)
                {
                    table[y * 9 + x] = new Cell(x, y, Globals.puzzle[y * 9 + x]);
                    if (table[y * 9 + x].unSolved)
                    {
                        inProgress.Add(table[y * 9 + x]);
                    }
                }
            }
            solutions.Add(inProgress[Globals.global]);
        }
        public void solvePuzzle()
        {
            var isSolved = false;
            do
            {
                if (solutions.Count <= inProgress.Count)
                {
                    var current = solutions[solutions.Count - 1];
                    if (current.increaseValue())
                    {
                        for (var i = 0; i < table.Count; i++)
                        {
                            Globals.puzzle[i] = table[i].num;
                        }
                        if (!current.checkError())
                        {
                            Globals.global++;
                            solutions.Add(inProgress[Globals.global]);
                        }
                    }
                    else
                    {
                        Globals.global--;
                        solutions[solutions.Count - 1].resetValue();
                        solutions.RemoveAt(solutions.Count - 1);
                    }
                }
                else
                {
                    isSolved = true;
                }
            } while (!isSolved);


        }
        public void resetSwitch()
        {
            solutions.Clear();
            inProgress.Clear();
            Globals.global = 0;
            for (var y = 0; y < 9; y++)
            {
                for (var x = 0; x < 9; x++)
                {
                    table[y * 9 + x] = new Cell(x, y, Globals.puzzle[y * 9 + x]);
                    if (table[y * 9 + x].unSolved)
                    {
                        inProgress.Add(table[y * 9 + x]);
                    }
                }
            }
            solutions.Add(inProgress[Globals.global]);
        }
        public void retrieveIndexedPuzzle(int file_num)
        {
            string dataString = File.ReadAllText($@"../ Sudoku Puzzles / sudoku({file_num}).csv");
            string[] puzzleString = dataString.Split(",");
            List<int> puzzleParsed = new List<int>();
            foreach (string val in puzzleString)
            {
                puzzleParsed.Add(Int32.Parse(val));
            }
            Globals.puzzle = puzzleParsed;
        }
        public void retrievePuzzleFromFile(string file_name)
        {
            string dataString = File.ReadAllText(file_name);
            string[] puzzleString = dataString.Split(",");
            List<int> puzzleParsed = new List<int>();
            foreach(string val in puzzleString)
            {
                puzzleParsed.Add(Int32.Parse(val));
            }
            Globals.puzzle = puzzleParsed;

        }
        public List<int> extractBoard()
        {
            List<int> board = new List<int>();
            int count = 0;
            for (int index = 0; index < Globals.puzzle.Count; index++)
            {
                if (Globals.puzzle[index] == 0)
                {
                    board.Add(solutions[count].num);
                    count += 1;
                }
                else
                {
                    board.Add((Globals.puzzle[index]));
                }
            }
            return board;
        }

        static void Main(string[] args)
        {
            retrievePuzzleFromFile("sudokuTest.csv");
        }
    }
}
