const fs = require('fs'); 

var table=[];
var puzzle=[];
var inProgress=[];
var solutions=[];
var global=0;

function Cell(x,y,num){
    this.x=x;
    this.y=y;
    this.index=this.y*9+this.x;
    this.num=num;
    this.unSolved=true;
    if(this.num!=0)
        this.unSolved=false;   

    this.checkError=function(){
        if(this.checkErrorBox()||this.checkErrorCol()||this.checkErrorRow()){

            return true;
        }
        return false;
    }
    this.checkErrorBox=function(){
        var xBox=Math.floor(Math.floor(this.index%9)/3);          //0, 1, 2 Col
        var yBox=Math.floor(Math.floor(this.index/9)/3);          //0, 1, 2 Row
        var counterBox=((yBox*3)*9)+(xBox*3);
        var invalid=[];
        for(var i=0;i<3;i++){
            
            if(invalid.includes(puzzle[counterBox])&& puzzle[counterBox] !=0){
                
                return true;
            }
            invalid.push(puzzle[counterBox]);
            counterBox++;
        }
        counterBox+=6;
        for(var i=0;i<3;i++){
            if(invalid.includes(puzzle[counterBox])&& puzzle[counterBox] !=0){
                return true;
            }
            invalid.push(puzzle[counterBox]);
            counterBox++; 
        }
        counterBox+=6;
        for(var i=0;i<3;i++){
            if(invalid.includes(puzzle[counterBox])&& puzzle[counterBox] !=0){
                return true;
            }
            invalid.push(puzzle[counterBox]);
            counterBox++;
        }
        
        
        return false;
    }
    
    this.checkErrorRow=function(){
        var iRow=Math.floor(this.index/9);
        var counter=iRow*9;
        var invalid=[];
        while(Math.floor(counter/9)==iRow){
            if(invalid.includes(puzzle[counter])&& puzzle[counter] !=0){
                return true;
            }
            invalid.push(puzzle[counter]);
            counter++;
        }
        return false;
    }
    
    this.checkErrorCol=function(){
        var iCol=Math.floor(this.index%9);
        var counter=iCol;
        var invalid=[];
        while(counter<=table.length){
            if(invalid.includes(puzzle[counter])&& puzzle[counter] !=0){
                return true;
            }
            invalid.push(puzzle[counter]);
            counter+=9;
        }
        return false;
        
    }
        
    this.increaseValue=function(){
        if(this.num==9){
            return false;
        }else{
        this.num++;
        return true;
        }
    }
    this.resetValue=function(){
        this.num=0;
    }
}



function setupBoard(){
    for(var y=0;y<9;y++){
        for(var x=0;x<9;x++){
            table[y*9+x]=new Cell(x,y,puzzle[y*9+x]);
            if(table[y*9+x].unSolved){
                inProgress.push(table[y*9+x]);
            }
        }
    }
    solutions.push(inProgress[global]);
}

function solvePuzzle(){
    var isSolved = false;
    do{
        if(solutions.length<=inProgress.length){
            var current=solutions[solutions.length-1];
            if(current.increaseValue()){
                for(var i=0;i<table.length;i++){
                    puzzle[i]=table[i].num;
                }
                if(!current.checkError()){
                    global++;
                    solutions.push(inProgress[global]);
                }
            }
            else{
                global--;
                solutions[solutions.length-1].resetValue();
                solutions.pop();
            }
        }
        else{
            isSolved = true;
        }
    }while(!isSolved)
    
}

function resetSwitch(){
    solutions=[];
    inProgress=[];
    global=0; 
}

function retrieveIndexedPuzzle(file_num)
{
    fs.readFileSync(`../Sudoku Puzzles/sudoku(${file_num}).csv`, (err, data) => { 
        if (err) throw err; 
      
        puzzle = (data.toString().split(',').map((x)=>{
            return parseInt(x);
        })); 
    }); 
}
function retrievePuzzleFromFile(file_name)
{
    let dataString = fs.readFileSync(`./${file_name}`); 
    puzzle = (dataString.toString().split(',').map((x)=>{
        return parseInt(x);
    })); 
}
function extractBoard(){
    let board=[];
    let count = 0;
    for(var index=0;index<puzzle.length;index++){
        if(puzzle[index] == 0){
            board.push((solutions[count].num));
            count+=1;
        }
        else{
            board.push((puzzle[index]));
        }
    }
    return board;
}
function checkCorrection(expected,actual){
    for(let index=0;index<actual.length;index++){
        if(expected[i] != actual[i]){
            console.log(expected);
            console.log(actual);
            return false;
        }
    }
    return true;
}
    

function runTest(filename){
    let start;
    if(typeof filename !== "undefined"){
        start = Date.now();
        retrievePuzzleFromFile(filename);
    }
    else{
        var puzzleIndex = Math.floor(Math.random()*70000);
        retrieveIndexedPuzzle(puzzleIndex);
    }
    setupBoard();
    solvePuzzle();
    let delta = Date.now() - start;
    console.log(delta/1000);
    resetSwitch();
    // let actual = grab_puzzle_solution(puzzle_index)
    // if(check_correction(expected,actual)):
    //     print(f"Puzzle {puzzle_index} was solved correctly.")
    //     print(actual)
    // else:
    //     print(f"Puzzle {puzzle_index} wasn't solved. ")
}
for(let i=0;i<10;i++){
    runTest('sudokuTest.csv');
}


