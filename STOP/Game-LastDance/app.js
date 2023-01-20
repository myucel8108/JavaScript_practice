import Gamecanvas from "./panel/game-canvas.js";
import newlec from "./newlec.js";
import HomeCanvas from "./panel/home-canvas.js";
import SettingCanvas from "./panel/setting-canvas.js";
import Sound from "./item/sound.js";

window.addEventListener("load", function () {
  newlec.sound = new Sound();

  let autoplayVideoInterval = setInterval(autoplayVideo, 200);
  function autoplayVideo() {
    var promise = newlec.sound.homeSound.play();
    if (promise !== undefined) {
      promise
        .then(function (_) {
          // Autoplay started!

          console.log("이거실행됨?");
          clearInterval(autoplayVideoInterval);
        })
        .catch(function (error) {
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
        });
    }
  }

  newlec.homecanvas = new HomeCanvas();
  newlec.homecanvas.run();

  newlec.gamecanvas = new Gamecanvas();
  newlec.gamecanvas.oncallNewGametoApp = continueToClickedYesHandler;
  newlec.gamecanvas.clickedNoFromContinue = clickedNoFromContinue;

  newlec.settingcanvas = new SettingCanvas();

  newlec.homecanvas.onstartGame = () => {
    newlec.homecanvas.dom.classList.add("d-none"); //  homecanvas.dom <- this 의미
    newlec.gamecanvas.run();
    newlec.gamecanvas.dom.classList.remove("d-none");
  };

  newlec.homecanvas.onExit = () => {
    //콜백함수 부여
    // this.window.location.href = "https://www.youtube.com/@newlec1";
        window.location.replace("https://www.youtube.com/@newlec1");
  };

  newlec.homecanvas.onSetting = () => {
    newlec.homecanvas.dom.classList.add("d-none");
    newlec.settingcanvas.dom.classList.remove("d-none");
    newlec.score.sort(function (b, a) {
      return a.totalScore - b.totalScore;
    });
    newlec.settingcanvas.isFrameStop = false;

    newlec.settingcanvas.run();
  };

  newlec.settingcanvas.onGoHome = () => {
    newlec.settingcanvas.dom.classList.add("d-none");
    newlec.homecanvas.dom.classList.remove("d-none");
    newlec.homecanvas.isFrameStop = false;
    newlec.homecanvas.run();
  };
});

//gameover를 주면, 기존의 캔버스를 버리고 새로운 캔버스 등록(가비지 컬렉션에 의해 자동 제거 이용)
//함수로 뺀 이유, gamecanvas가 지워지고 다시 생기기 떄문에 일회성으로 사용 할 수 없기 때문
//game 결과 스코어를 받진 않음 매개변수로 받아오면 될듯??
function continueToClickedYesHandler() {
  newlec.gamecanvas = new Gamecanvas();
  newlec.gamecanvas.oncallNewGametoApp = continueToClickedYesHandler;
  newlec.gamecanvas.clickedNoFromContinue = clickedNoFromContinue;
  newlec.gamecanvas.run();
}

function clickedNoFromContinue() {
  //메인으로 돌아감
  newlec.gamecanvas = new Gamecanvas();
  newlec.gamecanvas.oncallNewGametoApp = continueToClickedYesHandler;
  newlec.gamecanvas.clickedNoFromContinue = clickedNoFromContinue;
  newlec.gamecanvas.dom.classList.add("d-none");
  newlec.homecanvas.dom.classList.remove("d-none");
  newlec.homecanvas.isFrameStop = false;
  newlec.homecanvas.run();
}
