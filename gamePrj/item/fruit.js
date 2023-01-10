
export default class fruit{
    constructor(){
        this.img = document.querySelector("#apple");
        this.x=0;
        this.y=0;
        
    }
    


    draw(ctx){
        ctx.drawImage(this.img,this.x,this.y);

    }
    
} 