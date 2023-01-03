window.addEventListener("load",function(){
    var canvas = this.document.querySelector(".game-canvas");
    /** @type {CanvasRenderingContext2D} */ 
    var ctx = canvas.getContext("2d"); 
        var condition =true;

        canvas.onclick =function(){

            fruit1.draw(ctx);

            (condition?fruit1.move(1):fruit1.move(2));

            console.log("캔버스 클릭");

        }

    function fruit(y,p){
        this.ix=0;
        this.iy=0;
         //이미지 너비 길이
        this.sw =68;
        this.sh =68;
        //잘라낼 가로위치 세로위치
        this.sx = this.sw*this.ix;
        this.sy=this.sh*this.iy;
        this.x= Math.sqrt(4*p*y);
        this.y= -p;
        this.p =p;
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
        (this.x ==250?condition= !condition: condition=condition)
        switch(dir){
            case 1://위로
            this.y-=10;
            this.x-=10;
            break;

            case 2: // 아래로
            this.x-=10;
            this.y+=10;
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
fruit1.draw(ctx);
fruit1.move(2);


});