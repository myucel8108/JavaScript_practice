
export default class fruit{
    constructor(ix=0, iy=600){
        this.img = document.querySelector("#apple");
        this.ix=ix;
        this.iy=iy;
        this.speed =(Math.random()*10)*.1;
        this.force = -this.speed*10;
        this.curForce = this.force;
        this.angle=0;
        
    }
    
    update(){
        this.ix +=0.5;
        this.iy += Math.sin(this.angle);
        console.log("이거 하는중?");
        this.angle+=0.8;

         if(this.iy>=100){
             this.angle = -this.angle; // if the ball hits the bottom of the canvas reverse the angle.
           }
      
    };

    draw(ctx){
        ctx.drawImage(this.img,this.ix,this.iy);
        console.log("이건 하는중?2");

    }

  
    
    
} 