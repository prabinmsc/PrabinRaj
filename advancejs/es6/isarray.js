//6-2-2025
/*array.isarray()    set interval,   set Timeout and clearinterval  */

// let data=[35,45,65,85]           //output:true
// console.log(Array.isArray(data));


// let data=[[35],['a'],65,85,false,true]
// console.log(Array.isArray(data));


// let data={name:"prabin"}     //output:false   because there is no array in the data variable.
// console.log(Array.isArray(data));





////setInterval, settimeout,  clearInterval
//1,
// let intervalId = setInterval(function() {
//     console.log("Hello every 2 seconds!");//don't run the the code without settimeout because it will run infinitely
// }, 2000);
// setTimeout(function() {
//         clearInterval(intervalId); 
//         console.log("Interval stopped!");
//     }, 12000);



//2,

// let counter = 0;
// let intervalId = setInterval(function() {
//     counter+=5;//counter=counter+5;
//     console.log(`Hello every 2 seconds! Counter: ${counter}`);
// }, 2000);
// setTimeout(function() {
//             clearInterval(intervalId); 
//             console.log("Interval stopped!");
//         }, 2000*10);


//Array.keys()

// const fruits = ["apple", "banana", "cherry"];

// const keysIterator = fruits.keys();     // in key() must use spread operator because key doesnot give the array value

// console.log([...keysIterator]);



