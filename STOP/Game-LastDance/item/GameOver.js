import newlec from "../newlec.js";

export default class Gameover {
  constructor() {
    //gameover UI 동작
    this.fallInitPoint = 0;
    this.fallEndPoint = 250;

    this.gravity = 0.5; //중력
    this.elasticity = 0.7; //탄성
    this.initFallSpeed = 2;

    this.gameoverImg = document.querySelector("#gameover");
    this.alphabet = document.querySelector("#alphabet");
    //Continue 띄우기
    this.continueImage = {
      indexX: [200, 100, 0, 600, 800, 0, 700, 400],
      indexY: [200, 310, 310, 310, 200, 310, 310, 200],
      sWidth: [95, 95, 95, 95, 70, 95, 95, 95],
      sHeight: 95,
      xlocate: [250, 350, 450, 550, 660, 740, 840, 950],
      ylocate: this.fallInitPoint,
    };
    //yes 버튼
    this.btnYes = {
      x: 400,
      y: 450,
      width: 200,
      height: 100,
      label: "YES",
      btnfillStyle: "black",
    };
    //no 버튼
    this.btnNo = {
      x: 700,
      y: 450,
      width: 200,
      height: 100,
      label: "N O",
      btnfillStyle: "black",
    };

    this.onClickedYes = null; //Yes가 눌렸을 때, gamecanvas에 알려준다 (app에 알려주기 위해)
    this.onClickedNo = null; // No가 눌렸을 때, gamecanvas에 알려준다 (app에 알려주기 위함)
  }

  draw(ctx) {
    newlec.sound.endGameSound.play();
    ctx.drawImage(this.gameoverImg, 400, 100);
    let a = this.continueImage;
    for (let i = 0; i < a.indexX.length; i++) {
      ctx.drawImage(
        this.alphabet,
        a.indexX[i],
        a.indexY[i],
        a.sWidth[i],
        a.sHeight,
        a.xlocate[i],
        a.ylocate,
        a.sWidth[i],
        a.sHeight
      );
    }

    let btns = [this.btnYes, this.btnNo];
    for (let btn of btns) {
      let { x, y, width: w, height: h, label, btnfillStyle } = btn;
      ctx.fillStyle = btnfillStyle;
      ctx.font = "bold 60px serif";
      ctx.fillText(label, x + w / 5, y + h / 1.5);
    }
  }
  update() {
    if (this.continueImage.ylocate > 250) {
      this.initFallSpeed = -this.initFallSpeed * this.elasticity;
    }
    if (this.continueImage.ylocate > 250 && Math.abs(this.initFallSpeed) <= 0.3) {
      this.initFallSpeed = 0;
      this.gravity = 0;
    }

    this.initFallSpeed += this.gravity;
    this.continueImage.ylocate += this.initFallSpeed;
  }

  notifyClcikedYesBtn(x, y) {
    //Yes가 눌렸는지 No가 눌렸는지 확인
    let xdir = x - this.btnYes.x;
    let ydir = y - this.btnYes.y;
    if (xdir < this.btnYes.width && xdir > 0 && ydir < this.btnYes.height && ydir > 0) {
      //Yes Btn 눌렀을 때
      if (this.onClickedYes) {
        this.onClickedYes();
        newlec.sound.endGameSound.pause();
        newlec.sound.endGameSound.currentTime = 0;
        newlec.sound.onGameSound.currentTime = 0;
      }
    }
  }
  notifyClcikedNoBtn(x, y) {
    let xdir = x - this.btnNo.x;
    let ydir = y - this.btnNo.y;
    if (xdir < this.btnNo.width && xdir > 0 && ydir < this.btnNo.height && ydir > 0) {
      //No Btn 눌렀을 때
      if (this.onClickedNo) {
        this.onClickedNo();
        newlec.sound.onGameSound.currentTime = 0;
        newlec.sound.endGameSound.pause();
        newlec.sound.endGameSound.currentTime = 0;
        newlec.sound.isHomeSound = true;
        newlec.sound.isOnGameSound = true;
      }
    }
  }

  notifyMouseMove(x, y) {
    let Noxdir = x - this.btnNo.x;
    let Noydir = y - this.btnNo.y;

    let Yesxdir = x - this.btnYes.x;
    let Yesydir = y - this.btnYes.y;
    if (
      // No 올라가면
      Noxdir < this.btnNo.width &&
      Noxdir > 0 &&
      Noydir < this.btnNo.height &&
      Noydir > 0
    ) {
      this.btnNo.btnfillStyle = "white";
    } else {
      this.btnNo.btnfillStyle = "black";
    }

    if (Yesxdir < this.btnYes.width && Yesxdir > 0 && Yesydir < this.btnYes.height && Yesydir > 0) {
      this.btnYes.btnfillStyle = "white";
    } else {
      this.btnYes.btnfillStyle = "black";
    }
  }
}
