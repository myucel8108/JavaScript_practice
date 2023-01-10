
//초기변수

    var context; 

    var velocity; 

    var angle; 

    var ballv;

    var ballvx; 

    var ballvy; 

    var ballX = 10; 

    var ballY = 250; 

    var ballRadius = 10;

    var score = 0;

    var timer;




        //공

        function drawBall() {

        context.beginPath();

        context.arc(ballX,ballY,ballRadius,0,2.0*Math.PI,true);

        context.fillStyle="yello";

        context.fill();

        }



        /* html실행시 초기화 */

        function init(){

        ballX = 10;

        ballY = 250;

        ballRadius = 10;

        context = document.getElementById('canvas').getContext('2d');

        draw();

        }

 

        //발사버튼

        function start() {

            init();

            velocity = Number(document.getElementById("velocity").value);

            angle = Number(document.getElementById("angle").value);

            var angleR = angle * Math.PI / 180;

 

            ballvx = velocity * Math.cos(angleR);

            ballvy = -velocity * Math.tan(angleR);

 

                draw();

 

            timer = setInterval(calculate,100);

            return false;

        }

 

        //공의값 계산

        function calculate() {

            //중력 가속도

            ballvy = ballvy + 1.98;

            ballX = ballX + ballvx;

            ballY = ballY + ballvy;

 

                draw();

       }

 