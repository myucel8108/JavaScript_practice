export default class Enemy{
    constructor(x=0, y=0){
        this.x = x;
        this.y = y;
        this.speed=2;
        this.onOutOfSreen = null;
        this.isChungdol = false;
        
        this.img = document.querySelector("#enemy");
        this.imgExpl = document.querySelector("#explosion");
        // [e]xplosion [i]ndex 
        this.eix = 0;
        this.eiy = 0;
        this.esw = this.imgExpl.width/4;
        this.esh = this.imgExpl.height/5;

    }

    get width(){
        return this.img.width;
    }

    chungdol(){
        this.isChungdol = true;
    }

    draw(ctx){
        ctx.drawImage(this.img, 
                this.x-this.img.width/2, 
                this.y-this.img.height/2);

        //ctx.drawImage(this.imgExpl, this.x, this.y);

                
        if(this.isChungdol){
            this.esx = this.esw * this.eix; //sw*0, sw*1, sw*2
            this.esy = this.esh * this.eiy;
            ctx.drawImage(this.imgExpl,
                this.esx, this.esy, this.esw, this.esh,
                this.x-this.esw/2, this.y-this.esh+15, this.esw, this.esh);
        }
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.img.width/2, 0, 2 * Math.PI);
        ctx.stroke();
    }

    update(){
        this.y+=this.speed;

        if(this.y > 500)
            if(this.onOutOfScreen != null)
                this.onOutOfScreen(this);
            
    }
    
}
