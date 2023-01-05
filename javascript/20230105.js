/*object뿐만이 아닌 배열도 뽀갤수있다
Array Destructuring
*/
//Array Destructuring
let kors = [10,20,30];
let [kor1,kor2,kor3]= kors;
//console.log(kor1);
//console.log(kor2);
//console.log(kor3);
let kors2 = [40,70,30];
//기존변수에 대입하는법 밑에 방식은 지역변수가 이미 선언되어있는것과 마찬가지임
//let [kor1,kor2,kor3] =kors2;
//그래서 let을 빼고 하면된다.
[kor1,kor2,kor3] =kors2;
//console.log(kor1);
//console.log(kor2);
//console.log(kor3);

//중첩상태의 객체는 어떻게 꺼낼 것인지
let exam ={
    kor:10,
    eng:20,
    math:30,
    student:{
        name:'newlec',
        phone:'010-7278-1537'
    }

};

let {kor, eng:english, ma=100, student:{name,phone}}= exam;
//console.log(kor);
//console.log(phone);
//console.log(ma);
//console.log("-------------------------")
let std1={name :'dragon',phone:'010'};

//SyntaxError: Unexpected token '=' 발생
({name , phone} = std1);
//console.log(name,phone);
//이유는 Declaration or statement expected.선언이나 문장이 완벽했으면 좋겠다라는 의미 배열은 완전한 문장이 아니였는데 객체만 완전한 문장이 아니라고 하는 이유는?
let a,b;
[a,b] = kors2;
//console.log(a);
//console.log("---------------------------")
//변수를 바꿀때는 배열로 만들어주고 뽀개기에 들어가면 훨신 쉽다.
a=20;
b=30;
//console.log(a);
//console.log(b);
[a,b]=[b,a];
//console.log(a);
//console.log(b);
//자바스크립트는 문장을 식별하는키워드가 내려쓰기와 키워드
//자바스크립트는 한 문장이 "완벽해야만" 내려쓰기로 식별할 수 있다. 
//kor3 변수만 Destructuring을 해보고 싶을때
[,,kor3]=kors;
//console.log(kor3);
//배열을 뽀겔때 변수와 배열로 나눠서 뽀개보자
let nums=[1,2,3,4,5,6,7,8,9,0];
let [n1,n2,...rest] =nums;
//console.log(rest);
//중간에 옮기는건 불가능! 왜냐하면 나머지가 아니기때문에
//[n1,...rest,n2] =nums;
//Set
//자바스크립트 es6의 컬렉션다운 컬렉션의 등장!
//다른 언어의 컬렉션-Set,List(배열!),Map->추가삭제가 가능
//3가지의 차이점 Set은 값이 곧 "키"->저장할때키가 //구현되지않음->값=키 그래서 단독적으로 꺼내지 못한다.
//단 값이 중복되지 않는것이 장점이다!
let set= new Set();
// set.add(5);
// set.add("5");
// set.add(2);
// set.add("2");
// console.log(set.size); //4개만 나온다.


set.add(5);
set.add("5");
set.add(2);
set.add(2);
console.log(set.size); //3개만나온다.
//-> 중복되지 않는 값만 나오니깐 로또번호같은거에 활용가능!
//for of를 써보자
let set2 =new Set([2,3,4,5,6,3,4,1]);
// set2.add(5);
// set2.add("5");
// set2.add(2);
// set2.add(5);
for (let n of set2){
    console.log(n)
}
//Set안에 값을 확인하는법
console.log(set.has(1));
//값 제거하기
//delete() 안에 값만 제거
//clear 싹다제거
// 과거의 반복적인 작업을 할 때 사용했던 방법forEach를 사용했었는데 이를 줄이기위해 for-of가 나옴
set.forEach((v,k)=>{
    console.log(`Key: ${k}   value : ${v}`);
});
console.log("-------------")
//키를 꺼낼 수 있는 for in은 ?사용할수없다.
for (let n in set2){
    console.log(n)
}
//WeakSet set객체와 달리 열거확인x 개수확인 불가능
//중복을 제거되었는지만 확인할 수 있지만 메모리를 적게 먹는다
//Map 키와 값을 명시화시켜주는 Map!
let map = new Map();
map.set("id",1);
map.set("title","map이란?");

console.log("foreach=========");
map.forEach(function(v,k){
    console.log(`Key: ${k}   value : ${v}`);
});
console.log("foreach=========");
//Object는 키값으로 문자열만 가질 수 있지만, Map은 키로 모든 데이터 타입을 가질 수 있다. Map은 순서를 보장한다.
let notice = new Map();
notice.set("id",1);
notice.set("title","나 너무 졸려..");
notice.set("writer","LDH");
//속성을 묶어서 쓰는게 기본데이터단위인데묶여져있는 클래스 단위지만 한번만 이 구조를 쓸때는 일시적 데이터 집합인 Map을 사용한다.
console.log(notice.get("title"));
for(let key of notice.keys()){
    //.keys는 키만 꺼내주는 Set이다
    console.log(key);
}
for(let v of notice.values()){
    //value는 키만 꺼내주는 Set이다
    console.log(` value ${v}`);
}

for(let [k,v] of notice.entries()){
    //entries는 둘다 같이 꺼내준다.
    console.log(`${k}, ${v}`);
}

for(let n of notice){
    //entries는 둘다 같이 꺼내준다.
    console.log(`${n[1]}`);
}

//타입에러가 발생한다:TypeError: exam3 is not iterable
let exam3= {
    kor:10,
    eng:20,
    math:30
};

// for(let v of exam3)
//     console.log(v);

for(let v of Object.entries(exam3))
    console.log(v);
//object 사용해보기 오브젝트의 스태틱메서드를 이용하는것!
let obj = Object.create(null);

//map->입력받을때와 나갈때 다른 데이터로 변환해주는 map이라는것이 있음!
let list =[
{id:1, title:"jsp.is.." , writerId:"newlec"},
{id:1, title:"java.is.." , writerId:"newlec"},
{id:1, title:"javaScript.is.." , writerId:"newlec"},
{id:1, title:"spring.is.." , writerId:"newlec"}
];
list.forEach((n)=>{});
let ar = list.map((n)=>{return `<span>${n.title}<span>`}); //n에서 title만 꺼내서 배열을 만들어짐
console.log(ar+"메롱~");