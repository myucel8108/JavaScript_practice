//ex 6방식
import Boy from "../item/boy.js";
import Enemy from "../item/enemy.js";
import Background from "../item/background.js";

export default class GameCanvas{   //하나의 js에 많은 클래스가 있기 때문에 default가 필요하다.
    //생성자
    constructor(){    
    
        this.dom = document.querySelector(".game-canvas");
        this.dom.focus();
        /** @type {CanvasRenderingContext2D} */ 
        this.ctx = this.dom.getContext("2d");
        this.background = new Background();
        this.boy = new Boy();
        //생성자를 바로 사용하면 바로바로 생성되는것에 문제점
        this.enemies = [];
        //NaN이 뜸
        //캡슐을 깨지않는 방식 get set을 쓰자
        //게임 상태 변수
        this.boy.speed++;
        console.log(this.boy.speed);
        this.gameover =false;
        //일시정지 같은기능 프레임을 끄지않고 멈추게 하는법
        this.pause =false;
        this.frame =1000/60;
        this.dom.onclick = this.clickHandler.bind(this);
        this.dom.onkeydown=this.keyDownHandler.bind(this);
        this.dom.onkeyup = this.keyUpHandler.bind(this);
        this.enemeyAppearDelay =60;
        this.dom.enemyOutouScreen = this.enemyOutouScreenHandler.bind(this);

}


//함수선언
    run(){
        //초당 60프레임 화면을 다시 그리는 코드
        this.update();
        this.draw();
        
        //밖에서 퍼즈를 걸면 멈추게 하는법
        if(this.pause)
            return;
        
        window.setTimeout(()=>{//지역화가 필요없을때 사용가능
            this.run();

        },this.frame);
        //자기에 this가 없어서 자동으로 밖에 this를 쓰게됨

        //break하는 방법은? 
        //안에서도 끝내고 밖에서도 끝내야한다.
        
    }

    update(){
            this.background.update();
            this.boy.update();
            for(let enemy of this.enemies){
                enemy.update();
            }

            this.enemeyAppearDelay --;
            if(this.enemeyAppearDelay ==0)
            {
            let x= Math.random()*(this.dom.width) -50; //-50~this.dom.width+50;
            let y =-50;
            let enemy=new Enemy(x,y);
            this.enemeyAppearDelay = Math.floor(Math.random()*30+30);
            //enemyOutScreenHandler
            // enemy.onOutOfScreen=(en)=>{ 
            //     this.enemies.splice(this.enemies.indexOf(en),1);
            // };
            enemy.onOutOfScreen= this.enemyOutouScreenHandler.bind(this);
            this.enemies.push(enemy);
        }   




}
    draw(){

        this.background.draw(this.ctx);
        for(let enemy of this.enemies){
            enemy.draw(this.ctx);
            }
        this.boy.draw(this.ctx); //다시 움직이고

    }
    pause(){
        this.pause = ture;
    }

    //이벤트 핸들러 사용자 움직임
    //이벤트가 발생되었는지 궁금해해야한다
    clickHandler(e){
    //화면일시정지 준비
    //this.pause = true;
    //this.boy.move(2); 방향 키워드
    //좌표를 줘서 이동하는 방법
    this.boy.moveTo(e.x,e.y); //이벤트가 발생된 xy좌표
    //함수에 매개변수로 가져온다
    //화면지우기
    this.boy.draw(this.ctx);
    }

    //canvas는 키입력을 기본적으로 안받는데 받게할려면..?
    keyDownHandler(e){

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
    //멈출때 어느 방향에 대해 멈추라고 해야한다.
    keyUpHandler(e){
        // switch(e.key){
        //     default:
        //         this.boy.move(5);
        //         break;
            
        // }

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

    enemyOutouScreenHandler(en){

        this.enemies.splice(this.enemies.indexOf(en),1);
        console.log("삭제됨");

    }

}
//클래스를 정의안하고 방식  export default GameCanvas;
