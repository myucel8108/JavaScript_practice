import newlec from "../newlec.js";

export default class Sound {
  constructor() {
    this.img = document.querySelector("#volume-button");
    this.x = 100;
    this.y = 500;
    this.sw = this.img.width;
    this.sh = this.img.height;
    this.sx = 0;
    this.sy = 0;
    this.scale = 0.4;
    this.cw = this.sw * this.scale;
    this.ch = this.sh * this.scale;

    this.boomSound = document.querySelector("#boom-sound");
    this.splatterSound = document.querySelector("#splatter-sound");
    this.throwSound = document.querySelector("#throw-sound");

    this.homeSound = document.querySelector("#home-sound");
    this.isHomeSound = true;

    this.onGameSound = document.querySelector("#ongame-sound");
    this.isOnGameSound = true;

    this.endGameSound = document.querySelector("#endgame-sound");
    this.isEndGameSound = true;

    this.volumeStep = [0, 0.2, 0.4, 0.6, 0.8, 1];
    // 효과음 볼륨 비율조절 (0.1~1);
    this.volumeScale = 0.1;
    this.stepIndex = 3;
    this.currentVolume = 0;
  }

  update() {
    this.boomSound.volume = this.volumeStep[this.stepIndex] * this.volumeScale;
    this.splatterSound.volume = this.volumeStep[this.stepIndex] * this.volumeScale;
    this.throwSound.volume = this.volumeStep[this.stepIndex] * this.volumeScale;
    this.homeSound.volume = this.volumeStep[this.stepIndex] * 0.7;
    this.onGameSound.volume = this.volumeStep[this.stepIndex] * 0.2;
    this.endGameSound.volume = this.volumeStep[this.stepIndex];

    // newlec.sound.homeSound.play();
  }

  notifyClickVolumePlus(x, y) {
    if (this.x < x && x < this.x + this.cw / 2 && this.y < y && y < this.y + this.ch) {
      // console.log("음향증가" + this.stepIndex);
      this.stepIndex++;
      if (this.stepIndex > 5) this.stepIndex = 5;
    }
  }

  notifyClickVolumeMinus(x, y) {
    if (this.x + this.cw / 2 < x && x < this.x + this.cw && this.y < y && y < this.y + this.ch) {
      this.stepIndex--;
      if (this.stepIndex < 0) this.stepIndex = 0;
      // console.log("음향감소" + this.stepIndex);
    }
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.cw, this.ch);
  }
}
