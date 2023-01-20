export default class StartBtn {
  constructor() {
    this.img = document.querySelector("#start-button");
    this.dx = 500;
    this.dy = 340;
    this.sw = this.img.width; //겉이미지
    this.sh = this.img.height;
    this.x = this.dx - this.sw / 2;
    this.y = this.dy - this.sh / 2;

    this.sx = 0;
    this.sy = 0;
    this.size = 1.5;
    this.dw = this.sw * this.size;
    this.dh = this.sh * this.size;
    //돌아가는 좌표
    this.x1 = this.dx + this.dw / 2;
    this.y1 = this.dy + this.dh / 2;
    this.degree = 5;

        //sandia(수박) - start
        this.imgInnername="#sandia";
        this.imgInner = document.querySelector(this.imgInnername);
        this.CutImg1name=this.imgInnername.slice(0)+"l";
        this.CutImg2name=this.imgInnername.slice(0)+"r";
        this.CrushImgname=this.imgInnername.slice(0)+"s";
    
        this.CutImg1 = document.querySelector(this.CutImg1name);
        this.CutImg2 = document.querySelector(this.CutImg2name);
        this.CrushImg = document.querySelector(this.CrushImgname);

        this.indx = this.dx + 50;
        this.indy =  this.dy + 65;
        this.insw = this.imgInner.width;
        this.insh = this.imgInner.height;
        this.size = 2;
        this.indw = this.insw * this.size;
        this.indh = this.insh * this.size;
        this.inx1 = this.indx + this.indw / 2;
        this.iny1 = this.indy + this.indh / 2;

        this.fallfurit =this.iny1;

        this.degree =5;
        this.degree2 =5;

        this.startClicked = null; // homeCanvas로부터 받는 콜백함수 (함수명이 이게 맞나?)

        this.cutting =false;
        
        this.iscall = 0;

        this.preStart = false;

        //콜백으로 제어하면 이건 삭제
        // newlec.startBtn = this;
  }

  draw(ctx) {
    ctx.save();
    
    ctx.translate(this.x1, this.y1);
    ctx.rotate(this.degree);
    ctx.translate(-this.x1,-this.y1);

    ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh,
    this.dx, this.dy, this.dw, this.dh);
    ctx.restore();

    if(this.Cutting){
    ctx.save();
    ctx.translate(this.inx1, this.fallfurit);
    ctx.rotate(this.degree2);
    ctx.translate(-this.inx1,-this.fallfurit);
    ctx.drawImage(this.CutImg1, this.indx-15, this.fallfurit, this.indw, this.indh);
    ctx.drawImage(this.CutImg2, this.indx+15,this.fallfurit, this.indw, this.indh);

    ctx.restore();
    ctx.drawImage(this.CrushImg, this.indx, this.iny1-50, this.indw, this.indh);
    }
    else{
    ctx.save();
    ctx.translate(this.inx1, this.iny1);
    ctx.rotate(this.degree2);
    ctx.translate(-this.inx1,-this.iny1);
    ctx.drawImage(this.imgInner, this.indx, this.indy-15, this.indw, this.indh);
    }

    ctx.restore();
  }


  update() {
    //각도
    if(this.degree==60)
        this.degree=0;
        this.degree+=0.01;
    if(this.Cutting){
        this.fallfurit +=5;
        setTimeout(() => {
        this.Cutting =false;
        this.iscall = 0;
        this.fallfurit=this.iny1;
    }, 3000);
    }
    else{
        if(this.degree2==60)
        this.degree2=0;
        this.degree2-=0.01;
    }
  }


  notifyClick(x, y) {
    if((this.dx < x && x < this.dx + this.img.width) &&
    (this.dy < y && y <this.dy + this.img.height))
            if(this.startClicked != null){

                this.Cutting =true;
                // console.log("확인용" + this.iscall); //한번만 호출되게 막기
                if(this.iscall == 0)
                    setTimeout(() => {this.startClicked()},1000);
                    this.iscall++;
                    
            }
  }
}
