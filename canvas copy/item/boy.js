class Boy{
    //인덱스
    constructor(x,y){
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

};
        //초당 60번의 영사기같은 게임프레임
        draw(ctx){
            this.sx=this.sw*this.ix;
            this.sy=this.sh*this.iy;
            ctx.drawImage(this.img,
                this.sx,this.sy,this.sw,this.sh, this.x-this.sw/2 ,this.y-this.sh+15,this.sw,this.sh);
        };
        update(){
            //딜레이를 걸어주는 방식
            if(this.vx!=0){
            this.walkDe--;
            if(this.walkDe==0){
                //가만히 있을때를 제외하고 움직이게 해야한다면?
                this.ix=(this.ix==1)?1:this.ix==2?0:2 ;
                // this.ix = this.ix == 2? 0 :2;
                this.walkDe=9;
            }
        }
            if(this.vx==0 && this.vy==0){
                return;
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
            this.ix=2;
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
                case 38://북쪽
                this.y-=5;
                break;
                case 39: // 동쪽
                this.x+=5;
                break;            
                case 40:             
                //남쪽
                this.y+=5;
                break;
                case 37: //서쪽
                this.x-=5;
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