// Fib of nth number
const fib = (n) => {
  if (n <= 2) return 1;

  return fib(n - 1) + fib(n - 2);
};

const fibMemo = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);

  return memo[n];
};

// Giving larger number such as 50, takes more time

console.log("fibMemo(50)", fibMemo(50));
console.log("fib(40)", fib(40));

// Grid Traveller memoization
// 2D Grid - Move from top-left corner to bottom-right,
// Make move only move down or right
const gridTraveler = (m, n) => {
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;
  return gridTraveler(m - 1, n) + gridTraveler(m, n - 1);
};

console.log("gridTraveler(1,1):", gridTraveler(1, 1));
console.log("gridTraveler(2,3):", gridTraveler(2, 3));
// Takes more time with answer without memoization
// console.log("gridTraveler(10,10):", gridTraveler(17, 17));

const memoGridTraveler = (m, n, memo={}) => {
  const key = `${m},${n}`
  if (key in memo) return memo[key];
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;

  memo[key] = memoGridTraveler(m - 1, n, memo) + memoGridTraveler(m, n - 1, memo);
  return memo[key]
};

console.log("memoGridTraveler(10,10):", memoGridTraveler(17, 17));

// Function should return a boolean indicating whether or not it is possible to
// generate the target sum using the numbers passed from the array
// A number in a array can be used as many as needed and should be non-negative
const canSum = (targetSum, arr) => {
  if(targetSum === 0) return true;
  if(targetSum < 0) return false;

  for(let num of arr) {
    const remainder = targetSum - num
    if(canSum(remainder, arr) === true) return true;
  }
  return false;
}

const memoCanSum = (targetSum, arr, memo = {}) => {
  if(targetSum in memo) return memo[targetSum]
  if(targetSum === 0) return true;
  if(targetSum < 0) return false;

  for(let num of arr) {
    const remainder = targetSum - num
    if(memoCanSum(remainder, arr, memo) === true) {
      memo[targetSum] = true
      return true;
    }
  }
  memo[targetSum] = false

  return memo[targetSum];
}

console.log("canSum(4,[2,2,4]):", canSum(4,[2,2,4]));
console.log("canSum(7,[3, 4, 7, 5, 2]):", canSum(7,[3, 4, 7, 5, 2]));
// Without memo it takes more time
// console.log("canSum(300,[7, 14]):", canSum(300,[7, 14]));

console.log("memoCanSum(300,[7, 14]):", memoCanSum(300,[7, 14]));
