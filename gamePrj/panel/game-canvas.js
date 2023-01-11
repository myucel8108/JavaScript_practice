import Fruit from "../item/fruit.js";
import Background from "../item/background.js";
import Bomb from "../item/bomb.js";
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
        
    }

    draw(){
        this.background.draw(this.ctx);
        for(let fruit of this.fruits){
            fruit.draw(this.ctx); //다시 움직이고
        }
    }
    pause(){
        this.pause = ture;
    }
}