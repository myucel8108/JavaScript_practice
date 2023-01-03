function GameCanvas(){  
    //생성자 어떤 객체를 초기화하는 역할
    //this를 초기화 해준것임
    this.dom = document.querySelector(".game-canvas");

     /** @type {CanvasRenderingContext2D} */ 
    this.ctx = this.dom.getContext("2d");

    this.boy = new Boy(100,100);

    this.dom.onclick = this.clickHandler.bind(this);
    //bind(this)안넣으면? 함수가 다른놈을 호출하는 함수가 된다.
    //델리데이션 함수->콜백함수
    //canvas는 사용자의 클릭을 기다리는데
    //일반적인함수는 내가만든로직에서 내가호출하는데
    //콜백함수는 나중에 실행해줘 느낌
    //그래서 위임하면서 나중에 실행
    //문제는 콜백의 주체를 찾아주기 위해서
    //this를 없애면 돔자체를 호출해준다
    //자기호출할때 this
    
} 

GameCanvas.prototype={
     run:function(){
            //초당 60프레임 화면을 다시 그리는 코드
            this.update();
            this.draw();
     },

     update:function(){

     },

     draw:function(){
        this.boy.draw(this.ctx);


     },

     //이벤트 핸들러
    clickHandler:function(){
        this.boy.move(2);
        //화면지우기
        this.boy.draw(this.ctx);
     }

}

