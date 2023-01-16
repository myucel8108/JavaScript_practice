export default class Button {
  constructor() {
    this.sprite = document.querySelector("#pause-button-sprite");

    this.spriteX = 1;
    this.spriteY = 1;

    this.imageWidth = this.sprite.width / 2; // 256
    this.imageHeight = this.sprite.width / 2; // 256

    this.buttonX = 1180;
    this.buttonY = 30;

    this.buttonWidth = this.imageWidth / 4; // 64px
    this.buttonHeight = this.imageHeight / 4; // 64px

    this.onclick; // callback function

    this.isVisible = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      this.spriteX * this.imageWidth,
      this.spriteY * this.imageHeight,
      this.imageWidth,
      this.imageHeight,
      this.buttonX,
      this.buttonY,
      this.buttonWidth,
      this.buttonHeight
    );

    if (!this.isVisible) return;

    ctx.fillStyle = "white";
    ctx.fillRect(400, 260, 500, 200);

    ctx.fillStyle = "black";
    ctx.font = "bold 128px serif";
    ctx.fillText("PAUSE", 450, 400);
  }

  update() {
    this.spriteY = (this.spriteY + 1) % 2; // change button
  }

  checkOnClick(x, y) {
    const centerX = this.buttonX + this.buttonWidth / 2 + 8; // 8: body margin
    const centerY = this.buttonY + this.buttonHeight / 2 + 8;
    const distance = Math.sqrt(
      Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2)
    );

    if (distance < this.buttonWidth / 2 && this.spriteY == 1) {
      this.update();
      //this.isVisible = true;
      // this.onclick();
      return;
    } else {
      this.update();
      //this.isVisible = false;
      // this.onclick();
    }
  }
}
