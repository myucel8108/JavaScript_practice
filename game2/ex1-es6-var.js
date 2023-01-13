let year = 2023;
let month = 1;
let day = 4;

let regdate = year+"-"+month+"-"+day;
console.log(regdate);

let template = `${year}-${month}-${day}`;
console.log(template);

let className = 'p-elect';
let title = '스마트 폰';

let product = String.raw`<section class="${className}">\n\n\n
                <h1>${title}</h1>
               </section>`;

console.log(product);

let attName = "kor";

let exam = {
    [attName]:10,
    eng:20,
    math:30,
    student:{
        name:'newlec',
        phone:'010-2222-3333'
    }
};

console.log(`kor:${exam.kor}`);

let {kor, eng:english, ma=0, student} = exam;
let {name, phone} = student;

console.log(kor);
console.log(english);
console.log(phone);

let std1 = {name:'dragon', phone:'010'};
({name, phone} = std1);
console.log(phone);


let kors = [1,2,3];
let[kor1, kor2, kor3] = kors;
console.log(kor1);

let kors2 = [2,3,4];
[kor1, kor2, kor3] = kors2;
console.log(kor1);

let a, b;
[a, b] = kors2;
console.log(a);

a = 20;
b = 30;
console.log(a);
[a,b]=[b,a];
console.log(a);

let nums = [1,2,3,4,5,6,7,8,9,10];
let [n1,n2,...rest]=nums;
console.log(rest);

let set = new Set([2,3,45,3,2,6,3,4,53,5,4,3,2,2,2,3,4,45]);
// set.add(5);
// set.add("5");
// set.add(2);
// set.add(5);

console.log(`size :${set.size}`);

for(let k in set)
    console.log(k);

    console.log("--------------------------------")

for(let n of set)
    console.log(n);
console.log("--------------------------------")

set.forEach((v)=>{
    console.log(`value : ${v}`);
});

set.forEach((v,k)=>{
    console.log(`key:${k}, value : ${v}`);
});

let notice = new Map();
notice.set("id", 1);
notice.set("title", "map is ...");
notice.set("writer", "newlec");

console.log(notice.get("title"));

notice.forEach((v,k)=>{
    console.log(`key:${k}, value : ${v}`);
});

for(let key of notice.keys())
    console.log(`key : ${key}`);

for(let v of notice.values())
    console.log(`key : ${v}`);
    
console.log("====================")
for(let [k,v] of notice)
    console.log(`key : ${k}, value : ${v}`);
for(let n of notice)
    console.log(`n : ${n[1]}`);

// ================
let exam3 = {
    kor:10,
    eng:20,
    math:30
};

for(let [k,v] of Object.entries(exam3))
    console.log(`key : ${k}, value : ${v}`);

//let obj = new Object();
//let object = {};

let obj = Object.create(null);

let list = [
    {id:1, title:"jsp is..", writerId:"newlec"},
    {id:2, title:"servlet is..", writerId:"newlec"},
    {id:3, title:"javascript is..", writerId:"newlec"},
    {id:4, title:"spring is..", writerId:"newlec"}
];

list.forEach((n)=>{});
let ar = list.map((n)=>{ return `<span>${n.title}</span>`});
console.log(ar);


