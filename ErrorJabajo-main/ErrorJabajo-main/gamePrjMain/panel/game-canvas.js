import Fruit from "../item/fruit.js";
import Background from "../item/background.js";
import newlec from "../newlec.js";
import SlicedFruit from "../item/SlicedFruit.js";
import Score from "../item/score.js";
import Life from "../item/life.js";
import Button from "../item/button.js";

export default class GameCanvas {
  constructor() {
    // canvas 선언부
    this.dom = document.querySelector(".game-canvas");
    this.dom.focus();
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.dom.getContext("2d");
    this.bombEffectImg = document.querySelector("#bombEffect");
    this.fruits = []; // 과일|| 폭탄 담겨질 배열
    this.slicedFruits = [];

    this.background = new Background(); // 배경
    this.gameover = false; //게임 끝날 때
    this.frame = 1000 / 60; //게임 프레임
    this.score = new Score(); //점수 (객체로 놓는게 맞을까?)
    this.life = new Life(); // life 객체생성

    this.pauseButton = new Button();
    this.pause = false;

    this.fruitsAppearDelay = 60; //과일 출현 시간 조절

    //this.dom(Canvas)에 의한 마우스 이벤트
    this.dom.onmousedown = this.MouseDownHandler.bind(this);
    this.dom.onmouseup = this.MouseUpHandler.bind(this);
    this.dom.onmousemove = this.MouseMoveHandler.bind(this);
    this.dom.onmouseout = this.MouseOutHandler.bind(this);
    this.dom.onclick = this.pauseClickHander.bind(this);
    //게임 Canvas기준 Callback Fn구현
    this.on;

    //Knife 현재 수정중
    this.knifes = [];
    this.knifex = 0;
    this.knifey = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.slicingFruit = false;

    //연막
    this.bombEffect = false;
    //연막 초
    this.count =0;
    //전역객체
    newlec.maincanvas = this.dom; //canvas의 width&&height 값 누구라도 사용할 수 있게 접근하는거
    //객체 그릴 때, 캔버스가 기준으로 만들어 져야 합니다. Canvas의 Width 와 height값 사용해주세요.
  }

  //함수들
  run() {
    // if(this.pause) {
    //   this.togglePause;
    //   this.frame += 100000000;
    // }
    
    this.update();
    this.draw();
    this.renderKnife();
    window.setTimeout(() => {
      this.run();
    }, this.frame);
  }
  update() {
    //과일 조각 업데이트
    for (let fruit of this.slicedFruits) {
      fruit.update(this.ctx);
    }

    this.background.update();
    //과일|폭탄 업데이트
    for (let fruit of this.fruits) {
      fruit.update(); //다시 움직이고
    }
    //과일 || 폭탄 생성기
    this.fruitsAppearDelay--;
    if (this.fruitsAppearDelay == 0) {
      let number = Math.floor(Math.random() * 6);
      for (let many = 0; many < number; many++) {
        let randfruit = Math.floor(Math.random() * 5); // 0~5 까지 랜덤 생성 --> 0 폭탄 1234 과일
        let fruit = new Fruit(randfruit);
        fruit.onoutOfScreen = this.onFullFruitoutOfScreen.bind(this);
        fruit.onCollisionBomb = this.CollisionBombHandler.bind(this);
        fruit.onCollisionFruit = this.CollisionFruitHandler.bind(this);
        this.fruits.push(fruit);
      }
      this.fruitsAppearDelay = Math.floor(Math.random() * 30 + 20);
    }
    if(this.bombEffect){
        this.count++;
        if(this.count==180){
          this.bombEffect=false;
          this.count=0;
        }
      
    }
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

  draw() {
    if(this.bombEffect){
      this.ctx.save();
      let shakeX=Math.random()*10;
      let shakeY=Math.random()*10;
      this.ctx.translate(shakeX, shakeY);
      this.background.draw(this.ctx); //배경 그리기
      this.ctx.restore();
      
    }
    else
      this.background.draw(this.ctx); //배경 그리기

    //과일 조각 그리기
    for (let fruit of this.slicedFruits) {
      fruit.draw(this.ctx);
    }

    //과일 그리기
    for (let fruit of this.fruits) {
      fruit.draw(this.ctx);
    }
    if(this.bombEffect){
    this.ctx.drawImage(
      this.bombEffectImg
      ,0,0
    )

    }
    //점수 띄워주기
    this.score.draw(this.ctx);
    //목숨 띄어주기
    this.life.draw(this.ctx);
    // 일시정지 버튼 띄워주기
    this.pauseButton.draw(this.ctx);

  }

  togglePause() {
    //게임 일시정지
    if(!this.pause){
      this.pause = true;
    }
    else
      this.pause = false;
  }

  MouseDownHandler(e) {
    //마우스 클릭 확인
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
      this.knifes.push({
        x: this.knifex,
        y: this.knifey,
        prevMouseX: this.prevMouseX,
        prevMouseY: this.prevMouseY,
      });
      for (let fruit of this.fruits) {
        //마우스가 클릭됐다!! 라는것을 과일||폭탄에 알려줘야함
        fruit.notifyMouseMove(e.x, e.y); //마우스의 x y값을 전달해 줌
      }


    }
  }
  //마우스가 canvas를 나갔을 때 이벤트 아직 완벽하지 않아서 냅둘 예정
  MouseOutHandler(e) {
    // this.prevMouseX = 0
    // this.prevMouseY = 0;
    // this.knifes=[];
    // this.slicingFruit = false;
  }

