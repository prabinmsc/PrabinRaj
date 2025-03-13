//6-2-2025

//important concept

//Array destructuring

// //1,
// let vehicle=['car','bike','lorry','van'];
// let[one,two,three]=vehicle
// console.log(one);
// console.log(two);
// console.log(three);
// console.log(four);


//2,
// const numbers = [1, 2];

// const [first, second, third = 10] = numbers;

// console.log(first);  
// console.log(second); 
// console.log(third);


//3,
// let data=[15,[5,10],30];
// const[one,[two,three],four]=data
// console.log(one);
// console.log(two);
// console.log(three);
// console.log(four);



//4,

// let a = 5;
// let b = 10;

// [a, b] = [b, a];

// console.log(a); 
// console.log(b);


//5,using ...rest
// let vehicle=['car','bike','lorry','van']
// let[one,...rest]=vehicle
// console.log(one);
// console.log(...rest);


//6,
// let obj={name:'Prabin',
//     age:24,
//     place:'mjth'
// }
// let{name,...rest}=obj
// console.log(name);
// console.log(rest);


//7,changing key to another key
// const person = {
//     name: 'Bob',
//     age: 30,
//     city: 'Los Angeles'
//   };
  
//   const { name: fullName, age: yearsOld, city: location } = person;
  
//   console.log(fullName);  
//   console.log(yearsOld);  
//   console.log(location);

//8,to change key to another key and also to add new keys and value in object
// const person = {
//     name: 'Charlie',
//     city: 'Chicago'
//   };
  
//   const { name:fullName, age = 40, city } = person;
  
//   console.log(fullName);  
//   console.log(age);  
//   console.log(city);


//9,
// const user = {
//     id: 1,
//     name: 'David',
//     address: {
//       street: '123 Main St',
//       city: 'Miami',
//       country: 'USA'
//     }
//   };
  
//   const { name, address: { city, country } } = user;
  
//   console.log(name);    
//   console.log(city);     
//   console.log(country);


//10,

// const person = {
//     name: 'Eva',
//     age: 35,
//     city: 'San Francisco',
//     job: 'Developer'
//   };
  
//   const { name, age, ...otherDetails } = person;
  
//   console.log(name);         
//   console.log(age);          
//   console.log(otherDetails);


//11,for keys

// const person = {
//     name: 'Alice',
//     age: 30,
//     city: 'Paris'
//   };
  
//   const keys = Object.keys(person);  
//   console.log(keys);


//12,for keys and values

// const person = {
//     name: 'Bob',
//     age: 30,
//     city: 'Los Angeles'
//   };
  
//   const keys = Object.keys(person);
//   console.log(keys,"wfwfw")
  
//   for (let i = 0; i < keys.length; i++) {
//     const key = keys[i];
//     const value = person[key]; 
//     console.log(`${key}: ${value}`);
//   }