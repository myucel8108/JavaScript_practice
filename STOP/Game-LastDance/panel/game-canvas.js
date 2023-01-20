import Fruit from "../item/fruit.js";
import Background from "../item/background.js";
import newlec from "../newlec.js";
import SlicedFruit from "../item/SlicedFruit.js";
import Score from "../item/score.js";
import Life from "../item/life.js";
import PauseButton from "../item/pauseButton.js";
import Gameover from "../item/GameOver.js";
import Clock from "../item/clock.js";

export default class GameCanvas {
  constructor() {
    // canvas 선언부
    this.dom = document.querySelector(".game-canvas");
    this.dom.focus();
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.dom.getContext("2d");

    this.bombEffectImg = document.querySelector("#bombEffect");

    //=========================================시계 선언
    this.clock = new Clock();
    this.timeoutID = null; //setTimeout 멈추기 위한 친구
    //=========================================실체(객체)
    this.fruits = []; // 과일|| 폭탄 담겨질 배열
    this.slicedFruits = []; // 잘린과일
    this.background = new Background(); // 배경
    this.pauseButton = new PauseButton();
    this.score = new Score(); //점수 (객체로 놓는게 맞을까?)
    this.life = new Life(); // life 객체생성
    this.gameover = null; //gameover 객체 생성 할 변수
    //게임시작시 gamestart
    this.gamestartImg = document.querySelector("#gamestart"); // 기능이 너무 작아서 별도로 빼지는x

    //=========================================캔버스 상태
    this.frame = 1000 / 60; //게임 프레임

    this.isgameover = false; // 캔버스의 gameover상태 설정
    this.isgameEnding = false;
    this.pause = false; //일시정지
    this.drawGameoverGUI = false; // 이거 없으면, continue창만 주구장창 계속 뜸
    this.isgamestart = false; //gamestart 띄우기 위한 상태변수
    this.delayUpdate = 150; //게임시작 텀 주기위한 변수
    this.musicStart = false;
    //=========================================canvas가 app.js로부터 받은 이벤트
    this.oncallNewGametoApp = null; // app.js에 Continue창에서 Yes를 눌렀다고 알려줄 함수
    this.clickedNoFromContinue = null; // app.js에 Continue창에서 No를 눌렀다고 알려줌
    this.fruitsAppearDelay = 60; //과일 출현 시간 조절

    //canvas가 다른 객체로 주는 이벤트 함수 (콜백FN)
    this.pauseButton.onClickedStop = this.pauseButtonHandler.bind(this);
    //1. 마우스 입력을 받기위한 이벤트들(좌표값을 받아오기위함)
    this.dom.onmousedown = this.MouseDownHandler.bind(this);
    this.dom.onmouseup = this.MouseUpHandler.bind(this);
    this.dom.onmousemove = this.MouseMoveHandler.bind(this);
    this.dom.onmouseout = this.MouseOutHandler.bind(this);
    //터치 이벤트

    this.dom.ontouchend = this.touchendHandler.bind(this);
    this.dom.ontouchmove = this.touchmoveHandler.bind(this);
    this.dom.ontouchstart = this.touchstartHandler.bind(this);

    //2. Gameover 됐는지 Life한테 물어보는 함수
    this.clock.onTimeLimit = this.cbGameoverHandler.bind(this);
    this.life.onCheckgameoverCallbackfn = this.cbGameoverHandler.bind(this);

    //칼 (Knife 현재 수정중) - 노건들
    this.knifes = [];
    this.knifex = 0;
    this.knifey = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.slicingFruit = false;
    //연막
    this.bombEffect = false;
    //연막 초
    this.count = 0;
    //전역객체 어떤 곳에서든 Canvas의 Height Width 속성을 사용하기 위해 싱글톤 객체로 넘김
    newlec.maincanvas = this.dom;
  }

  //함수들
  run() {
    if (this.puaseAndGotoMenu) {
      // console.log("이거 실행됨?");
      return;
    }
    if (this.isgameEnding) {
      newlec.score.push(this.score.scoreInfo);
      return;
    }
    if (!this.musicStart) {
      this.musicStart = true;
      newlec.sound.onGameSound.play();
    }
    // if (this.pause) {
    //   this.togglePause;
    //   this.frame += 100000000;
    // }
    this.draw();
    this.update();
    newlec.gameCanvasTimeoutID = window.setTimeout(() => {
      this.run();
    }, this.frame);
  }

