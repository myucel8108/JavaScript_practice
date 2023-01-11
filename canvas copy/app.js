import  GameCanvas  from "./panel/game-canvas.js";
import newlec from "./newlec.js";
window.addEventListener("load" ,function(){

    const gamecanvas = new GameCanvas();
    gamecanvas.run();

    newlec.x++;
    console.log("x:"+newlec.x);
    //ui스레드는 건들이지않고 무한루프!
});