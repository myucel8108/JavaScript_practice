window.addEventListener("load",function(){
    var canvas = this.document.querySelector(".game-canvas");
    /** @type {CanvasRenderingContext2D} */ 
    var ctx = canvas.getContext("2d"); 

        canvas.onclick =function(){
            
            fruit1.draw(ctx);
            fruit1.move(1);
            console.log("캔버스 클릭");

        }


    function fruit(){
        this.ix=0;
        this.iy=0;
         //이미지 너비 길이
        this.sw =68;
        this.sh =68;
        //잘라낼 가로위치 세로위치
        this.sx = this.sw*this.ix;
        this.sy=this.sh*this.iy;
        this.x=x ||68;
        this.y=y ||68;
    }
    fruit.prototype={
        draw:function(ctx){
        var img = new Image();
        img.src = "./image/bomb.png";
        img.onload = function(){             
            ctx.drawImage(img,
                this.sx,this.sy,this.sw,this.sh 
                 , this.x ,this.y,this.sw,this.sh);
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

var fruit1 = new fruit();



});