
export default class fruit{

        #centerx;
        #centery;
        #width;
        #height;
    constructor(randfruit){
        this.img = document.querySelector(randfruit==1?"#apple": randfruit==2?"#peach":randfruit==3?"#basaha":randfruit==4?"#sandia":"#bomb");
        this.x = Math.random()*1200;    
        this.y= 700;
        this.dirx=Math.round(Math.random());
        this.speed =(Math.random()*3)*.5+1.5;
        this.force = -this.speed*10;
        this.curForce = this.force;
        this.score =randfruit==1?50: randfruit==2?80:randfruit==3?60:randfruit==4?30:-300;
        this.#centerx;
        this.#centery;
        this.#width;
        this.#height;
    }
    get width(){
        return this.img.width/2;
    }
    get height(){
        return this.img.height/2;
    }
    update(){
        if(this.dirx==0){
            this.x -= this.speed;
        }
        else{
            this.x += this.speed;
        }
        this.y += this.curForce+=0.5;

        if(this.y<=-1000){
             this.curForce = -this.force; // if the ball hits the bottom of the canvas reverse the angle.
        }
    };

    draw(ctx){
        ctx.drawImage(this.img,this.x,this.y);
    }


    
    
} 