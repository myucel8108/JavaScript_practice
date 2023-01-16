import Gamecanvas from "./panel/game-canvas.js";

window.addEventListener("load", function () {
  const gamecanvas = new Gamecanvas();
  gamecanvas.run();
});
