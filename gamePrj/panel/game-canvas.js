import Fruit from "../item/fruit.js";
import Background from "../item/background.js";
import Knife from "../item/knife.js";
export default class GameCanvas{
    constructor(){
        this.dom = document.querySelector(".game-canvas");
        this.dom.focus();
        /** @type {CanvasRenderingContext2D} */ 
        this.ctx= this.dom.getContext("2d");
        this.fruits = [];
        this.background= new Background();
        this.gameover = false;
        this.frame = 1000/60;
        this.fruitsAppearDelay=60;
        this.dom.onmousedown = this.MouseDownHandler.bind(this);
        this.dom.onmouseup= this.MouseUpHandler.bind(this);
        this.dom.onmousemove = this.MouseMoveHandler.bind(this);
        this.knifes =[];
        this.knifex=0;
        this.knifey =0;
        this.slicingFruit =false;
    }

    //함수들
    run(){
        this.update();
        this.draw();
        window.setTimeout(()=>{
            this.run();
        },10);

    }
    update(){
        this.background.update();
        for(let fruit of this.fruits){
            fruit.update(); //다시 움직이고
        }

            for(let knife of this.knifes){
                knife.update();
            }
            
        this.fruitsAppearDelay--;
        if(this.fruitsAppearDelay == 0){
            let number= Math.floor(Math.random()*6);
            for(let many=0; many<number; many++){
                let randfruit = Math.floor(Math.random()*5);
                let fruit = new Fruit(randfruit);
                this.fruits.push(fruit);
            }
            this.fruitsAppearDelay = Math.floor(Math.random()*30+20);
        }

        if(this.slicingFruit){
            let knife = new Knife(this.knifex,this.knifey);
            this.knifes.push(knife);
            if(this.knifes.length==30){
                this.knifes.shift();
            }
        }
        else{
            this.knifes.shift();
        }
   
        
    }

    draw(){
        this.background.draw(this.ctx);
        for(let fruit of this.fruits){
            fruit.draw(this.ctx); //다시 움직이고
        }
        if(this.slicingFruit){
        for(let knife of this.knifes){
            knife.draw(this.ctx);
        }
        
    }
}
    pause(){
        this.pause = ture;
    }

    MouseDownHandler(e){
        this.slicingFruit =true;
    };


    MouseUpHandler(e){
        this.slicingFruit= false;

    }
    
    MouseMoveHandler(e){
        this.knifex=e.x;
        this.knifey=e.y;

    }
    
}