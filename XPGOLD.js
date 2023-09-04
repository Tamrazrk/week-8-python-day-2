// Exercise 1 : Promise.All()

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "foo");
});

const promisesArray = [promise1, promise2, promise3];

Promise.all(promisesArray)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });

// Exercise 2 : Analyse Promise.All()

// 1) timesTwoAsync is a function that takes an input x and returns a Promise that resolves to x * 2.

// 2) arr is an array containing the values [1, 2, 3].

// 3) promiseArr is created by mapping each element of arr through the timesTwoAsync function, which means it becomes an array of Promises: [Promise(2), Promise(4), Promise(6)].

// 4) Promise.all(promiseArr) waits for all the Promises in promiseArr to resolve. In this case, all the Promises resolve successfully to [2, 4, 6] since timesTwoAsync just doubles each input.

// 5) The .then block is executed, and the result parameter contains the resolved values, which are [2, 4, 6].

// 6) The console.log(result) statement logs the array [2, 4, 6].

// So, the output of this code will be:  [2, 4, 6]
