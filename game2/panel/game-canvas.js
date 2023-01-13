import Boy from '../item/boy.js';
import Background from '../item/background.js';
import Enemy from '../item/enemy.js';
import newlec from '../newlec.js';
import ConfirmDlg from '../item/ConfirmDlg.js';

export default class GameCanvas{
    constructor(){
        this.dom = document.querySelector(".game-canvas");   
        this.dom.focus();
        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.dom.getContext("2d");
        this.boy = new Boy(100,100);
        this.boy.onNoLife=this.boyNoLifeHandler.bind(this);
        this.enemies = [];
        this.enemyAppearDelay = 60;
        this.bg = new Background();

        this.dlg = new ConfirmDlg();
        this.dlg.onclick = ()=>{
            console.log("clicked");
        };
        this.dlg.show();

        newlec.enemies = this.enemies;

        // 게임 상태변수
        this.gameover = false;
        this.pause = false;
    
        this.dom.onclick = this.clickHandler.bind(this);
        this.dom.onkeydown = this.keyDownHandler.bind(this);
        this.dom.onkeyup = this.keyUpHandler.bind(this);
    }
    run(){
        if(this.pause)
            return;

        // 60프레임으로 화면을 다시 그리는 코드        
        this.update();
        this.draw();      
        
        //console.log("timer start");
        //window.setTimeout(this.run.bind(this), 1000)
        // window.setTimeout(function(){
        //     this.run();
        // }, 1000);      

        window.setTimeout(()=>{
            this.run();
        }, 17);
    }    
    update(){
        this.boy.update();
        for(let enemy of this.enemies)
            enemy.update();

        this.dlg.update();
        
        this.enemyAppearDelay--;
        if(this.enemyAppearDelay == 0)
        {
            let max = this.dom.width+50;
            let min = -50;
            let x = Math.floor(Math.random() * (max - min)) + min; // -50~this.dom.width+50
            let y = -50;
            let enemy = new Enemy(x, y);
            // enemyOutOfScreenHandler
            enemy.onOutOfScreen=this.enemyOutOfScreenHandler.bind(this);/*(en)=>{
                let idx = this.enemies.indexOf(en);
                this.enemies.splice(idx, 1);
            };*/
            this.enemies.push(enemy);
            this.enemyAppearDelay = Math.floor(Math.random() * (60 - 30)) + 30;
        }
        //this.boy.move(2); // 상태가 바뀌고
    }
    draw(){
        this.bg.draw(this.ctx);
        this.boy.draw(this.ctx); // 다시 그리고
        for(let enemy of this.enemies)
            enemy.draw(this.ctx);
        
        this.dlg.draw(this.ctx);
    }
    pause(){
        this.pause = true;
    }

    // --- 아이템 이벤트 핸들러---------------------------

    boyNoLifeHandler(){
        // 게임 종료를 의미하는 애니메이션을 실행하거나 
        // 게임 종료 또는 계속을 위한 입력을 받거나
        // 바로 캔버스를 전환하가나..
        // 기타 등등...


    }

    enemyOutOfScreenHandler(en){
        let idx = this.enemies.indexOf(en);
        this.enemies.splice(idx, 1);
    }
    // --- 사용자 입력 event handlers -----------------
    clickHandler(e){
        //this.pause = true;

        // this.boy.notifyClick(e.x, e.y);
        // for(let enemy of this.enemies){
        //     enemy.notifyClick(e.x, e.y);
        // }
        this.dlg.notifyClick(e.x, e.y);

        //this.boy.move(2);
        this.boy.moveTo(e.x, e.y);
        // 화면 지우기
        //this.boy.draw(this.ctx);        
    }

    keyDownHandler(e){
        console.log(e.key);
        switch(e.key){
            case "ArrowUp":
                this.boy.move(1);
                break;
            case "ArrowLeft":
                this.boy.move(4);
                break;
            case "ArrowRight":
                this.boy.move(2);
                break;
            case "ArrowDown":
                this.boy.move(3);
                break;
        } 
    }

    keyUpHandler(e){
        switch(e.key){
            case "ArrowUp":                
                this.boy.stop(1);
                break;
            case "ArrowLeft":
                this.boy.stop(4);
                break;
            case "ArrowRight":
                this.boy.stop(2);
                break;
            case "ArrowDown":
                this.boy.stop(3);
                break;
        }
    }


}


//export default GameCanvas;