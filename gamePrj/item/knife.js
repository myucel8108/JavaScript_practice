export default class Knife{
    constructor(knifex,knifey){  
        this.img = document.querySelector("#knife");
        this.knifex = knifex;
        this.knifey = knifey;

    }
    update(){


    }

    draw(ctx){
    
        ctx.drawImage(this.img,this.knifex,this.knifey);
        

    }



}