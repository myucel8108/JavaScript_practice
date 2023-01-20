export default class Score {
  constructor() {
    this.scoreInfo = {
      totalScore: 0,
      cutFruitInfo: [0, 0, 0, 0], //apple peach basaha sandia
    };

    //이미지로드
    this.img = document.querySelector("#number");

    this.idx = 0; // 0점이 기본
    this.sw = this.img.width / 10 - 0.7;
    this.sh = this.img.height;
    this.sx = this.idx * this.sw;
    this.sy = 0;
    this.dxInit = 30;
    this.scoreLength = 0;
    this.dx = this.dxInit + this.dw * this.scoreLength; //score 자릿수 늘어날 때
    this.dy = 20;
    this.size = 0.8;
    this.dw = this.sw * this.size; //출력해봐서 사이즈 배수 조절
    this.dh = this.sh * this.size;

    this.numbers = [];
  }

  draw(ctx) {
    if (this.scoreInfo.totalScore < 0) this.scoreInfo.totalScore = 0;

    //점수 그림으로 출력하기
    // console.log(this.totalScore);
    let charTotalScore = this.scoreInfo.totalScore.toString();
    this.numbers = charTotalScore.split("");
    this.scoreLength = this.numbers.length;

    for (let scoreDigit = 0; scoreDigit < this.scoreLength; scoreDigit++) {
      this.numbers[scoreDigit] == "9"
        ? (this.idx = 9)
        : this.numbers[scoreDigit] == "1"
        ? (this.idx = 1)
        : this.numbers[scoreDigit] == "2"
        ? (this.idx = 2)
        : this.numbers[scoreDigit] == "3"
        ? (this.idx = 3)
        : this.numbers[scoreDigit] == "4"
        ? (this.idx = 4)
        : this.numbers[scoreDigit] == "5"
        ? (this.idx = 5)
        : this.numbers[scoreDigit] == "6"
        ? (this.idx = 6)
        : this.numbers[scoreDigit] == "7"
        ? (this.idx = 7)
        : this.numbers[scoreDigit] == "8"
        ? (this.idx = 8)
        : (this.idx = 0);

      this.sx = this.idx * this.sw;
      this.dx = this.dxInit + this.dw * scoreDigit;
      ctx.drawImage(
        this.img,
        this.sx,
        this.sy,
        this.sw,
        this.sh,
        this.dx,
        this.dy,
        this.dw,
        this.dh
      );
    }

    //데이터 저장시, score 하단에 최고점수 띄우기
  }

  notifyOnCollisionFruit(fruit) {
    this.scoreInfo.totalScore += fruit.score;
  }

  notifyOnCollisionBoom(bomb) {
    this.scoreInfo.totalScore += bomb.score;
  }

  setCutFruitInfo(index) {
    //과일별, 잘린거 카운트
    let fruitIndex = index - 1;
    // console.log(fruitIndex);
    this.scoreInfo.cutFruitInfo[fruitIndex]++;
    // console.log(this.scoreInfo.cutFruitInfo);
  }

  getgameInfo() {
    //최종 결과 반환을 위한 Score 반환
    return this.scoreInfo;
  }
}
