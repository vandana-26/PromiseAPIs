
const P1 = Promise.resolve(40);
const P2 = "AAAAA";
const P3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Success");
    }, 6000)
})

Promise.allSettled([P1, P2, P3]).then((values) => {
    console.log(values);
})

// Output:  [
//     { status: 'fulfilled', value: 40 },
//     { status: 'fulfilled', value: 'AAAAA' },
//     { status: 'fulfilled', value: 'Success' }
//   ]


const P4 = new Promise((resolve, reject) =>{
    setTimeout(() =>{
        resolve("Success");
    },6000)
})

const P5 = new Promise((resolve, reject) =>{
    setTimeout(() =>{
        reject("Reject P1");
    },10000)
})

const P6 = new Promise((resolve, reject) =>{
    setTimeout(() =>{
        resolve("Success");
    },2000)
})

Promise.allSettled([P4, P5, P6]).then((values) => {
    console.log(values);
})
.catch((err) =>{
    console.log(err);
})

//Output: [
//   { status: 'rejected', reason: 'Reject P1' },
//   { status: 'fulfilled', value: 'Success' },
//   { status: 'fulfilled', value: 'Success' }
// ]