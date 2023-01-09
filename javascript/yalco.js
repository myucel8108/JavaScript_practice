let y = 25;

console.log(
    y **= 0.5, // 할당된 결과 반환
    y
);
//DOM
/*
브라우저를 이용할때는 API를 이용해서 도움을 받자
Document Object
Cascading Style Sheets
Graphics and Media
Web Application API
Internet Platform API
등이 있다.
윈도우 형태 어플리케이션을 만들어주는 도구

Window:브라우저를 이용할 수 있게 틀(frame)을 제공해주는 객체
window.document: 사용자가 마우스나 키보드로 입력할 수 있는 위치를 관리하는 객체
                    body,img,input태그들은 메모리로 올라가는데 메모리에 올라간 객체로 사용자에게 입력과 출력을 확인하고 적용해줄 수 있다.

window 객체의 Members:사용자와 상호작용을 위한 기본 도구
대화상자를 이용한 출력 

alert: 단순하게 출력만 하는 역할
->window.alert(); //window라는 전역객체는 생략이 가능하다.

prompt:사용자에 입력을 받을수 있는 역할
prompt("x 값을 입력하세요",0); -> 프롬프트에 x 값을 입력하세요라는 문구가 뜨고 기본값을 0으로 지정해준 것과 같다.
단 모든 플랫폼에서 사용자 입력은 문자열로 들어오기 때문에 숫자를 사용하고 싶으면 자료형을 바꿔야한다.

confirm:사용자에게 확인을 위한 역할
confirm();-> yes or no 2가지의 버튼이 있어서 true와 false값으로 나눌 수 있다.


PS:프로그램을 만들때 문자열을 숫자로 바꾸거나 하는 기능, 컬렉션(Map Set List)은 플랫폼 기능일까 언어가 제공하는 기능일까..?-> 언어가 가지고 있는 기능이다!
이유는 메모리와 CPU만으로도 할 수 있는 기능이기 때문에 

데이터 형식 변환하기

String을 Number로
x = parseInt(x); 
parseInt("12abc");
->12가 나온다 즉 숫자로 변환되지 않는 부분은 전부 버리는 방식을 사용한다.

이벤트 기반에 윈도우 프로그래밍
스크립트 코드 영역을 만드는 방식-> 페이지가 읽혀질 떄 실행
모든 태그 안에 onxxx라는 이벤트를 발생시켜주는 방식-> 이벤트가 발생할 때 실행
    <div onclick="alert("클릭했구나");"> 이렇게 작성하게 된다면 에러가 발생하기 때문에 신중하게 만들어야한다.


스크립트 코드를 따로 빼고 html과 연동시켜주는 방식

BOM: BOM(브라우저 객체 모델) 은 브라우저와 컴퓨터 스크린에 접근 할 수 있는 객체의 모음.
window 객체를 통해 접근 가능


CSSOM:

Cascading Style Sheets:

Graphics and Media:
 
Web Application API:
 
Internet Platform API:

*/