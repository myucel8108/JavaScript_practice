//ex 6방식
class GameCanvas{  
    //생성자
    constructor(){    
    
        this.dom = document.querySelector(".game-canvas");

        /** @type {CanvasRenderingContext2D} */ 
        this.ctx = this.dom.getContext("2d");

        this.boy = new Boy(100,100);

        //게임 상태 변수
        this.gameover =false;
        //일시정지 같은기능 프레임을 끄지않고 멈추게 하는법
        this.pause =false;
        this.frame =1000/60;
        this.dom.onclick = this.clickHandler.bind(this);
}

//함수선언
    run(){
        //초당 60프레임 화면을 다시 그리는 코드
        this.update();
        this.draw();
        //set인터벌 애니메이션 프레임웍워크 셋타임아웃;
        // console.log("start");
        // window.setTimeout(this.run.bind(this),10000);
        // window.setTimeout(function(){ 
        //         this.run; //window객체
        // },1000);
        console.log("start");
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
        this.boy.update();
       
    }

    draw(){
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
        
} 




