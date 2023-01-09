export  function test(){
console.log("module1 test");

}
export  function test1(){
    console.log("module1. test11234");
    
    }
    //클래스
export class Exam{
    constructor(){
        this.kor=1;
        this.eng=2;
        this.math=1;
    }
}
export let exam2 = new Exam(); //객체는 default로만 가능