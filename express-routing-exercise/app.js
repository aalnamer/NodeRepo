const express = require("express");
const ExpressError = require("./expressErrors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function findMean(array) {
  let sum = array.reduce((a, b) => a + b);

  return Math.floor(sum / array.length);
}

function findMedian(array) {
  let mid = Math.floor(array.length / 2);
  numbers = [...array].sort((a, b) => a - b);
  return array.length % 2 !== 0
    ? numbers[mid]
    : (numbers[mid - 1] + numbers[mid]) / 2;
}

function findMode(array) {
  let obj = {};

  array.forEach((number) => {
    if (!obj[number]) {
      obj[number] = 1;
    } else {
      obj[number] += 1;
    }
  });

  let highestValue = 0;
  let highestValueKey = -Infinity;

  for (let key in obj) {
    let value = obj[key];
    if (value > highestValue) {
      highestValue = value;
      highestValueKey = key;
    }
  }
  return Number(highestValueKey);
}

const operation = {
  mean: "mean",
  median: "median",
  mode: "mode",
};

app.get("/", (req, res) => {
  res.send("<h1> HomePage</h1>");
});

app.get("/mean", (req, res, next) => {
  try {
    if (!req.query.nums) {
      throw new ExpressError(
        "You must pass a query key of nums with a comma-separated list of numbers.",
        400
      );
    }
    const operationUsed = operation["mean"];

    let nums = [];
    let numsString = req.query.nums;
    let numsArray = numsString.split(",");

    for (let i = 0; i < numsArray.length; i++)
      nums.push(parseInt(numsArray[i]));
    let solveMean = findMean(nums);

    const response = {
      operation: operationUsed,
      nums: nums,
      value: solveMean,
    };
    return res.send({ response });
  } catch (e) {
    next(e);
  }
});

app.get("/median", (req, res, next) => {
  try {
    if (!req.query.nums) {
      throw new ExpressError(
        "You must pass a query key of nums with a comma-separated list of numbers.",
        400
      );
    }
    const operationUsed = operation["median"];

    let nums = [];
    let numsString = req.query.nums;
    let numsArray = numsString.split(",");

    for (let i = 0; i < numsArray.length; i++)
      nums.push(parseInt(numsArray[i]));
    let solveMean = findMedian(nums);

    const response = {
      operation: operationUsed,
      nums: nums,
      value: solveMean,
    };
    return res.send({ response });
  } catch (e) {
    next(e);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    if (!req.query.nums) {
      throw new ExpressError(
        "You must pass a query key of nums with a comma-separated list of numbers.",
        400
      );
    }
    const operationUsed = operation["mode"];

    let nums = [];
    let numsString = req.query.nums;
    let numsArray = numsString.split(",");

    for (let i = 0; i < numsArray.length; i++)
      nums.push(parseInt(numsArray[i]));

    let solveMean = findMode(nums);

    const response = {
      operation: operationUsed,
      nums: nums,
      value: solveMean,
    };
    return res.send({ response });
  } catch (e) {
    next(e);
  }
});

// app.use(function (err, req, res, next) {
//   let status = err.status || 500;
//   let message = err.msg;

//   return res.status(status).json({
//     error: { message, status },
//   });
// });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
