function Box(){

}

Box.prototype = {
    test:function(x,y){
        console.log(this);
        console.log(x);
        console.log(y);
    }
};

var box1 = new Box();
box1.test();

var f1 = box1.test.bind(box1);
f1();



var obj = {kor:2};
obj.onload = box1.test;
obj.onload();

var n1 = {id:1, title:'hello'};

obj.onload();
obj.onload.call(n1);
obj.onload.apply(n1,['hi','okay']);

// //var img = this.document.querySelector("img");
    // var img = new Image();
    // img.src = "./image/boy.png";
    // img.onload = function(){
    //     //ctx.drawImage(img, 100,100);
    //     //ctx.drawImage(img, 100, 100, 106, 148.25);

    //     var ix = 1;
    //     var iy = 2;

    //     // 이건 이제 우리가 손대는 것이 아님.
    //     var sw = 106;
    //     var sh = 148.25;
    //     var sx = sw*ix; //sw*0, sw*1, sw*2
    //     var sy = sh*iy;

    //     ctx.drawImage(img, 
    //         sx,sy,sw,sh,
    //         200,100,106,148.25);
    // }
