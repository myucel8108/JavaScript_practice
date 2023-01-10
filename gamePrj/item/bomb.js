
export default class bomb{
    constructor(){
        this.img = document.querySelector("#bomb");
        this.x=0;
        this.y=0;
        
    }
    


    draw(ctx){
        ctx.drawImage(this.img,this.x,this.y);

    }
    
} 