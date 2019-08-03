import csv
import os

#Methods
def split_puzzle_string(puzzle):
    return list(puzzle)


#Create Directory of Puzzles/Solutions
puzzleDirName = 'Sudoku Puzzles'
if not os.path.exists(puzzleDirName):
    os.mkdir(puzzleDirName)
    print("Directory " , puzzleDirName ,  " Created ")
else:    
    print("Directory " , puzzleDirName ,  " already exists")
    
solutionDirName = 'Sudoku Puzzles - Solutions'
if not os.path.exists(solutionDirName):
    os.mkdir(solutionDirName)
    print("Directory " , solutionDirName ,  " Created ")
else:    
    print("Directory " , solutionDirName ,  " already exists")


with open('sudoku.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    count = 1
    for row in reader:
        f = open(f'{puzzleDirName}/sudoku({count}).csv', "w")
        separatorChar = ','
        f.write(separatorChar.join(split_puzzle_string(row['quizzes'])))
        f.close()
        print("File " , f'{puzzleDirName}/sudoku({count}).csv' ,  " Created ")

        f = open(f'{solutionDirName}/sudoku({count}).csv', "w")
        separatorChar = ','
        f.write(separatorChar.join(split_puzzle_string(row['solutions'])))
        f.close()
        print("File " , f'{solutionDirName}/sudoku({count}).csv' ,  " Created ")
        count+=1