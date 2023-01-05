class Boy{
    //인덱스
    constructor(x,y){
    this.ix=1;
    this.iy=2;
     //이미지 너비 길이
    this.sw =106;
    this.sh =148.25;
    //잘라낼 가로위치 세로위치
    this.sx = this.sw*this.ix;
    this.sy=this.sh*this.iy;
    //캐릭터가 있는위치
    this.x=x ||0;
    this.y=y ||0;
    //------------ 캐릭터의 벡터
    this.vx=0;
    this.vy=0;

    //캐릭터의 목적지
    this.dx=0;
    this.dy =0;

};
        draw(ctx){
            var img = new Image();
            img.src = "./image/boy.png";
            
            img.onload = function(){             
                ctx.drawImage(img,
                    this.sx,this.sy,this.sw,this.sh 
                    , this.x ,this.y,this.sw,this.sh);
                    //밖에 있는 this로 바꿔달라하자-> boy객체
            }.bind(this);
        };
        update(){
            //누군가가 vx와vy의 값을 바꿔주면 바뀔 것이다.
            this.x += this.vx;           
            this.y += this.vy;

        }
        moveTo(dx,dy){
            //밑에 방식이 순간이동 방식
            //this.x =x;
            //this.y = y;
            let w =dx-this.x;
            let h =dy-this.y;

            let d= Math.sqrt(w*w+h*h);
            this.vx =w/d;
            this.vy =h/d;

        }

        move(dir){
            switch(dir){
                case 1://북쪽
                this.y-=1;
                break;
                case 2: // 동쪽
                this.x+=1;
                break;            
                case 3:             
                //남쪽
                this.y+=1;
                break;
                case 4: //서쪽
                this.x-=1;
                break;
            }

        };



};