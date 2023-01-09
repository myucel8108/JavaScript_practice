import bbb,{test1} from './module2.js'; //default선언이 안되어 있으면 사용할 수 없음
import aaa,{test1 as test3 ,Exam , exam2} from './module1.js'; //test1이라는 애를 test3라는 이름으로
//aaa,{test1} defalut는 aaa라는 함수의 이름으로 쓰고 {}는 디폴트가 아닌 함수들이나 클래스의 이름을 적어서 사용한다.
//aaa(); //이름이 다르다고 해도 default라고 되어 있는애를 기본으로 가져옴
aaa();
test1();
bbb();
//두 test1을 동시에 못쓰나?-> 당연히 에러발생
test3();
let exam1 = new Exam();
console.log(exam1);
console.log(exam2);


//싱글톤 그 누구도 하나로만 쓰고 절대 객체에 속성을 건들이지 않는 것
/*getter setter 
캡슐화 3가지
모듈화
스크립트가 스크립트를 필요한데 왜 html이 필요한가?
자바스크립트는 모듈화라는 개념이 없었지만 추가했다!


2가지의 개념
1.import하는 것
2.import하기전에는 다른 파일에 영향을 주지않는 고립화!!
html에 다 가져오면 고립화가 깨짐!!

새로운 모듈화!

export의 등장 

<script type="module" src="app.js"></script> -> 모듈화

export default 함수의 명명: 기본 노출객체에대한 이름은 마음대로 정할 수 있다.
*/