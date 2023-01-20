import newlec from "../newlec.js";
export default class PauseButton {
  constructor() {
    this.sprite = document.querySelector("#pause-button-sprite");

    this.spriteX = 180;
    this.spriteY = 343; // 0: resume button, 1: pause button

    this.imageWidth = 64;
    this.imageHeight = 64;

    this.buttonX = 1180;
    this.buttonY = 30;

    this.buttonWidth = 64; // 64px
    this.buttonHeight = 64; // 64px

    this.pauseMenu = {
      source: this.sprite,
      sourceX: 242,
      sourceY: 16,
      sourceWidth: 306,
      sourceHeight: 316,
      destinatonX: 487,
      destinationY: 202,
      destinationWidth: 306,
      destinationHeight: 316,
    };

    this.onClick = null;
    this.onClickedStop = null;
    this.pause = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      this.spriteX,
      this.spriteY,
      this.imageWidth,
      this.imageHeight,
      this.buttonX,
      this.buttonY,
      this.buttonWidth,
      this.buttonHeight
    );

    if (this.spriteX == 116) this.drawMenu(ctx);
  }

  drawMenu(ctx) {
    const {
      source: image,
      sourceX: sx,
      sourceY: sy,
      sourceWidth: sw,
      sourceHeight: sh,
      destinatonX: dx,
      destinationY: dy,
      destinationWidth: dw,
      destinationHeight: dh,
    } = this.pauseMenu;

    ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  notifyOnClick(x, y) {
    const centerX = this.buttonX + this.buttonWidth / 2 + 8; // 8: body margin
    const centerY = this.buttonY + this.buttonHeight / 2 + 8;
    const distance = Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2));

    if (distance < this.buttonWidth / 2 && this.onClick) {
      newlec.sound.onGameSound.pause();

      if (this.spriteX != 180) {
        this.spriteX += 64;
        this.buttonX -= 3;
        this.pause = false;
      } else {
        this.spriteX -= 64;
        this.buttonX += 3;
        this.pause = true;
      }
      
      this.onClick();
    }

    if (585 < x && x < 696 && 301 < y && y < 351 && this.pause && this.onClick) {
      this.pause = false;
      this.spriteX += 64;
      this.buttonX -= 3;
      this.onClick();
    }

    if (512 < x && x < 732 && 397 < y && y < 443 && this.pause && this.onClick)
      if (this.onClickedStop) this.onClickedStop();
  }
}
