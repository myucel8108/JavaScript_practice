import newlec from "../newlec.js";
export default class Boy{

    //인덱스
    //#속성명이 private가 된다.
    #speed;

    constructor(x,y){
    //캐릭터 사진
    this.ix=1;
    this.iy=2;
     //이미지 너비 길이
    this.sw =106;
    this.sh =148.25;
    //잘라낼 가로위치 세로위치
    this.sx =this.sw*this.ix;
    this.sy = this.sh*this.iy;
    //캐릭터가 처음에 있는위치
    this.x=x ||100;
    this.y=y ||100;
    //------------ 캐릭터의 벡터
    this.vx=0;
    this.vy=0;

    //캐릭터의 목적지
    this.dx=0;
    this.dy =0;
    //이미지 가져오기
    this.img =document.querySelector("#boy");
    //걷는거 딜레이
    this.walkDe=10;

    this.moveLeft=false;
    this.moveRight=false;
    this.moveUp=false;
    this.moveDown=false;
    this.#speed = 3;




    
};
    get centerx(){
        return this.x+this.img.width/2;
    }
    get centery(){
        return this.y+this.img.height/2;
    }
    set speed(value){ //set get 사용법
        this.#speed =value;
    }
    get speed(){
        return this.#speed;
    }
        //초당 60번의 영사기같은 게임프레임
        draw(ctx){
            this.sx=this.sw*this.ix;
            this.sy=this.sh*this.iy;
            ctx.drawImage(this.img,
                this.sx,this.sy,this.sw,this.sh, this.x-this.sw/2 ,this.y-this.sh+15,this.sw,this.sh);
            // ctx.strokeRect();
            // ctx.fillRect();
            
        };
        update(){
            //충돌판단
            for(let enemy of newlec.enemies){
                let ex= enemy.centerx;
                let ey= enemy.centery;
                let x= this.x;
                let y =this.y;
                let ew = enemy.width;
                let eh =enemy.height;
                let d = Math.sqrt(((ex-x)**2)+((ey-y)**2));
                let r1r2 = 
            
                Math.sqrt((ew)**2+(eh)**2)
                +Math.sqrt((this.sw/2)**2+(this.sh/2)**2);
                if(d<=r1r2){//멍청이
                    newlec.enemies.splice(newlec.enemies.indexOf(enemy),1);
                }
            }
            //키보드 이동 -> 4방향의 변수를 달라지게 해야함
            if(this.moveUp){
                this.y-=this.#speed;
                this.iy=0;
            }
            if(this.moveDown){
                this.y+=this.#speed;
                this.iy=2;
            }
            if(this.moveRight){                     
                this.x+=this.#speed;
                this.iy=1;
            }
            if(this.moveLeft){
                this.x-=this.#speed;
                this.iy=3;
            }
            //벡터가 0이면 반환하기
            if(!(this.moveLeft||this.moveRight||this.moveUp||this.moveDown||false))
            if(this.vx == 0 && this.vy ==0){
                this.ix = 1;
                this.iy= 2;
                return;
            }

            this.walkDe--;
            if(this.walkDe ==0)
            {
                this.ix = (this.ix ==0)? 2:0;
                this.walkDe = 10;    
            }
            
            //누군가가 vx와vy의 값을 바꿔주면 바뀔 것이다.
            //멈추게할려면 벡터를 어느순간 0으로 바꿔줘야한다
            //같은 변수를 가운데로 넣으면 보기 편하다!
            if((this.dx-this.x>-1)&&
            (this.dx-this.x<1)&&
            (this.dy-this.y<1||
            this.dy-this.y>-1)){
                this.vx=0;
                this.vy=0;
                this.ix=1;
            }
            this.x += this.vx;           
            this.y += this.vy;
        }

        //사용자가 따라 달라지는 스레드
        moveTo(dx,dy){
            //밑에 방식이 순간이동 방식
            //this.x =x;
            //this.y = y;
            this.dx =dx;
            this.dy =dy;
            let w =dx-this.x;
            let h =dy-this.y;
            let d= Math.sqrt(w*w+h*h);
            this.vx =w/d;
            this.vy =h/d;
        }

        move(dir){
            switch(dir){
                case 1://북쪽
                this.moveUp =true;

                break;
                case 3: //남쪽
                this.moveDown =true;
                break;
                case 2: // 동쪽    
                this.moveRight =true;
                break;
                case 4: //서쪽
                this.moveLeft =true;
            
                break;
                }
        };
        stop(dir){

            switch(dir){
                case 1://북쪽
                this.moveUp =false;

                break;

                case 3: //남쪽
                this.moveDown =false;
                break;

                case 2: // 동쪽    
                this.moveRight =false;
                break;

                case 4: //서쪽
                this.moveLeft =false;

                break;
                }
        };

};

            // var img = new Image();
            // img.src = "./image/boy.png";
            // img.onload = function(){    
            //     //이미지를 편집하거나 수학을써보자         
            //     //밖에 있는 this로 바꿔달라하자-> boy객체
            // }.bind(this);