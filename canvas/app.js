 window.addEventListener("load" ,function(){
    // window.onclick= function(){
    //     console.log("윈도우 클릭")
    // }
    var canvas = this.document.querySelector(".game-canvas");
        /** @type {CanvasRenderingContext2D} */ 
        var ctx = canvas.getContext("2d"); 

        canvas.onclick =function(){
            boy2.draw(ctx); //같은 위치에 도플갱어가 되다보니 둘을 개별적으로 위치를 가지게 할려면?
            boy2.move(4);
            console.log("캔버스 클릭");

        }


    //나중에 호출하게 되는 경우에 바꿔치기해주세요
    //바인드
   function Boy(x,y) {
    //인덱스
    this.ix=1;
    this.iy=2;
     //이미지 너비 길이
    this.sw =106;
    this.sh =148.25;
    //잘라낼 가로위치 세로위치
    this.sx = this.sw*this.ix;
    this.sy=this.sh*this.iy;
    this.x=x ||100;
    this.y=y ||100;
    }

    Boy.prototype ={
        draw:function(ctx){
            var img = new Image();
            img.src = "./image/boy.png";
            img.onload = function(){             
                ctx.drawImage(img,
                    this.sx,this.sy,this.sw,this.sh 
                     , this.x ,this.y,this.sw,this.sh);
                    //밖에 있는 this로 바꿔달라하자-> boy객체
            }.bind(this);
        },
        move:function(dir){
            switch(dir){
                case 1://북쪽
                this.y-=10;
                break;

                case 2: // 동쪽
                this.x+=10;
                break;
                
                case 3: //남쪽
                this.y+=10;
                break;

                case 4: //서쪽
                this.x-=10;
                break;
            }

        }
    };

    var boy1 = new Boy();
    boy1.draw(ctx);

    var boy2 = new Boy(100,100);
    boy2.draw(ctx); //같은 위치에 도플갱어가 되다보니 둘을 개별적으로 위치를 가지게 할려면?
    boy2.move(4);// 시계방향으로 왼쪽으로

    boy2.draw(ctx);
//     var img = new Image();
//     img.src = "./image/boy.png";
//     img.onload = function(){
//     // ctx.drawImage(img ,100,100); //100 100시작위치에서 다 보여주기
//     // ctx.drawImage(img, 100,100,106,148.25); //너비 높이를 시도했지만 사이즈를 줄이는거나 늘리는거 뿐이고 자르는게 안됨
    
//     //인덱스
//     var ix=1;
//     var iy=2;
//     var ix2=1;
//     var iy2=1;
//     //이미지 너비 길이
//     var sw= 106; 
//     var sh =148.25;
//     //잘라낼 가로위치 세로위치
//     var sx=sw*ix;
//     var sy=sh*iy;

//     var sx2=sw*ix2;
//     var sy2=sh*iy2;

//     ctx.drawImage(img,sx,sy,sw,sh, //자를 가로 위치 , 자를 세로 위치 ,자를 가로 범위 ,자를 세로범위
//                       100 ,100 , sw,sh  
//                     );

//     ctx.drawImage(img,sx2,sy2,sw,sh, //자를 가로 위치 , 자를 세로 위치 ,자를 가로 범위 ,자를 세로범위
//                     200 ,100,sw,sh
//                   );


//     //모든캐릭터를 출력하고 싶으면


//     //ctx.drawImage("원본에서" 자를 가로 위치 , 자를 세로 위치 ,자를 가로 범위 ,자를 세로범위
//     //페이지에서 보여줄 가로 시작위치, 세로 시작위치, 가로범위,세로범위)
//     //캐릭터가 2개나올때 머리 아픈 이유
//     //개발자는 계산기를 두둘기면 안된다!
//     //많은 캐릭터를 위해선 구조화를 이뤄내야 한다.-> 이를 넘어서 캡슐화
//     //말하는대로 움직이게 할려면?
//     //
// };


});
 
 
 
