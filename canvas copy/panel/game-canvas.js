//ex 6방식
class GameCanvas{  

    //생성자
    constructor(){    
    
        this.dom = document.querySelector(".game-canvas");

        /** @type {CanvasRenderingContext2D} */ 
         this.ctx = this.dom.getContext("2d");

        this.boy = new Boy(100,100);

        this.dom.onclick = this.clickHandler.bind(this);
}

//함수선언
    run(){
        //초당 60프레임 화면을 다시 그리는 코드
        this.update();
        this.draw();
    }

    update(){

    }

    draw(){
    this.boy.draw(this.ctx);


    }

    //이벤트 핸들러
    clickHandler(){
    this.boy.move(2);
    //화면지우기
    this.boy.draw(this.ctx);
    }
        
} 




