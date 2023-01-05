class Background{
    constructor(dir){

    this.dir =dir || 1;

    };

    scroll(){ //인자 넣어서 스크롤하기
        switch (dir) {
            case 1:
                
                break;
            case 2:
                
                break;
            case 3:
                
                break;    
            case 4:
                
                break;
        
            default:
                break;

        
        }
    }
    update(){

        
    }
    draw(ctx){
        var img = new Image();
        img.src = "./image/map.png";
        img.onload = function(){             
            ctx.drawImage(img,
                0,0,700,700);
                //밖에 있는 this로 바꿔달라하자-> boy객체
        }.bind(this);
    }



}