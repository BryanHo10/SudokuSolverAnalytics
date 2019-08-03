import random 
import math
class Cell:
    def __init__(self, x,y,w,num):
        self.x=x
        self.y=y
        self.w=w
        self.index=self.y*9+self.x
        self.num=num
        self.unSolved=True
        if(self.num != 0):
            self.unSolved=False

    def checkErrorBox(self):
        global puzzle
        xBox=math.floor(math.floor(self.index%9)/3)
        yBox=math.floor(math.floor(self.index/9)/3)
        counterBox=((yBox*3)*9)+(xBox*3)
        invalid=[]
        for i in range(0,3):
            if(puzzle[counterBox] in invalid and  puzzle[counterBox] != 0):
                return True
            invalid.append(puzzle[counterBox])
            counterBox+=1
        counterBox+=6

        for i in range(0,3):
            if(puzzle[counterBox] in invalid and  puzzle[counterBox] != 0):
                return True
            invalid.append(puzzle[counterBox])
            counterBox+=1 
        counterBox+=6

        for i in range(0,3):
            if(puzzle[counterBox] in invalid and  puzzle[counterBox] != 0):
                return True
            invalid.append(puzzle[counterBox])
            counterBox+=1
        
        
        return False

    def checkErrorRow(self):
        global puzzle
        iRow=math.floor(self.index/9)
        counter=iRow*9
        invalid=[]
        while(math.floor(counter/9)==iRow):
            if(puzzle[counter] in invalid and  puzzle[counter] != 0):
                return True
            invalid.append(puzzle[counter])
            counter+=1
        return False

    def checkErrorCol(self):
        global puzzle
        global table
        iCol=math.floor(self.index%9)
        counter=iCol
        invalid=[]
        while(counter<len(table)):
            if(puzzle[counter] in invalid and  puzzle[counter] != 0):
                return True
            invalid.append(puzzle[counter])
            counter+=9
        return False

    def checkError(self):
            if(self.checkErrorBox() or self.checkErrorCol() or self.checkErrorRow()):
                return True
            return False
        
    def increaseValue(self):
        if(self.num==9):
            return False
        else:
            self.num+=1
            return True

    def resetValue(self):
        self.num=0

table = {}
puzzle = []
inProgress = []
solutions = []
global_inc = 0

def grab_puzzle(file_num):
    global puzzle
    f = open(f'Sudoku Puzzles/sudoku({file_num}).csv', "r")
    puzzle_string = f.read().split(',')
    puzzle = [ int(val) for val in puzzle_string]
    print(puzzle)
    f.close()
    print(f"Grabbing puzzle - {file_num}.")

def grab_puzzle_solution(file_num):
    f = open(f'Sudoku Puzzles - Solutions/sudoku({file_num}).csv', "r")
    puzzle_string = f.read().split(',')
    puzzle_string = [ int(val) for val in puzzle_string]
    f.close()
    print(f"Grabbing solution to puzzle - {file_num}.")
    return puzzle_string

def set_up_grid():
    global puzzle
    global table
    global solutions
    global inProgress
    global global_inc
    print("Setting up Grid.")
    for y in range(0,9):
        for x in range(0,9):
            table[y*9+x]=Cell(x,y,0,puzzle[y*9+x])
            if(table[y*9+x].unSolved):
                inProgress.append(table[y*9+x])
    solutions.append(inProgress[global_inc])

def solve_puzzle():
    global puzzle
    global table
    global solutions
    global inProgress
    global global_inc
    isSolved = False
    while(not isSolved):
        if(len(solutions)<=len(inProgress)):
            current=solutions[len(solutions)-1]
            if(current.increaseValue()):
                for i in range(0,len(table)):
                    puzzle[i]=table[i].num
                if(not current.checkError()):
                    global_inc+=1
                    print(global_inc,extract_board(), grab_puzzle(1))
                    solutions.append(inProgress[global_inc])
            else:
                global_inc-=1
                solutions[len(solutions)-1].resetValue()
                solutions.pop()
        else:
            isSolved = True
                

def extract_board():
    global puzzle
    global table
    global solutions
    global inProgress
    global global_inc
    return [ int(cell.num) for cell in solutions]

def resetPuzzle():
    global puzzle
    global table
    global solutions
    global inProgress
    global global_inc
    solutions = []
    inProgress = []
    global_inc = 0
    set_up_grid()

def check_correction(expected,actual):
    for i in range(0,len(actual)):
        if(expected[i] != actual[i]):
            print(expected)
            print(actual)
            return False
    return True


def run_test_1():
    puzzle_index = random.randint(0, 70000) 
    print(puzzle_index)
    grab_puzzle(1)
    
    set_up_grid()
    solve_puzzle()
    expected = extract_board()
    actual = grab_puzzle_solution(puzzle_index)
    if(check_correction(expected,actual)):
        print(f"Puzzle {puzzle_index} was solved correctly.")
    else:
        print(f"Puzzle {puzzle_index} wasn't solved. ")
run_test_1()
# def run_test_5():

# def run_test_10():
# def run_test_25():
# def run_test_50():