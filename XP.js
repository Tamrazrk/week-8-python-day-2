// Exercise 1 : Comparison Instructions

function compareToTen(num) {
  return new Promise((resolve, reject) => {
    if (num <= 10) {
      resolve(`${num} is less than or equal to 10`);
    } else {
      reject(`${num} is greater than 10`);
    }
  });
}

compareToTen(15)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

compareToTen(8)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// Exercise 2 : Promises

function delayedSuccess() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 4000);
  });
}

delayedSuccess()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

// Exercise 3 : Resolve & Reject

const resolvedPromise = Promise.resolve(3);

const rejectedPromise = Promise.reject("Boo!");

resolvedPromise
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

rejectedPromise
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
