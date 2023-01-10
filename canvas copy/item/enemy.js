export default class Enemy{
//가운데 상단에 뜨게할려면?
constructor(x=0,y=0){

    this.img =document.querySelector("#enemy");
    this.x=x;
    this.y=y;
    this.speed =5;
    this.onOutOfScreen =null; //이벤트 변수
    };

    draw(ctx){           
        ctx.drawImage(this.img,this.x,this.y);

};

    update(){
        this.y+=this.speed;
        if(this.y > 500  && this.onOutOfScreen != null) 
            this.onOutOfScreen(this); //callback하기
        };

}