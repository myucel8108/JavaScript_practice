function GameCanvas(){  
    //생성자 어떤 객체를 초기화하는 역할
    //this를 초기화 해준것임
    this.dom = document.querySelector(".game-canvas");

     /** @type {CanvasRenderingContext2D} */ 
    this.ctx = this.dom.getContext("2d");

    this.boy = new Boy(100,100);

    this.dom.onclick = this.clickHandler.bind(this);   
    
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

