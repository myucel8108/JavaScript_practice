import Background from "../item/background.js";
import StartButton from "../homeItem/startBtn.js";
import ExitButton from "../homeItem/exitBtn.js";
import SettingButton from "../homeItem/settingBtn.js";
import Elements from "../homeItem/elements.js";
import newlec from "../newlec.js";

export default class HomeCanvas {
  constructor() {
    this.dom = document.querySelector(".home-canvas");
    this.dom.focus();
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.dom.getContext("2d");

    //Knife 현재 수정중
    this.knifes = [];
    this.knifex = 0;
    this.knifey = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.slicingFruit = false;

    //필요한 객체
    this.background = new Background();
    this.startBtn = new StartButton();
    this.startBtn.startClicked = this.startBtnClickedHandler.bind(this); //콜백함수 부여
    this.exitBtn = new ExitButton();
    this.exitBtn.exitClicked = this.exitBtnClickedHandler.bind(this);
    this.settingBtn = new SettingButton();
    this.settingBtn.settingClicked = this.settingBtnClickedHandler.bind(this);
    this.elemetns = new Elements();

    this.gameInit = false; // 처음 한번 클릭할때만 음향 맞추기
    //프레임
    this.frame = 1000 / 60; // 1초에 60프레임
    this.isFrameStop = false;
    this.isHomeSoundOn = false;
    //전역객체 -- 우선 스킵

    //이벤트
    this.dom.onclick = this.clickHandler.bind(this);
    //this.dom(Canvas)에 의한 마우스 이벤트
    this.dom.onmousedown = this.MouseDownHandler.bind(this);
    this.dom.onmouseup = this.MouseUpHandler.bind(this);
    this.dom.onmousemove = this.MouseMoveHandler.bind(this);
    //터치 이벤트
    this.dom.ontouchend = this.touchendHandler.bind(this);
    this.dom.ontouchmove = this.touchmoveHandler.bind(this);
    this.dom.ontouchstart = this.touchstartHandler.bind(this);
    //app.js로부터 부여받은 콜백함수
    this.onstartGame = null;
    this.onExit = null;
    this.onSetting = null;
  }

  run() {
    if (this.isFrameStop) return;
    this.draw();
    this.update();
    this.renderKnife();
    window.setTimeout(() => {
      this.run();
    }, this.frame);
  }

  draw() {
    // console.log(newlec.sound.isHomeSound);
    // console.log("homeCanvas실행");
    // newlec.sound.homeSound.pause();
    // && !this.isHomeSoundOn
    // if (newlec.sound.isHomeSound) {
    //   //   // newlec.sound.homeSound.muted = true;
    //   newlec.sound.homeSound.play();

    //   //   // newlec.sound.homeSound.muted = false;
    // }
    this.background.draw(this.ctx);
    this.startBtn.draw(this.ctx);
    this.exitBtn.draw(this.ctx);
    this.settingBtn.draw(this.ctx);
    this.elemetns.draw(this.ctx);
  }

  update() {
    this.elemetns.update();
    this.startBtn.update();
    this.settingBtn.update();
    this.exitBtn.update();
  }
  //칼 생성기 이벤트
  renderKnife() {
    for (let i = 0; i < this.knifes.length; i++) {
      this.ctx.strokeStyle = "white";
      this.ctx.beginPath();
      this.ctx.moveTo(this.knifes[i].x, this.knifes[i].y);
      this.ctx.lineTo(this.knifes[i].prevMouseX, this.knifes[i].prevMouseY);
      this.ctx.stroke();
      this.ctx.lineWidth = 4;
      this.ctx.closePath();
    }
    if (this.knifes.length > 4) {
      this.knifes.shift();
      this.knifes.shift();
    }
  }

  //이벤트
  clickHandler(e) {
    //클릭 발생시 btn들한테 notify (너가 클릭된거니?)
    // console.log("클릭");
  }

  //이벤트 핸들러
  startBtnClickedHandler() {
    newlec.sound.isHomeSound = false;
    this.isFrameStop = true;
    if (this.onstartGame != null) {
    }
    newlec.sound.homeSound.pause();
    this.onstartGame();
  }

  exitBtnClickedHandler() {
    // this.isFrameStop = true;
    if (this.onExit != null) this.onExit();
  }

  settingBtnClickedHandler() {
    setTimeout(() => {
      this.isFrameStop = true;
      if (this.onSetting != null) this.onSetting();
    }, 2000);
  }
  //모바일 터치 이벤트
  touchstartHandler(e) {
    //터치 했을때
    this.prevMouseX = this.knifex;
    this.prevMouseY = this.knifey;
    this.knifex =  e.touches[0].clientX - e.target.offsetLeft;
    this.knifey=e.touches[0].clientY - e.target.offsetTop + document.documentElement.scrollTop;
    this.slicingFruit = true;
    console.log("터치가 되었다");
  }
  touchendHandler(e) {
    //터치 끝났을때
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.knifes = [];
    this.slicingFruit = false;
  }

  touchmoveHandler(e) {
    //터치하고 움직였을때
    if (this.slicingFruit) {
      this.prevMouseX = this.knifex;
      this.prevMouseY = this.knifey;
      this.knifex =  e.touches[0].clientX - e.target.offsetLeft;
      this.knifey=e.touches[0].clientY - e.target.offsetTop + document.documentElement.scrollTop;
      this.startBtn.notifyClick(this.knifex, this.knifey);
      this.settingBtn.notifyClick(this.knifex, this.knifey);
      this.exitBtn.notifyClick(this.knifex, this.knifey);
      this.knifes.push({
        x: this.knifex,
        y: this.knifey,
        prevMouseX: this.prevMouseX,
        prevMouseY: this.prevMouseY,
      });
      // for (let fruit of this.fruits) {
      //   //마우스가 클릭됐다!! 라는것을 과일||폭탄에 알려줘야함
      //   fruit.notifyMouseMove(e.x, e.y); //마우스의 x y값을 전달해 줌
      // }
    }
  }
  MouseDownHandler(e) {
    //마우스 클릭 확인
    if (!this.gameInit) newlec.sound.update();
    this.prevMouseX = this.knifex;
    this.prevMouseY = this.knifey;
    this.knifex = e.x;
    this.knifey = e.y;
    this.slicingFruit = true;
  }

  MouseUpHandler(e) {
    //마우스 업 확인
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.knifes = [];
    this.slicingFruit = false;
  }

  MouseMoveHandler(e) {
    //마우스가 클릭 됐을 때 동작 할 부분
    if (this.slicingFruit) {
      this.prevMouseX = this.knifex;
      this.prevMouseY = this.knifey;
      this.knifex = e.x;
      this.knifey = e.y;

      this.startBtn.notifyClick(e.x, e.y);
      this.settingBtn.notifyClick(e.x, e.y);
      this.exitBtn.notifyClick(e.x, e.y);

      this.knifes.push({
        x: this.knifex,
        y: this.knifey,
        prevMouseX: this.prevMouseX,
        prevMouseY: this.prevMouseY,
      });
      // for (let fruit of this.fruits) {
      //   //마우스가 클릭됐다!! 라는것을 과일||폭탄에 알려줘야함
      //   fruit.notifyMouseMove(e.x, e.y); //마우스의 x y값을 전달해 줌
      // }
    }
  }
}
