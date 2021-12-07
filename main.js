const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{
    constructor(pole){
        this._pole=pole;
        this._charakter = [0,0];
    }
    print(){
        for(let row = 0;row<this._pole.length;row+=1){
            //console.log(this._pole[row]); 
            for(let col = 0;col<this._pole[row].length;col++){
            process.stdout.write(this._pole[row][col]);               
            }
            console.log();
        }
            
    }
    checkRulles(){
        if ((this._charakter[0]<0)||(this._charakter[1]<0)||(this._charakter[0]>this._pole.length-1)||(this._charakter[1]>this._pole[this._charakter[0].length])){
            console.log("you jump out of border you lose")
            return true;
        }else if(this._pole[this._charakter[0]][this._charakter[1]]===hat){
            console.clear();
            console.log("you Win! Congratulations");
            return true;
        }else if(this._pole[this._charakter[0]][this._charakter[1]]===hole){
            console.log("you jump to the hole you lose");
            return true;
        }else{
            console.log("nice move continue")
            return false;
        }
        
    }
    update(charposX,charposY){
        
    }
    doMove(direction){
        switch (direction) {       
            case "W":
                this._charakter[0]-=1
            break;
            case "S":
                this._charakter[0]+=1        
            break;
            case "A":
                this._charakter[1]-=1  
            break;
            case "D":
                this._charakter[1]+=1
            break;
        }
        const out = this.checkRulles()
        out?null:this._pole[this._charakter[0]][this._charakter[1]]='*';
        return  out;
    }
    static generateField(width,height,percentage){
        const finish = [];
        for(let i=0;i < width;i++){
            const row =[];
            for(let j=0;j < height;j++){
               const val=Math.random();
               let icon;
               if (val<=(percentage/100)){
                   icon = hole;
               }else{
                   icon= fieldCharacter;
               }
               row.push(icon);
            }
            finish.push(row);
        }
        const x = Math.floor(Math.random()*width)
        const y = Math.floor(Math.random()*height)
        finish [x][y]=hat;
        finish [0][0]=pathCharacter;
        return finish;
    }
    regenerate(w,h,p){
        this._charakter = [0,0];
        this._pole= Field.generateField(w,h,p);
    }

}
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);


function playGame(myField){
   const battlefield=new Field(myField);
    let end = false;
  console.clear();
  while(end===false){  
    
    battlefield.print();
    console.log("possilble moves W,S,A,D");
    let vstup;
    do{
    vstup = prompt("insert your choice ").toLocaleUpperCase();
     if ((vstup !== 'W')&&(vstup != "S")&&(vstup != "A")&&(vstup != "D")) {
         console.log("wrong imput try again");
         console.log(`your choice was ${vstup}`)
     }
    }while((vstup !== 'W')&&(vstup != "S")&&(vstup != "A")&&(vstup != "D"))
    console.clear();
    console.log(`your choice was ${vstup}`);

    end = battlefield.doMove(vstup);
    if (end){
        let answer = prompt("do you want to play again in big battlefield ? Y/N: ").toUpperCase();
       if ( answer==="Y"){ 
           let w= prompt("with of battlefield: ");
           let h= prompt("height of the battlefield: ")
           let p=prompt("percentage chance of hole: ")
           battlefield.regenerate(w,h,p);
           end = false;
        }else { 

        console.log("thank for game goodbye")}
    } 
  }
}


const novepole= Field.generateField(20,20,21);

playGame(novepole);