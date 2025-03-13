// 7-2-2025
//asyncronize - unorder of excecution
// console.log("Task 1");

// setTimeout(() => {
//   console.log("Task 2");
// },1000);  

// console.log("Task 3");



//10-2-2025
//asyn    Await   Try    Catch
///Promise-  1,Pending  2, fulfill  3, Rejected

//await -   is used to wait the execution upto the time .
//try -(error handling)   will throw the error in the program and
// catch  -   will get the error which was thrown by try
//async -  it will execute the code by unorderly . it is used to get a promise from fetch
//if u use async then u must use await 

// async function fetchData() {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  
      
  
//       const data = await response.json();
      
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
  
//   fetchData();