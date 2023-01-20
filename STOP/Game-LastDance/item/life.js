export default class Life {
  constructor() {
    // this.img;
    this.img = document.querySelector("#life3");
    this.lifeImgs = ["#life3", "#life2", "#life1", "#life0"];
    this.idx = 0;
    this.gameoverImg = document.querySelector("#gameover");

    this.gameover = false;
    this.sw = this.img.width;
    this.sh = this.img.height;
    this.onCheckgameoverCallbackfn = null;
  }

  update() {
    // 이미지 변경
    // this.idx = 0;
    this.img = document.querySelector(this.lifeImgs[this.idx]);

    if (this.idx >= 3 && !this.gameover) {
      //한번만 실행하기 위해 gameover 상태변수 변경
      this.gameover = true;
      this.onCheckgameoverCallbackfn();
    }

    // console.log("업데이트??" + this.lifeImgs[this.idx]);
  }

  draw(ctx) {
    // console.log(this.idx);
    ctx.drawImage(this.img, 10, 100, this.sw * 1.5, this.sh * 1.5);
  }

  decreaseLife() {
    //마우스 충돌되면 목숨 깎임(실제론 충돌 횟수를 측정)
    if (this.idx < 3) this.idx++;
  }
}
