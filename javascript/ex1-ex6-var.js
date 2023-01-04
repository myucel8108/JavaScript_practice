for(var i=0; i<10; i++){

}
console.log(i);

// for(let j=0;j<10;j++){

// }
// console.log(j);


//Template String
let year =2023;
let month =1;
let day =4;
//기존의 방식
let regdate= year+"-"+month+"-"+day;
console.log(regdate);
//es6의 방식
let Template = `${year}-${month}-${day}`;
console.log(Template);
// let procuct ="<section calss ="p-elect">";//따옴표안에 큰따옴표가 계속 발생하게 되고 이런 오류가 날 수 있다.

// 방식1. let procuct ="<section calss =\"p-elect\">";
// 방식2. let procuct ='<section calss ="p-elect">';
// //이러한 방식들도 해결안되는 문제가 있다.
// let procuct = '<section calss =\"p-elect\">'
//                 <h1>?</h1>
//                 </section>;
// 해결방법1.let procuct ='<section calss =\"p-elect\">'+
//                 <h1>?</h1>+
//                 </section>;
// 해결방법2.let procuct ='<section calss =\"p-elect\">'\
//                 <h1>?</h1>\
//                 </section> ;
// 해결방법3. let procuct =`<section calss =\"p-elect\">'
//                         <h1>?</h1>
//                         </section> `;

let className = 'p-elect';
let title= '스마트폰'


//제일 완벽한 방법
let product2 =  String.raw`<section calss =${className}>\n\n\n
                <h1>${title}</h1>
                </section> `   ;        

console.log(product2);


// var exam ={
// kor:10,
// eng:20,
// math:30
// };

// console.log(exam.kor);

// console.log(`kor:${exam.kor}`);

// let attrName = "kor";


// var exam ={
//     [attrName]:10,
//     eng:20,
//     math:30
//     };

//     console.log(`kor:${exam.kor}`);

// let kor1 = exam.kor; //하수
// let {kor,english} = exam; //단변수명만 같게!
// console.log(kor,english);
// //다른 변수명을 쓰고 싶다면?
// let {kor:kor11 ,eng: eng22}= exam;
// console.log(kor11, eng22);

let exam ={
    kor:10,
    eng:20,
    math:30,
    student:{
        name:'newlec',
        phone:'010-7278-1537'
    }

};
//중첩상태의 객체는 어떻게 꺼낼 것인지
let {kor, eng:english, ma=100, student:{name,phone}}= exam;
console.log(kor);
console.log(phone);
console.log(ma);