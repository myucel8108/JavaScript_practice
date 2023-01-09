export default class Enemy{
//가운데 상단에 뜨게할려면?
constructor(){

    this.img =document.querySelector("#enemy");
    this.x=500;
    this.y=0;

    };

    draw(ctx){           
        ctx.drawImage(this.img,this.x,this.y);

};

    update(){


    }






}