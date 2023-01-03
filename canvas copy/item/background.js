function Background(){
    this.dir =dir;
}

Background.prototype ={

    scroll:function(dir){ //인자 넣어서 스크롤하기
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
    },
    update:function(){

        
    },
    draw:function(ctx){
        var img = new Image();
        img.src = "./image/map.png";
        img.onload = function(){             

        }.bind(this);
    },


}