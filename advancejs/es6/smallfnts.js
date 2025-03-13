//4-2-2025


/*indexOf(),  lastIndexOf(),   for in loop,   */



// //indexOf()- it show the index value of the given data
//1
// const fruits = ["apple", "banana", "cherry", "date"];

// const index = fruits.indexOf("banana");

// console.log(index);



// //2,if the given data is not in array it gives value as -1
// const fruits = ["apple", "banana", "cherry", "date"];

// const index = fruits.indexOf("grape");

// console.log(index);


// //3,shows the last banana index
// const fruits = ["apple", "banana", "cherry", "banana", "date"];

// const lastIndex = fruits.lastIndexOf("banana");

// console.log(lastIndex);






// //for in loop   not necessary
////1, 
// const fruits = ["apple", "banana", "cherry"];

// for (let index in fruits) {
//   console.log(index + ": " + fruits[index]);
// }


//// 2,for object
// const person = {
//     name: "Alice",
//     age: 25,
//     occupation: "Engineer"
//   };
  
//   for (let key in person) {
//     console.log(key + ": " + person[key]);  
//   }

////
// const fruits = ["apple", "banana", "cherry"];

// for (let fruit of fruits) {
//   console.log(fruit);  
// }

////1
// const word = "JavaScript";

// for (let cha of word) {
//   console.log(cha);  
// }


// const word = "JavaScript";

// for (let i = 0; i < word.length; i++) {
//   console.log(word[i]);
// }