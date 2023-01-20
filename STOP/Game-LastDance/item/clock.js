export default class Clock {
  constructor(x, y) {
    // 타이머의 위치
    this.x = x || 70;
    this.y = y || 230;
    // 100*100 타이머 기준
    this.w = 120;
    this.h = 120;
    //초침의 길이 -> 나머지 크기의 기준
    this.actualRadius = this.w / 2;
    this.fontSize = this.actualRadius / 10;
    this.clockMargin = this.actualRadius / 20;
    this.hoursPadding = this.actualRadius / 6;

    (this.radius = this.w / 2 - this.clockMargin),
      (this.handRadius = this.radius - this.hoursPadding),
      (this.handPadding = this.actualRadius / 10),
      (this.hourHandPadding = this.actualRadius / 5),
      this.loop;

    this.secCount = 0;
    this.minCount = 0;
    this.arrayMin = [];

    this.onTimeLimit = null;
    this.isTimeLimit = false;
  }

  update(gameover) {
    this.secCount++;
    // 시간 속도 조절 : 낮을 수록 빠르게
    if (this.secCount % 30 == 0) {
      // this.secCount = 0;
      this.minCount++;
    }
    // console.log("초 : " + this.secCount);
    // console.log("분 : " + this.minCount);
    else if (gameover) {
      // console.log("먼저 게임 오버!!");
    } else if (this.minCount == 60 && !this.isTimeLimit) {
      this.isTimeLimit = true;
      if (this.isTimeLimit) this.onTimeLimit();
    }
  }

  draw(ctx) {
    ctx.font = this.fontSize + "pt Calibri";
    this.drawCircles(ctx);
    this.drawHours(ctx);
    this.drawHand(ctx);
  }
  // 시계 테두리
  drawCircles(ctx) {
    ctx.strokeStyle = "#565655";
    if (this.minCount > 50) ctx.strokeStyle = "#ff5655";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.lineWidth = this.actualRadius / 13;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = this.actualRadius / 20;
    ctx.arc(this.x, this.y, this.radius - ctx.lineWidth, 0, Math.PI * 2, true);
    //ffb517
    ctx.strokeStyle = "#b5b5b5";
    if (this.minCount > 50) ctx.strokeStyle = "#ffb517";
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
    ctx.fill();
  }
  drawHours(ctx) {
    let angle = 0;
    let hourWidth = 0;
    for (let hour = 1; hour <= 12; hour++) {
      angle = (Math.PI / 6) * (hour - 3);
      this.hourWidth = ctx.measureText(hour).width;
      ctx.fillText(
        hour,
        this.x + Math.cos(angle) * this.handRadius - hourWidth / 2,
        this.y + Math.sin(angle) * this.handRadius + this.fontSize / 3
      );
    }
  }
  // pos : 시간의 위치, isHour : 시침이냐??, lineWidth: 침의 두께
  drawHand(ctx) {
    // var tempHandRadius;

    // let date = new Date;
    // console.log("초 : " + date.getSeconds());

    let angleSec = Math.PI * 2 * ((this.secCount % 60) / 60) - Math.PI / 2;
    let angleMin = Math.PI * 2 * ((this.minCount % 60) / 60) - Math.PI / 2;

    ctx.lineCap = "round";
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x + Math.cos(angleMin) * this.handRadius,
      this.y + Math.sin(angleMin) * this.handRadius
    );
    ctx.lineWidth = 5;
    ctx.stroke();

    // ctx.lineCap = "round";
    // ctx.moveTo(this.x, this.y);
    // ctx.lineTo(this.x + Math.cos(angleSec) * this.handRadius,
    //     (this.y + Math.sin(angleSec) * this.handRadius));
    // ctx.lineWidth = 2;
    // ctx.stroke();
  }
}
