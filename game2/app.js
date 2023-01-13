import GameCanvas from './panel/game-canvas.js';
import RankCanvas from './panel/rank-canvas.js';

window.addEventListener("load", function(){s
    const gameCanvas = new GameCanvas();
    gameCanvas.ongameOver = (e) =>{
        gameCanvas.dom.classList.add("d-none"); //클래스가 들어간 녀석들을 싹다 정리
        rankCanvas.dom.classList.remove("d-none");
    }
    gameCanvas.run();
    const rankCanvas = new RankCanvas();
    rankCanvas.run(); 
});