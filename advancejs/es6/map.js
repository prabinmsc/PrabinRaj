// es6-ECMA script which has many useful function
//30-1-2025
/*map(),  toUpperCase(),  flat()*/



// 1,map() - It returns the output in the new array 


// let a=[1,2,3,4,5]
// // here 1st user act as a parameter and 2nd user act as a returned value.
// // also map act as an argument
// let result=a.map(user=>user)
// console.log(result);

// multiple of 5
// let a=[1,2,3,4,5]
// let result=a.map(user=>user*5)
// console.log(result);

// // to change string to upperCase
// let a=['volvo','benze','shift','toyoto']
// let result=a.map(user=>user.toUpperCase())
// console.log(result);

// // 
// let data=[{
//     name1:'Prabin',
//     age1:24,
//     place1:'mjth'
// },
// {
//     name2:'Prabin',
//     age2:24,
//     place2:'mjth'
// }]

// let datas=data.map(user=>`${user.name1}`)
// console.log(datas)

// jan31
// index and number

// const num=[10,20,30,40,50];
// const finalnum=num.map((Number,index)=>`${index+1}:${Number}`)
// // if needed use index +1
// console.log(finalnum);


// let num=[5,10,15,20,25]
// let numbers=num.map(number=>{
//     if(number%2==0){
//         return number/2
//     }
//     else{return  number*2}
//     console.log(numbers);
    
// })
// const ans=num.map(user=>user%2==1?user*2:user/2)
// console.log(ans);

// nested array
// let data=[[1,2],[3,4],[4,5]]
// let numbers=data.map(number=>{number.map(numb=>{console.log(console.log(numb*2))})})

// // .flat()-  gives values in single array
// let result=data.map(number=>number.map(num=>num*2))
// .flat()
// console.log(result)