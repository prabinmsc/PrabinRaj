////
// const numb=[1,2,3,4,5]

// function square(num){

//     return num.map(function(one){

//         return one*one
// })
// }
// console.log(square(numb))

// const one=(numb)=>numb.map(race=>race*race);

// console.log(one(numb))



//1
// let val=[1,2,3,4,5]
// let res=val.map(data=>data*data)
// console.log(res)



//2
// const obj1 = { a: 1, b: 2 };
// const obj2 = { c: 3, d: 4 };
// const obj3 = { e: 5, f: 6 };

// const total={...obj1,...obj2,...obj3};

// console.log(total)


//3
// const students = [
//     { name: 'Alice', score: 85 },
//     { name: 'Bob', score: 92 },
//     { name: 'Charlie', score: 78 }
//     ];

// const bobAge = students.map(person => person.name === 'Bob' && person.score).find(age => age);

// console.log(bobAge);


//4
// const a=[1,2,2,3,4,4,5];

// const b=new Set(a);

// const c=[...b]

// console.log(c);




//5
// let data=['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape']


// let a=data.filter(word=>word.length>5)
// console.log(a)



//6
// let data=[1, 2, 3, 4, 5]

// const sum=data.reduce((accumulator,currentvalue)=>{
//     return accumulator*currentvalue
// },1)
// console.log(sum)




//7
// const numbers = [1, 2, 3, 2, 4, 2, 5];

// const num={
//     firstIndex:numbers.indexOf(2), 
//     lastIndex:numbers.lastIndexOf(2)
// };

// console.log(num);


//8
// const a=[1,2,3]

// const b="Hello"

// console.log(Array.isArray(a))

// console.log(Array.isArray(b))



//9
// const data= 'The quick brown fox jumps over the lazy dog'

// const result=data.includes("fox")

// console.log(result)



//10
// const fruits = ["apple", "banana", "cherry"];

// const num = fruits.keys();

// console.log(...num);


//11
// let fruits=[ "apple","banana","apple","grape","apple"];
// let res=fruits.map(user=>{
//     let repl=user.replaceAll("apple","orange")
//     return repl
// });
// console.log(res);


//12
// let fruits=[ "apple","banana","cherry"];
// let repl=fruits.includes('banana')
// console.log(repl);



//15,
// let name='John'
// age=30
// console.log(`Hello, my name is ${name} and I am ${age} years old.`);


//16
// let inp= {name:'Alice',age:25,city:'NewYork'}
// const {name,age,city}=inp
// console.log(name);
// console.log(age);
// console.log(city);


//18,
// function add(...rest){
//     return rest.reduce((acc,cur)=>acc+cur,0)
// }
// console.log(add(1,2,3,4,5));


//19,
// let arr= [1,2,3,4,5];
// let res=arr.reduce((acc,cur)=>acc+cur,0)
// console.log(res);

//20,
// let arr= [1,2,3,4,5];
// let res=arr.reduce((acc,cur)=>acc*cur,1)
// console.log(res);


//21,
// let dat= ['apple', 'banana', 'cherry', 'date'];
// let res=dat.reduce((acc,cur)=>acc.length>=cur.length ? acc : cur ,0)//tertinary operator
// console.log(res);


// 22,
const dat= [[1, 2, 3], [4, 5], [6, 7, 8, 9]];
// let res=dat.reduce((acc,cur)=>acc.concat(cur),[])
// console.log(res);
let res=dat.map(user=>user.flat)
console.log(res);

