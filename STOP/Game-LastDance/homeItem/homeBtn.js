export default class HomeBtn {
  constructor() {
    //이미지가 없어서 우선 exit-btn이랑 동일한 이미지로
    this.img = document.querySelector("#exit-button");
    this.dx = 980; // 그림 테두리좌표
    this.dy = 430;
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
    this.x = this.dx + this.sw;
    this.y = this.dy + this.sh;
    this.inx1 = this.indx + this.indw / 2;
    this.iny1 = this.indy + this.indh / 2;

    //콜백 함수
    this.homeClicked = null;
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
    ctx.restore();
  }
  update() {
    if (this.degree == 60) this.degree = 0;
    this.degree += 0.001;

    if (this.degree2 == 60) this.degree2 = 0;
    this.degree2 -= 0.005;
  }
  notifyClick(x, y) {
    if (this.dx < x && x < this.dx + this.img.width && this.dy < y && y < this.dy + this.img.height)
      if (this.homeClicked != null) this.homeClicked();
  }
}
