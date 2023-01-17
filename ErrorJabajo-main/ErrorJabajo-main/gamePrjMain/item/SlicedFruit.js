import newlec from "../newlec.js";
export default class SlicedFruit {
  constructor(mainFruit, imgName, randomAccessSpeed) {
    //xy 좌표
    this.x = mainFruit.x;
    this.y = mainFruit.y;
    //뒤에 과일 자른 흔적위치를 고정시킬 변수
    this.SlicedFruitCrushx = mainFruit.x;
    this.SlicedFruitCrushy = mainFruit.y;
    //fruit.js에 과일 좌표
    this.mainFruitX= mainFruit.x;
    this.mainFruitY= mainFruit.y;
    //마우스 좌표
    this.mouseX =mainFruit.mouseX;
    this.mouseY= mainFruit.mouseY;
    //각도 계산
    this.dx= -this.mouseX+this.x;
    this.dy=-this.mouseY+this.y;
    this.theta=Math.atan2(this.dx, this.dy);
    this.theta *= 180/ Math.PI;
    //x속도 물려받기
    if (mainFruit.dirx) {
      // dirx는 0 또는 1 만 나옴 => 오른쪽 왼쪽 지맘대로 감
      this.vx = -mainFruit.speed + randomAccessSpeed;
    } else {
      this.vx = mainFruit.speed + randomAccessSpeed;
    }
    //y속도 물려받기
    this.vy = mainFruit.curForce - Math.floor(Math.random() * 3);
    //이미지 이름 받고
    this.imgname = imgName;
    //이미지 불러오고
    this.imgDom = document.querySelector(this.imgname);
    //과즙 이미지
    this.imgCrushname=this.imgname.slice(0, -1)+"s";
    this.imgCrush= document.querySelector(this.imgCrushname);
    //잘라진애들도 뱅글뱅글
    this.degree =0;

    //과일의 중력 똑같이 받아오고 (fruit this.y바꾸는 상수와 같은 값으로 움직여야함
    //fruit.js 90번 줄 0.3값과 똑같은 값이어야함)
    this.gravity = -0.3; //event 객체의 속도와 동일한 속도로 움직인다.
    //과일 나가는거 확인하는 CallbackFN
    this.onoutOfScreen = null;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x,  this.y);
    ctx.rotate((this.theta)+135);
    ctx.translate(-this.x,-this.y);
    ctx.drawImage(
      this.imgDom,
      this.x - this.imgDom.width / 2,
      this.y - this.imgDom.height / 2
    );
    ctx.restore();
    ctx.drawImage(  
      this.imgCrush,
      this.mainFruitX - this.imgCrush.width/2,
      this.mainFruitY - this.imgCrush.height/2,
    )

}

  
  //상태 바꾸기
  update() {
    if (this.y > newlec.maincanvas.height + 200)
    if (this.onoutOfScreen != null) this.onoutOfScreen(this);
    this.x += this.vx;
    this.vy -= this.gravity;
    
    this.y += this.vy;
    this.theta=Math.atan2(this.dx, this.dy);
    this.theta *= 180/ Math.PI;
    console.log(this.theta);

    
    // if(this.theta<360){
    //   this.theta=0;}
    //   this.theta+=0.5;
    

}

}
