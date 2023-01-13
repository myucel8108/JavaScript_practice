import newlec from '../newlec.js';

export default class Boy {
    #speed;
    constructor(x, y){
        this.x = x || 100;
        this.y = y || 100;

        this.vx = 0;
        this.vy = 0;

        this.dx = 0;
        this.dy = 0;

        this.#speed = 3;

        this.walkDelay = 10;
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;

        // --- 이미지를 그리기 위한 변수들 ----------------------
        this.img = document.querySelector("#boy");
        this.ix = 1;
        this.iy = 2;

        // 이건 이제 우리가 손대는 것이 아님.
        this.sw = this.img.width/3;
        this.sh = this.img.height/4;
        
    }

    set speed(value){
        this.#speed = value;
    }

    get speed(){
        return this.#speed;
    }

    draw(ctx) {
        this.sx = this.sw * this.ix; //sw*0, sw*1, sw*2
        this.sy = this.sh * this.iy;

        ctx.drawImage(this.img,
            this.sx, this.sy, this.sw, this.sh,
            this.x-this.sw/2, this.y-this.sh+15, this.sw, this.sh);
        // var img = new Image();
        // img.src = "./image/boy.png";
        // img.onload = function () {
        //     //console.log(this.sw);

        // }.bind(this);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sw/2, 0, 2 * Math.PI);
        ctx.stroke();
        
    }

    update(){
        for(let enemy of newlec.enemies){
            let ex = enemy.x;
            let ey = enemy.y;
            let x = this.x;
            let y = this.y;

            let d = Math.sqrt((ex-x)*(ex-x)+(ey-y)*(ey-y));
            let r1r2 = this.sw/2 + enemy.width/2;

            if(d <= r1r2){
                enemy.chungdol();
                console.log("충돌발생!");
                // 위임 받아 놓은 함수(Callback 함수)를 호출한다.
                if(this.onNoLife)
                    this.onNoLife();
            }
        }


        // --- 이동을 위한 코드 ---------------------
        if(this.moveUp)
            this.y-=this.#speed;
        if(this.moveDown)
            this.y+=this.#speed;
        if(this.moveLeft)
            this.x-=this.#speed;
        if(this.moveRight)
            this.x+=this.#speed;


        // switch (this.dir) {
        //     case 1://북쪽
        //         this.y -= 1;
        //         break;
        //     case 2://동쪽
        //         this.x += 1;
        //         break;
        //     case 3://남쪽
        //         this.y += 1;
        //         break;
        //     case 4://서쪽
        //         this.x -= 1;
        //         break;
        //     default:
        //         console.log(this.dir);
        // }


        if((this.dx-1 < this.x && this.x < this.dx+1)
            || (this.dy-1 < this.y && this.y < this.dy+1)){
            this.vx = 0;
            this.vy = 0;
        }                
        
        // 벡터가 0이면 반환
        if(!(this.moveLeft||this.moveRight||this.moveUp||this.moveDown||false))
            if(this.vx == 0 && this.vy == 0){
                this.ix = 1;
                return;
            }

        this.x += this.vx;
        this.y += this.vy;
        
        // 걸음을 걷는 효과
        this.walkDelay--;
        if(this.walkDelay == 0)
        {
            this.ix = this.ix==2?0:2;
           // console.log(this.ix);
        
            this.walkDelay=10;
        }
 
        
    }
    
    moveTo(dx, dy){
        
        let w = dx - this.x;
        let h = dy - this.y;

        let d = Math.sqrt(w*w+h*h);
        this.vx = w/d;
        this.vy = h/d;
        this.dx = dx;
        this.dy = dy;
    }

    move(dir) {
        switch (dir) {
            case 1://북쪽                                
                this.moveUp = true;
                break;
            case 3://남쪽
                this.moveDown = true;
                break;
            case 2://동쪽
                this.moveRight = true;
                break;
            case 4://서쪽
                this.moveLeft = true;
                break;
        }
    }

    stop(dir){
        switch (dir) {
            case 1://북쪽                                
                this.moveUp = false;
            case 3://남쪽
                this.moveDown = false;
                break;
            case 2://동쪽
                this.moveRight = false;
                break;
            case 4://서쪽
                this.moveLeft = false;
                break;
        }
    }
}
