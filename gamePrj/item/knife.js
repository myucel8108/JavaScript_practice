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
        this.knifex=knifex;
        this.knifex=knifex;
        this.count =10;
    }
    get centerx(){
        return this.x+this.img.width/2;
    }
    get centery(){
        return this.y+this.img.height/2;
    }
    update(){
        for(let fruit of newlec.fruits){
            let ex= fruit.centerx;
            let ey= fruit.centery;
            let x= this.knifex;
            let y =this.knifey;
            let ew = fruit.width;
            let eh =fruit.height;
            let d = Math.sqrt(((ex-x)**2)+((ey-y)**2));
            let r1r2 = 
            Math.sqrt((ew)**2+(eh)**2)
            +Math.sqrt((this.sw/2)**2+(this.sh/2)**2);
            if(d<=r1r2){
                newlec.fruits.splice(newlec.fruits.indexOf(fruit),1);
            }
        }

    }

    draw(ctx){
        this.sx=this.img.width/120;
        this.count++;
        this.sw =this.img.width/this.count;
        if(this.count==60){
            this.count=2;
        }
        console.log(this.sw);
        ctx.drawImage(this.img,
            this.sx,this.sy,this.sw,this.sh, this.knifex-29,this.knifey,this.sw,this.sh);
        

    }



}