
export default class Life{
    constructor(){
        this.img = document.querySelector('#life3');
        this.bombEffect = document.querySelector("#bombEffect");
        this.lifeImgs = ["#life2","#life1","#life0", "#gameover"]
        this.idx = 0;
        this.gameover = false
        this.sw = this.img.width;
        this.sh = this.img.height;

    }
    
    
    update(){
        
        // 이미지 변경
        this.img = document.querySelector(this.lifeImgs[this.idx]);
        this.idx++;
        if(this.idx >= 4){
            this.idx = 3;
            this.gameover = true;
        }    
}

    draw(ctx){
        if(this.gameover)
            ctx.drawImage(this.img, 300,300);
        else
        ctx.drawImage(this.img, 10,100, this.sw*1.5, this.sh*1.5);
    }
}