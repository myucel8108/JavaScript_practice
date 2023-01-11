export default class Enemy{
//가운데 상단에 뜨게할려면?
#centerx;
#centery;
#width;
#height;
constructor(x=0,y=0){

    this.img =document.querySelector("#enemy");
    this.eximg = document.querySelector("#explo");
    this.x=x;
    this.y=y;
    this.speed =5;
    this.onOutOfScreen =null; //이벤트 변수
    this.#centerx;
    this.#centery;
    this.#width;
    this.#height;
    //폭파(ex)에 관한 index
    this.eix=0;
    this.eiy=0;
    //이미지의 넓이
    this.esw =this.eximg.width/4;
    this.esh =this.eximg.height/5;

    };
    get width(){
        return this.img.width/2;
    }
    get height(){
        return this.img.height/2;
    }
    draw(ctx){     
        this.esx =this.esw*this.eix;
        this.esy = this.esh*this.eiy;      
        ctx.drawImage(this.img,this.x-this.img.width,this.y-this.img.height);
        ctx.drawImage(this.eximg,
            this.esx,this.esy,this.esw,this.esh, this.x-this.esw/2-this.img.width/2 ,this.y-this.esh/2-this.img.height/2,this.esw,this.esh);
};

    update(){
        this.y+=this.speed;
        if(this.y > 500  && this.onOutOfScreen != null) 
            this.onOutOfScreen(this); //callback하기
        };

}