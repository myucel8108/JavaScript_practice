import  GameCanvas  from "./panel/game-canvas.js";

window.addEventListener("load" ,function(){

    const gamecanvas = new GameCanvas();
    gamecanvas.run();
    //ui스레드는 건들이지않고 무한루프!
});