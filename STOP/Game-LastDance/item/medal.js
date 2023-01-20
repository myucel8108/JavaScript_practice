import newlec from "../newlec.js";

export default class Medal {
  constructor() {
    this.goldMedal = document.querySelector("#gold");
    this.silverMedal = document.querySelector("#silver");
    this.bronzeMedal = document.querySelector("#bronze");

    this.apple = document.querySelector("#apple");
    this.peach = document.querySelector("#peach");
    this.basaha = document.querySelector("#basaha");
    this.sandia = document.querySelector("#sandia");

    this.number = document.querySelector("#number");

    this.score = newlec.score;
    this.score.sort(function (b, a) {
      return a.totalScore - b.totalScore;
    });
    //메달 좌표를 기준으로 나머지 애들 좌표 전부 정렬
    //메달 좌상단이 기준, X Y Width Height (여기 3개로 나누면 이걸 기준으로 다 그릴수 있음)
    //r = root(메달이 기준)
    this.rootList = [10, 120, 230];
    this.medal = [this.goldMedal, this.silverMedal, this.bronzeMedal];
    this.fruitSize = 50;
    this.rX = 10;
    this.rY = 10;
    this.rW = 100;
    this.rH = 100;
    //Score 위치
    // sc = score
    this.scX = this.rX + 100;
    this.scW = this.number.width / 10 - 0.7;
    this.scH = this.number.height;
    this.scoreNumberWidth = 90;
    this.scoreNumberHeight = 90;
    this.scY = this.rY + (this.rH - this.scoreNumberHeight) / 2;

    this.fruitNumberWdith = 35;
    this.fruitNumberHeight = 35;
    this.fruitScoreY = this.rY + (this.rH - this.fruitNumberHeight) / 2;
    //과일들 4개 위치
    //사과
    this.aX = this.scX + 400;
    this.aH = this.fruitSize;
    this.aW = this.fruitSize;
    this.aY = this.rY + (this.rH - this.aH) / 2;
    //복숭아
    this.pX = this.aX + 200;
    this.pW = this.fruitSize;
    this.pH = this.fruitSize;
    this.pY = this.rY + (this.rH - this.pH) / 2;
    //딸기
    this.bX = this.pX + 200;
    this.bW = this.fruitSize;
    this.bH = this.fruitSize;
    this.bY = this.rY + (this.rH - this.bH) / 2;
    //수박
    this.sX = this.bX + 200;
    this.sW = this.fruitSize;
    this.sH = this.fruitSize;
    this.sY = this.rY + (this.rH - this.sH) / 2;
    //Score 출력 위치 조정
    // console.log(this.score);
  }
  draw(ctx) {
    for (let RankingLocation = 0; RankingLocation < 3; RankingLocation++) {
      this.rY = this.rootList[RankingLocation];
      this.setInitCordination();

      if (this.score[RankingLocation]) {
        let a = this.getIntIndexTypeFromString(this.score[RankingLocation].totalScore);
        for (let scoreDigit = 0; scoreDigit < a.length; scoreDigit++) {
          let sx = a[scoreDigit] * this.scW;
          let dx = this.scX + this.scW * scoreDigit;
          ctx.drawImage(
            this.number,
            sx,
            0, // 이미지 파일의 Y좌표는 0으로 고정
            this.scW,
            this.scH,
            dx,
            this.scY,
            this.scoreNumberWidth,
            this.scoreNumberHeight
          );
        }

        let fruitXWidth = [this.aX, this.pX, this.bX, this.sX];
        for (let fruitindex = 0; fruitindex < 4; fruitindex++) {
          let a = this.getIntIndexTypeFromString(
            this.score[RankingLocation].cutFruitInfo[fruitindex]
          );
          for (let fruitNumIndex = 0; fruitNumIndex < a.length; fruitNumIndex++) {
            let sx = a[fruitNumIndex] * this.scW;
            let tmpscX = fruitXWidth[fruitindex] + 60;
            let dx = tmpscX + this.fruitNumberWdith * fruitNumIndex;
            // console.log(dx, this.fruitNumberWdith, fruitNumIndex);
            // console.log(tmpscX);

            ctx.drawImage(
              this.number,
              sx,
              0, // 이미지 파일의 Y좌표는 0으로 고정
              this.scW,
              this.scH,
              dx,
              this.fruitScoreY,
              this.fruitNumberWdith,
              this.fruitNumberHeight
            );
          }
        }

        // for (let i = 0; i < 3; i++) {

        ctx.drawImage(this.medal[RankingLocation], this.rX, this.rY, this.rW, this.rH);
        ctx.drawImage(this.apple, this.aX, this.aY, this.aW, this.aH);
        ctx.drawImage(this.peach, this.pX, this.pY, this.pW, this.pH);
        ctx.drawImage(this.basaha, this.bX, this.bY, this.bW, this.bH);
        ctx.drawImage(this.sandia, this.sX, this.sY, this.sW, this.sH);
        // }apple peach basaha sandia
      }

      // console.log(this.rY);
    }
  }

  update() {}

  setScore() {
    this.score = newlec.score;
  }

  getIntIndexTypeFromString(str) {
    let digits = str.toString().split("");
    let realDigits = digits.map(Number);

    return realDigits;
  }
  setInitCordination() {
    this.scX = this.rX + 100;
    this.scY = this.rY + (this.rH - this.scoreNumberHeight) / 2;
    this.fruitScoreY = this.rY + (this.rH - this.fruitNumberHeight) / 2;
    this.aX = this.scX + 400;
    this.aY = this.rY + (this.rH - this.aH) / 2;
    this.pX = this.aX + 200;
    this.pY = this.rY + (this.rH - this.pH) / 2;
    this.bX = this.pX + 200;
    this.bY = this.rY + (this.rH - this.bH) / 2;
    this.sX = this.bX + 200;
    this.sY = this.rY + (this.rH - this.sH) / 2;
  }
}