  pauseClickHander(event) {
    this.pauseButton.checkOnClick(event.x, event.y);
    this.togglePause();
  }

  CollisionBombHandler(bomb) {
    //fruits.js 의 110~114에서 폭탄 / 과일 구분 합니다. 따로 구분 안지으셔도 됩니다.
    let idx = this.fruits.indexOf(bomb);
    this.fruits.splice(idx, 1);
    //Score 동작 함수 구현 필요
    this.score.notifyOnCollisionBoom(bomb);
    //Life 동작 함수 구현 필요
    this.life.update();
    this.bombEffect = true;

  }

  CollisionFruitHandler(fruit) {
    //이미지이름 문자열에서 문자열을 뽑은 후
    let imgName = fruit.imgName;
    //querySelector로 이미지 바꿔치기 하기 위해서 문자열을 조작 한 후
    //과일 2개 생성 하고
    let leftFruit = new SlicedFruit(
      fruit,
      imgName + "l",
      -Math.floor(Math.random() * 6)
    );
    let rightFruit = new SlicedFruit(
      fruit,
      imgName + "r",
      Math.floor(Math.random() * 6)
    );

    //화면 밖으로 나갈시 없애주는 이벤트 붙인 다음
    leftFruit.onoutOfScreen = this.onSlicedFruitOutOfScreenHandler.bind(this);
    rightFruit.onoutOfScreen = this.onSlicedFruitOutOfScreenHandler.bind(this);

    //canvas에서 관리 할 수 있도록 배열에 push한 후
    this.slicedFruits.push(leftFruit, rightFruit);

    /*Score의 점수 변하는곳 위치 (구현 필수)*/
    this.score.notifyOnCollisionFruit(fruit);
    //점수를 바꾸고

    //클릭된 과일(이벤트 발생 한)을 제거한다
    let idx = this.fruits.indexOf(fruit);
    this.fruits.splice(idx, 1);
  }

  onSlicedFruitOutOfScreenHandler(fruit) {
    // 조각난 과일 캔버스 나갈 때 제거하는 이벤트
    let idx = this.slicedFruits.indexOf(fruit);
    this.slicedFruits.splice(idx, 1);

  }
  onFullFruitoutOfScreen(fruit) {
    // 완전한 과일 캔버스 나갈 때 제거 하는 이벤트
    let idx = this.fruits.indexOf(fruit);
    this.fruits.splice(idx, 1);

  }
}
