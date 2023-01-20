export default class ExitBtn {
  constructor() {
    // exit
    this.img = document.querySelector("#exit-button"); // id는 #
    this.dx = 950;
    this.dy = 460;
    this.sw = this.img.width;
    this.sh = this.img.height;
    this.sx = 0;
    this.sy = 0;
    this.size = 1.5;
    this.dw = this.sw * this.size;
    this.dh = this.sh * this.size;
    this.x1 = this.dx + this.dw / 2;
    this.y1 = this.dy + this.dh / 2;
    this.degree = 5;
    this.degree2 = 5;

    this.imgInner = document.querySelector("#bomb");
    this.indx = this.dx + 30;
    this.indy = this.dy + 34;
    this.insw = this.imgInner.width;
    this.insh = this.imgInner.height;
    this.size = 2;
    this.indw = this.insw * this.size;
    this.indh = this.insh * this.size;
    this.inx1 = this.indx + this.indw / 2;
    this.iny1 = this.indy + this.indh / 2;

    //불꽃 이미지
    this.imgSpark = document.querySelector("#spark");
    this.spsw = this.imgSpark.width / 6;
    this.spsh = this.imgSpark.height / 2;
    this.idx = 0;
    this.spsx = this.idx * this.spsw;
    // this.imgSpark.height / 2;
    this.spsy = 0;
    this.spdx = this.indx - 70;
    this.spdy = this.indy - 130;
    // this.spdx = 0;
    // this.spdy = 0;
    this.spsize = 1;
    this.spdh = this.spsw * 2;
    this.spdw = this.spsh;
    // this.sparkdelay = 2;

    //콜백 함수
    this.exitClicked = null;
  }

  update() {
    if (this.degree == 60) this.degree = 0;
    this.degree += 0.01;

    if (this.degree2 == 60) this.degree2 = 0;
    this.degree2 -= 0.01;

    // this.sparkdelay --;
    // if(this.sparkdelay == 0) {
    this.idx = (this.idx + 1) % 6;
    this.spsx = this.idx * this.spsw;
    // this.sparkdelay = 2;
    // }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x1, this.y1);
    ctx.rotate(this.degree);
    ctx.translate(-this.x1, -this.y1);
    ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
    ctx.restore();

    ctx.save();
    ctx.translate(this.inx1, this.iny1);
    ctx.rotate(this.degree2);
    ctx.translate(-this.inx1, -this.iny1);
    ctx.drawImage(this.imgInner, this.indx, this.indy, this.indw, this.indh);
    ctx.drawImage(
      this.imgSpark,
      this.spsx,
      this.spsy,
      this.spsw,
      this.spsh,
      this.spdx,
      this.spdy,
      this.spdw,
      this.spdh
    );
    ctx.restore();
  }

  notifyClick(x, y) {
    if (this.dx < x && x < this.dx + this.img.width && this.dy < y && y < this.dy + this.img.height)
      if (this.exitClicked != null) this.exitClicked();
  }
}
