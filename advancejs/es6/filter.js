//31-1-2025

/*filter(),  charAt(),length  */
// filter()-used to filter the required values from the collection:
// let data1=[1,2,3,4,5,6,7,8,9,10];
// let result1=data1.filter(num=>{if(num%2==0){
//     return num;
// }})
// console.log(result1)






// task2

// const students=[{name:'Prabin', age:17},{name:'Raj',age:18},
//     {name:'Abin',age:16},{name:'vidthya',age:20}
// ]
// let result=students.filter(student=>student.age>=18)
// console.log(result)



// task3 use length/charAt()function

// let item=['lion','cat','elephant','bird','fish']
// let result=item.filter(three=>three.length>3)
// console.log(result)

//task4     //from home
// const products = [
//     { name: 'Laptop', price: 1000, category: 'Electronics' },
//     { name: 'Shirt', price: 25, category: 'Clothing' },
//     { name: 'Shoes', price: 50, category: 'Clothing' },
//     { name: 'Phone', price: 600, category: 'Electronics' },
//     { name: 'Watch', price: 150, category: 'Accessories' }
//   ];
//   let res=products.filter(user=>user.name==='Phone'&&user.price===600&&user.category==='Electronics')
//   console.log(res);
  

//   Output: [{ name: 'Phone', price: 600, category: 'Electronics' }]


//task5             from home
// const values = [0, 1, false, 2, '', 3, null, 4, NaN];//// Output: [1, 2, 3, 4]
// let num=values.filter(user=>user)
// console.log(num);