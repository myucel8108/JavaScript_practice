export default class SettingBtn {

  constructor() {

    this.img = document.querySelector('#setting-button');
    this.dx = 150;
    this.dy = 360;
    this.sw = this.img.width;
    this.sh = this.img.height;
    this.sx = 0;
    this.sy = 0;
    this.size = 1.5;
    this.dw = this.sw * this.size;
    this.dh = this.sh * this.size;
    //과일만의 y좌표를 따로 빼놔야함
    this.fdw = this.sw * this.size;
    this.fdh = this.sh * this.size;
    //돌아가는 좌표
    this.x1 = this.dx+this.dw/2;
    this.y1 = this.dy+this.dh/2;
    this.degree =5;
    
    this.imgInnername = "#basaha";
    this.imgInner = document.querySelector(this.imgInnername);
    this.CutImg1name=this.imgInnername.slice(0)+"l";
    this.CutImg2name=this.imgInnername.slice(0)+"r";
    this.CrushImgname=this.imgInnername.slice(0)+"s";
    
    this.CutImg1 = document.querySelector(this.CutImg1name);
    this.CutImg2 = document.querySelector(this.CutImg2name);
    this.CrushImg = document.querySelector(this.CrushImgname);


    this.indx = this.dx + 65;
    this.indy = this.dy + 59;
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

    this.settingClicked = null; //콜백함수
    this.cutting =false;

  }


  update() {
    //각도
    if(this.degree==60)
      this.degree=0;
    this.degree+=0.01;
    if(this.Cutting){
      
      this.fallfurit +=15;
      setTimeout(() => {
        this.Cutting =false;
        this.fallfurit=this.iny1;
      }, 1000);
    }
    else{
    if(this.degree2==60)
    this.degree2=0;
    this.degree2-=0.01;
    }
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

  notifyClick(x,y) {
    if((this.dx < x && x < this.dx + this.img.width) &&
          (this.dy < y && y <this.dy + this.img.height) )
      if(this.settingClicked != null){
        this.settingClicked();
        this.Cutting =true;
      } 
  }


}