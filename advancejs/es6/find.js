//31-1-2025
/*find(),  startsWith() */



// find()- used to filter the values but shows only the first value which satisfy the condition:

// task1
// let data=[3,1,4,3,9,5,8,8,9,10];
// let result=data.find(num=>{if(num%2==0){
//     return num;
// }})
// console.log(result)


// task2
// const students = [
//     { name: 'Alice', age: 22 },
//     { name: 'Bob', age: 17 },
//     { name: 'Charlie', age: 19 }
//   ];       // Output: { name: 'Alice', age: 22 }


//   let result=students.find(user=>user.age>=22)   //or use simply as user in user.age>=22
//   console.log(result)


//task3
// let num=[1,3,5,7,9,11]
// let res=num.find(user=>user%2==0)
// console.log(res)         //ans=undefined

//task4
// const words = ['apple', 'banana', 'cherry', 'chennai','date'];
// let res=words.find(user=>user.startsWith('c'))              //starts with  -verifies the start letter of the word
// console.log(res);


// task5
// const products = [
//     { name: 'Shirt', price: 25, category: 'Clothing' },
//     { name: 'Laptop', price: 1000, category: 'Electronics' },
//     { name: 'Shoes', price: 30, category: 'Clothing' }
//   ];
  
//   const affordableClothing = products.find(product => product.price <= 50 && product.category === 'Clothing');
  
//   console.log(affordableClothing);