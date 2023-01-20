class Context {
  constructor() {
    //gameCanvas의 Canvas DOM 참조 (gameCanvas의 크기를 ***DOM*** 캔버스 객체가 아님!!!!!))
    this.maincanvas = null; //Fruits Ninja Main Canvas 넘기기

    //-------------------------------------------------
    this.gamecanvas = null; //게임 켄버스 객체
    this.gameCanvasTimeoutID = null;
    this.homecanvas = null; //홈 켄버스 객체
    this.homeCanvasTimeoutID = null;
    this.settingcanvas = null; //셋팅 켄버스 객체
    this.settingCanvasTimeoutID = null;
    this.sound = null;

    this.score = [
      {
        totalScore: 0,
        cutFruitInfo: [0, 0, 0, 0], //apple peach basaha sandia
      },
      {
        totalScore: 0,
        cutFruitInfo: [0, 0, 0, 0], //apple peach basaha sandia
      },
      {
        totalScore: 0,
        cutFruitInfo: [0, 0, 0, 0], //apple peach basaha sandia
      }
    ]; // 게임 결과 종합 Score객체가 저장됨
  }
}

export default new Context(); //객체를 보낼때 x의 값만 보내주면
