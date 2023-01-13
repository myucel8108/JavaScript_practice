import newlec from "../newlec.js";
export default class Knife{

    constructor(knifex,knifey){  
        this.img = document.querySelector("#knife");
        this.knifex = knifex;
        this.knifey = knifey;
        //이미지 너비 길이
        this.sh =this.img.height;
        //잘라낼 가로위치 세로위치
        this.sx =0;
        this.sy = 0;
        //캐릭터가 처음에 있는위치
        this.count =10;
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
        this.sx=this.img.width/120;
        this.count++;
        this.sw =this.img.width/this.count;
        if(this.count==60){
            this.count=2;
        }
        ctx.drawImage(this.img,
            this.sx,this.sy,this.sw,this.sh, this.knifex-29,this.knifey,this.sw,this.sh);
        

    }



}