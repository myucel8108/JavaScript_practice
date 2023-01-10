import Fruit from "../item/fruit.js";
import Background from "../item/background.js";
export default class GameCanvas{
    constructor(){
        this.dom = document.querySelector(".game-canvas");
        this.dom.focus();
        /** @type {CanvasRenderingContext2D} */ 
        this.ctx= this.dom.getContext("2d");
        this.fruit = new Fruit();
        this.background= new Background();
        this.gameover = false;
        this.frame = 1000/60;
        this.dom.onclick = this.clickHandler.bind(this);

    }

    //함수들
    run(){
        this.update();
        this.draw();

        if(this.pause)
            return;
        
        window.setTimeout(()=>{
            this.run();
        },this.frame);

    }
    update(){
        this.background.update();

    }

    draw(){
        this.background.draw(this.ctx);
        this.fruit.draw(this.ctx); //다시 움직이고
    }
    pause(){
        this.pause = ture;
    }

    clickHandler(e){


    }


}