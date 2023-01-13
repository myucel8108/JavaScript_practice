export default class ConfirmDlg{
    constructor(){
        this.x = 100;
        this.y = 100;
        this.width = 400;
        this.height = 200;
        this.isVisible = false;
        this.onContinue = false;
        this.onEnd = false;
        this.btnYes ={
            x:70,
            y:100,
            width:100,
            height:50,
            label:"Yes"
        };        
        this.btnNo ={
            x:230,
            y:100,
            width:100,
            height:50,
            label:"No"
        };
        this.onclick =null;

    }

    notifyClick(x,y){
        //자식이 있다면 그 자식에게도 이 이벤트를 통지해야한다.
        if((this.x < x && x< this.x+this.width)&&(this.y < y && y<this.y+this.height)){
        if(this.onclick)
            this.onclick(3);// 1을 받으면 DLG 2는 Yes 3은 NO
        }
    }


    show(){
        this.isVisible = true;
    }

    update(){

    }
    
    //윈도우로써 사용자입력 이벤트를 수신하기 위한 함수
    draw(ctx){
        if(!this.isVisible)
            return;

        let {x, y} = this;
        
        // 흰색 배경에
        ctx.fillStyle = '#FFF5';
        ctx.fillRect(x,y,this.width, this.height);

        // 검은색 테두리
        ctx.fillStyle = '#000';
        ctx.strokeRect(x, y,this.width, this.height);

        ctx.fillStyle = 'black'
        ctx.font = 'bold 48px serif'
        ctx.fillText('Continue?', this.width/2, y+70);

        let btns = [this.btnYes, this.btnNo];
        for(let btn of btns){
            let {x,y,width:w,height:h, label} =btn;
            ctx.fillStyle = 'gray';
            ctx.fillRect(this.x+x, this.y+y, w, h);
            ctx.fillStyle = 'black';
            ctx.strokeRect(this.x+x, this.y+y, w, h);
            ctx.font = 'bold 30px serif'
            ctx.fillText(label,this.x+x+20,this.y+135);
        }
    }
}