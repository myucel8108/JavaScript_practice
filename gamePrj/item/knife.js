import newlec from "../newlec.js";
export default class Knife{

    constructor(knifex,knifey){  
        this.knifex = knifex;
        this.knifey = knifey;
    }
    get centerx(){
        return this.x+this.img.width/2;
    }
    get centery(){
        return this.y+this.img.height/2;
    }
    update(){
    }

    draw(ctx){
        ctx.beginPath();
        // ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillStyle = '#FFF5';
        ctx.rect(this.knifex, this.knifey, 20, 10);
        ctx.fill();
    }

}