  draw() {
    // console.log("gameCanvas실행");
    // if (!this.pause) if (newlec.sound.isOnGameSound) newlec.sound.onGameSound.play();
    // console.log(this.isgameover);
    //gamover 되면 일시 정지 돼야 하는것들 넣기
    // (여기 들어가면 게임 오버 될시,그리는것을 멈춤)
    if (this.bombEffect) {
      this.ctx.save();
      let shakeX = Math.random() * 10;
      let shakeY = Math.random() * 10;
      this.ctx.translate(shakeX, shakeY);
      this.background.draw(this.ctx); //배경 그리기

      this.ctx.restore();
    } else this.background.draw(this.ctx); //배경 그리기
    if (!this.isgameover) {
      this.renderKnife();

      //GAMESTART 이미지 3초 띄우기
      if (!this.isgamestart) {
        this.ctx.drawImage(
          this.gamestartImg,
          320,
          50,
          this.gamestartImg.width * 0.5,
          this.gamestartImg.height * 0.5
        );
      }
      setTimeout(() => {
        this.isgamestart = true;
      }, 2000);
      //폭탄

      //과일 조각 그리기
      for (let fruit of this.slicedFruits) {
        fruit.draw(this.ctx);
      }
      //과일 그리기
      for (let fruit of this.fruits) {
        fruit.draw(this.ctx);
      }
      // 일시정지 버튼 띄워주기
      this.pauseButton.draw(this.ctx);
      this.clock.draw(this.ctx);
    }
    //if (!this.isgameover) 끝
    //목숨 띄어주기
    this.life.draw(this.ctx);
    //점수 띄워주기
    this.score.draw(this.ctx);
    // && !this.drawGameoverGUI
    if (this.bombEffect) {
      this.ctx.drawImage(this.bombEffectImg, 0, 0);
      this.pauseButton.draw(this.ctx);
    }
    if (this.gameover) {
      // 화면 전환으로 음악 멈춤

      newlec.sound.onGameSound.pause();

      //게임 오버 됐을 때, 목숨 없는거 표현, gameover UI 띄우기
      this.drawGameoverGUI = true; //다 멈춰 있으니, 얜 한번만 그려주면 되는데 굳이 여러번 그릴 필요 없기 떄문
      this.gameover.draw(this.ctx); //gameover 띄우기
      // this.life.draw(this.ctx); //목숨 x 3개로 바꾸기
    }
  }
  update() {
    if (this.delayUpdate > 0) this.delayUpdate--;

    if (this.delayUpdate == 0) {
      // 게임이 정지되면 업데이트를 멈춘다
      if (this.pause) return;
      if (this.isgamestart) this.clock.update(this.gameover);
      //게임오버 됐을때, 아무도 프레임이 바뀔때마다 변화 못하게 만드는 if문
      this.background.update();
      if (!this.isgameover) {
        //과일 조각 업데이트
        for (let fruit of this.slicedFruits) {
          fruit.update(this.ctx);
        }
        //과일|폭탄 업데이트
        for (let fruit of this.fruits) {
          fruit.update(); //다시 움직이고
        }
        //과일 || 폭탄 생성기
        this.fruitsAppearDelay--;
        if (this.fruitsAppearDelay == 0) {
          let number = Math.floor(Math.random() * 6);
          for (let many = 0; many < number; many++) {
            //소리 연속재생용 초기화 - > 과일 생성
            newlec.sound.throwSound.currentTime = 0;
            newlec.sound.throwSound.play();

            let randfruit = Math.floor(Math.random() * 5); // 0~5 까지 랜덤 생성 --> 0 폭탄 1234 과일
            let fruit = new Fruit(randfruit);
            fruit.onoutOfScreen = this.onFullFruitoutOfScreen.bind(this);
            fruit.onCollisionBomb = this.CollisionBombHandler.bind(this);
            fruit.onCollisionFruit = this.CollisionFruitHandler.bind(this);
            this.fruits.push(fruit);
          }
          this.fruitsAppearDelay = Math.floor(Math.random() * 30 + 20);
        }

        //목숨 업데이트(추가된거)
        this.life.update();
      }
      if (this.gameover) {
        this.gameover.update();
      }
      //폭탄 이펙트 검사
      if (this.bombEffect) {
        this.count++;
        if (this.count == 180) {
          this.bombEffect = false;
          this.count = 0;
        }
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
    while (this.knifes.length > 5) {
      this.knifes.shift();
      this.knifes.shift();
    }
  }

  togglePause() {
    //게임 일시정지
    // newlec.sound.onGameSound.pause();
    this.pause = !this.pause;
    this.pause ? newlec.sound.onGameSound.pause() : newlec.sound.onGameSound.play();
  }
  
  MouseDownHandler(e) {
    //마우스 클릭 확인
    if (!this.pause) {
      this.prevMouseX = this.knifex;
      this.prevMouseY = this.knifey;
      this.knifex = e.x;
      this.knifey = e.y;
      this.slicingFruit = true;
    }

    //Gameover후, Yes No선택 여부 notify

    if (this.gameover) {
      this.gameover.notifyClcikedYesBtn(e.x, e.y);
      this.gameover.notifyClcikedNoBtn(e.x, e.y);
    }

    if (!this.gameover) this.pauseButton.onClick = this.togglePause.bind(this);
    else this.pauseButton.onClick = null;

    this.pauseButton.notifyOnClick(e.x, e.y);
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
      if (!this.isgameover) {
        for (let fruit of this.fruits) {
          //마우스가 클릭됐다!! 라는것을 과일||폭탄에 알려줘야함
          fruit.notifyMouseMove(e.x, e.y); //마우스의 x y값을 전달해 줌
        }
      }
    }

    if (this.gameover) this.gameover.notifyMouseMove(e.x, e.y);
  }
  //마우스가 canvas를 나갔을 때 이벤트 아직 완벽하지 않아서 냅둘 예정
  MouseOutHandler(e) {
    // this.prevMouseX = 0
    // this.prevMouseY = 0;
    // this.knifes=[];
    // this.slicingFruit = false;
  }

  CollisionBombHandler(bomb) {
    //소리 연속재생용 초기화 - 폭탄
    newlec.sound.boomSound.currentTime = 0;
    newlec.sound.boomSound.play();

    //폭탄에게 주는 핸들러 -> 폭탄 지우고 Score바꾸고 Life 바꾸고

    //폭탄 충돌 날시, 이미지 제거
    let idx = this.fruits.indexOf(bomb);
    this.fruits.splice(idx, 1);
    //점수 변경
    this.score.notifyOnCollisionBoom(bomb);
    //목숨 깎기
    this.life.decreaseLife();
    //폭탄 터질때 이미지, 효과등
    this.bombEffect = true;
  }

  CollisionFruitHandler(fruit) {
    //소리 연속재생용 초기화 - 과일
    newlec.sound.splatterSound.currentTime = 0;
    newlec.sound.splatterSound.play();

    this.score.setCutFruitInfo(fruit.getFruitInfo());

    //과일한테 주는 핸들러 => 과일 지우고 조각난 과일 2개 생성하고 화면 벗어날시 지워주는 이벤트 달아주고

    //이미지이름 문자열에서 문자열을 뽑은 후
    let imgName = fruit.imgName;
    //querySelector로 이미지 바꿔치기 하기 위해서 문자열을 조작

    //과일 2개 생성 하고
    let leftFruit = new SlicedFruit(fruit, imgName + "l", -Math.floor(Math.random() * 6));
    let rightFruit = new SlicedFruit(fruit, imgName + "r", Math.floor(Math.random() * 6));
    //화면 밖으로 나갈시 없애주는 이벤트 붙인 다음
    leftFruit.onoutOfScreen = this.onSlicedFruitOutOfScreenHandler.bind(this);
    rightFruit.onoutOfScreen = this.onSlicedFruitOutOfScreenHandler.bind(this);

    //canvas에서 관리 할 수 있도록 배열에 push한 후
    this.slicedFruits.push(leftFruit, rightFruit);

    //점수를 바꾸고
    this.score.notifyOnCollisionFruit(fruit);

    //클릭된 과일(이벤트 발생 한)을 제거한다
    let idx = this.fruits.indexOf(fruit);
    this.fruits.splice(idx, 1);

    //Score 동작 함수 구현 필요
    //과일 쪼개지는 기능 구현
  }

  onSlicedFruitOutOfScreenHandler(fruit) {
    // 조각난 과일 캔버스 나갈 때 제거하는 이벤트
    let idx = this.slicedFruits.indexOf(fruit);
    this.slicedFruits.splice(idx, 1);
    // console.log("제거됐다!");
  }
  onFullFruitoutOfScreen(fruit) {
    // 완전한 과일 캔버스 나갈 때 제거 하는 이벤트
    let idx = this.fruits.indexOf(fruit);
    this.fruits.splice(idx, 1);
    // console.log("제거됐다!");
  }

  cbGameoverHandler() {
    //cb = callback
    //Gameover 됐을 때, Continue 띄우는 콜백 함수

    //(X 이렇게 구현 안시킴)
    //gameover가 됐을 때, gameover클래스의 visible 속성을 true로 바꾼다.
    //캔버스의 draw / update 동작시, visible 속성이 true일때만 동작하게 만들기 위함.
    //추가 구현 마우스 클릭 이벤트에 notify 해주고 visible에 따라 이벤트가 동작하게 만들어야 함.

    //일줄 알았는데, Gameover가 생성 됐는지 안됐는 지에 따라(draw, update) 동작하게 만들면
    //  굳이 visible 속성이 필요가 없어짐
    // console.log("게임 터졌다!!!");
    this.isgameover = true; //draw update 제어하기 위해
    newlec.sound.onGameSound.pause(); // 이거 왜 안되지? Gameover 되면 떠야하는앤데?
    newlec.sound.endGameSound.play();
    this.gameover = new Gameover(); //여기서 Gameover 객체 생성함 이전까지 생성안됨

    this.gameover.onClickedYes = this.cbisClickedYes.bind(this); //Yes 버튼 눌렸을 때
    this.gameover.onClickedNo = this.cbisClickedNo.bind(this); // No 버튼 눌렸을 때
  }

  cbisClickedYes() {
    //게임 재시작
    newlec.sound.isOnGameSound = true;
    newlec.sound.onGameSound.currentTime = 0;

    //app.js 보고 gameCanvas 다시 만들라고 명령
    this.isgameEnding = true;
    if (this.oncallNewGametoApp) this.oncallNewGametoApp();
  }
  cbisClickedNo() {
    //메인메뉴로
    //app.js 보고 gamecanvas 다시 만들고 메인메뉴로 보내라고 명령
    this.isgameEnding = true;
    newlec.sound.homeSound.currentTime = 0;
    newlec.sound.homeSound.play();
    if (this.clickedNoFromContinue) this.clickedNoFromContinue();
  }

  pauseButtonHandler() {
    //일시정지 버튼에서 메인메뉴로 돌아가는 함수(랭킹 저장 x)
    this.puaseAndGotoMenu = true;
    newlec.sound.onGameSound.currentTime = 0;
    newlec.sound.homeSound.currentTime = 0;
    newlec.sound.isHomeSound = true;
    newlec.sound.homeSound.play();
    if (this.clickedNoFromContinue) this.clickedNoFromContinue();
  }
  touchstartHandler(e) {
    //마우스 클릭 확인
    console.log("터치가 되었다")
    if (!this.pause) {
      this.prevMouseX = this.knifex;
      this.prevMouseY = this.knifey;
      this.knifex =  e.touches[0].clientX - e.target.offsetLeft;
      this.knifey=e.touches[0].clientY - e.target.offsetTop + document.documentElement.scrollTop;
      this.slicingFruit = true;

      if (this.gameover) {
        this.gameover.notifyClcikedYesBtn( this.knifex, this.knifey);
        this.gameover.notifyClcikedNoBtn( this.knifex, this.knifey);
      }
  
      if (!this.gameover) this.pauseButton.onClick = this.togglePause.bind(this);
      else this.pauseButton.onClick = null;
      this.pauseButton.notifyOnClick( this.knifex, ethis.knifey);

    }

  }
  touchendHandler(e) {
    //마우스 업 확인
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.knifes = [];
    this.slicingFruit = false;
  }

  touchmoveHandler(e) {
    //마우스가 클릭 됐을 때 동작 할 부분
    if (this.slicingFruit) {
      this.prevMouseX = this.knifex;
      this.prevMouseY = this.knifey;
      this.knifex =  e.touches[0].clientX - e.target.offsetLeft;
      this.knifey=e.touches[0].clientY - e.target.offsetTop + document.documentElement.scrollTop;

      this.knifes.push({
        x: this.knifex,
        y: this.knifey,
        prevMouseX: this.prevMouseX,
        prevMouseY: this.prevMouseY,
      });
      for (let fruit of this.fruits) {
        //마우스가 클릭됐다!! 라는것을 과일||폭탄에 알려줘야함
        fruit.notifyMouseMove(this.knifex , this.knifey); //마우스의 x y값을 전달해 줌
      }
    }
  }


}
