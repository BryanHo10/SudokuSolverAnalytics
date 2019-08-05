module.exports =  class Cell{
    constructor(x,y,w,num){
        this.x=x;
        this.y=y;
        this.w=w;
        this.index=this.y*9+this.x;
        this.num=num;
        this.unSolved=true;
        if(this.num!=0)
            this.unSolved=false;
    }
   
    checkError(){
        if(this.checkErrorBox()||this.checkErrorCol()||this.checkErrorRow()){
            return true;
        }
        return false;
    }
    checkErrorBox(){
        var xBox=floor(floor(this.index%9)/3);          //0, 1, 2 Col
        var yBox=floor(floor(this.index/9)/3);          //0, 1, 2 Row
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

    checkErrorRow(){
        var iRow=floor(this.index/9);
        var counter=iRow*9;
        var invalid=[];
        while(floor(counter/9)==iRow){
            if(invalid.includes(puzzle[counter])&& puzzle[counter] !=0){
                return true;
            }
            invalid.push(puzzle[counter]);
            counter++;
        }
        return false;
    }

    checkErrorCol(){
        var iCol=floor(this.index%9);
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
        
    increaseValue(){
        if(this.num==9){
            return false;
        }else{
        this.num++;
        return true;
        }
    }

    resetValue(){
        this.num=0;
    }
}
