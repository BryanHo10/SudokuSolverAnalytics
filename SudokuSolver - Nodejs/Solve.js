var {Cell} = require('./Cell');
const fs = require('fs'); 

var table=[];
var puzzle=[];
var inProgress=[];
var solutions=[];
var global=0;



function setupBoard(){
    for(var y=0;y<9;y++){
        for(var x=0;x<9;x++){
            table[y*9+x]=new Cell(x,y,w,puzzle[y*9+x]);
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

function resetSwitch(r){
    solutions=[];
    inProgress=[];
    global=0;
    for(var y=0;y<9;y++){
        for(var x=0;x<9;x++){
            table[y*9+x]=new Cell(x,y,w,puzzle[y*9+x]);
            if(table[y*9+x].unSolved){
                inProgress.push(table[y*9+x]);
            }
        }
    }
    solutions.push(inProgress[global]);
  
}

function retrieveIndexedPuzzle(file_num)
{
    fs.readFile(`../Sudoku Puzzles/sudoku(${file_num}).csv`, (err, data) => { 
        if (err) throw err; 
      
        console.log(data.toString()); 
    }); 
}
function retrievePuzzleFromFile(file_name)
{
    fs.readFile(`../file_name`, (err, puzzle) => { 
        if (err) throw err; 
        console.log(puzzle.toString()); 
    }); 
}

function runTest(){
    var puzzleIndex = Math.floor(Math.random()*70000);

}