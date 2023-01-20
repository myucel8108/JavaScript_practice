export default class Elements{

    constructor() {

        this.imgSubBg = document.querySelector("#home-mask");
        this.bgdy = -500;
        this.imgTtleSub = document.querySelector("#home-desc");
        this.subtitledx = -400; 
        this.imgTitleFruit = document.querySelector("#logo");
        this.titlefruitdy;
        this.imgTitleNinja = document.querySelector("#ninja");
        this.ninjady = -150;

    }

    draw(ctx) {
        ctx.drawImage(this.imgSubBg,0,this.bgdy, this.imgSubBg.width * 2.2, this.imgSubBg.height *1.8);
        ctx.drawImage(this.imgTtleSub,this.subtitledx,250,this.imgTtleSub.width * 1.4, this.imgTtleSub.height * 1.4);
        ctx.drawImage(this.imgTitleFruit,30,this.titlefruitdy,this.imgTitleFruit.width * 1.8, this.imgTitleFruit.height * 1.8);
        ctx.drawImage(this.imgTitleNinja,550,this.ninjady,this.imgTitleNinja.width * 1.5 , this.imgTitleNinja.height * 1.5  );

    }

    update() {
        
    this.titlefruitdy = this.bgdy + 25;
    if (this.bgdy < 0) 
        this.bgdy += 20;
    else if (this.ninjady < 110) 
        this.ninjady += 10;
    else if (this.subtitledx < 18) 
        this.subtitledx += 10;
    }
}