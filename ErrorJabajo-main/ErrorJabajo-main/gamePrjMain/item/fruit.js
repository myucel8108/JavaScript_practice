import newlec from "../newlec.js";

export default class fruit {
  #width;
  #height;
  constructor(randfruit) {
    //이미지의 이름을 문자열로 저장
    this.imgName =
      randfruit == 1
        ? "#apple"
        : randfruit == 2
        ? "#peach"
        : randfruit == 3
        ? "#basaha"
        : randfruit == 4
        ? "#sandia"
        : "#bomb";

    //이미지 불러오기 (이미지 이름 이용)
    this.img = document.querySelector(this.imgName);
    this.randfruit = randfruit; //어떤 과일인지 구분하기 위해서 선언

    //과일 || 폭탄의 위치
    this.x = Math.random() * 1200;
    this.y = 700;

    this.dirx = Math.round(Math.random());
    this.speed = Math.random() * 3 + 2; //과일의 스피드
    this.force = -this.speed * 4; //스피드와 반대방향으로 힘 생성??(수직항력)
    this.curForce = this.force; //이건 뭐지? (중력)
    //과일을 회전시키는 변수
    this.degree=5;
    //과일 별 스코어
    this.score =
      randfruit == 1
        ? 50
        : randfruit == 2
        ? 80
        : randfruit == 3
        ? 60
        : randfruit == 4
        ? 30
        : -300;

    //안쓰이는 변수들 (사용 안했음)
    this.centerx =this.width; //과일의 중심좌표를 알고싶으신듯
    this.centery= this.height;
    //과일 이미지의 width height를 알고 싶으신듯
    this.#height;
    this.#width; 
    this.onCollisionBomb = null;
    //score깎고 Life깎고 폭탄 사라지고

    this.onCollisionFruit = null;
    //score올리고 과일 2개로 쪼개고 과일 없어지고

    this.onoutOfScreen = null;
    //화면의 영역을 벗어 났을 때 제거하는 이벤트

    this.isCollision = false;
  }
  //이미지 폭과 높이 getter
  get width() {
    return this.img.width / 2;
  }
  get height() {
    return this.img.height / 2;
  }

  //상태를 변화하는 아이들
  update() {
    //과일이 캔버스영역에서 벗어났을 때 없어져야함
    if (this.y > newlec.maincanvas.height + 200)
      if (this.onoutOfScreen != null) this.onoutOfScreen(this);

    if (this.dirx) {
      // dirx는 0 또는 1 만 나옴 => 오른쪽 왼쪽 지맘대로 감
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }
    /*
    y => 좌표
    curForce => 속도
    0.5 => 가속도(힘)
    */
    this.y += this.curForce += 0.3;
    if(this.degree==60)
      this.degree=0;
    this.degree+=0.05;

    this.bombEffects = this.bombEffects;
  }
  draw(ctx) {
    //과일 정 중앙 배치를 위한 코드
    //과일의 영역 확인
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.img.width / 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.degree);
    ctx.translate(-this.x,-this.y);
    //과일 이미지 그리기
    ctx.drawImage(
      this.img,
      this.x - this.img.width / 2,
      this.y - this.img.height / 2
    );
    if(this.bombEffects){
    ctx.drawImage(
      this.img,
      this.x - this.bombEffectsImg.width / 2,
      this.y - this.bombEffectsImg.height / 2
    );
    }
    console.log(this.bombEffects);
    ctx.restore();
  }

  //충돌 검사 (canvas에서 마우스 좌표 받아온다)
  notifyMouseMove(mouseX, mouseY) {
    this.mouseX= mouseX;
    this.mouseY=mouseY;
    let objX = this.x;
    let objY = this.y;
    let d = Math.sqrt((objX - mouseX) ** 2 + (objY - mouseY) ** 2);
    //충돌이 됐다는걸 알려주는건 한번만 알려주게 만들기위해 isCollision 변수로 상태 제어
    //이게 없으면 뭔가와 충돌할 시 점수와 목숨이 미친듯이 깎이거나 오르기 때문에 필수일거라 생각했습니다.
    if (d < this.img.width / 2 && !this.isCollision) {

      this.isCollision = true;
      if (this.randfruit == 0){
        // randfruit ==0 은 폭탄
        //내가 충돌이 났으면?
        this.onCollisionBomb(this); 
      }//폭탄 이벤트

      else this.onCollisionFruit(this); //과일 이벤트
    }
  }
}
