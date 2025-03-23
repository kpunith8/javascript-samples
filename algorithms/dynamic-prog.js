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

console.log("fibMemo(50)", fibMemo(50));
// Calculate fib for a larger number such as 50.
console.log("fib(40)", fib(5));

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

const memoGridTraveler = (m, n, memo = {}) => {
  const key = `${m},${n}`;
  if (key in memo) return memo[key];
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;

  memo[key] =
    memoGridTraveler(m - 1, n, memo) + memoGridTraveler(m, n - 1, memo);
  return memo[key];
};

console.log("memoGridTraveler(10,10):", memoGridTraveler(17, 17));

// Function should return a boolean indicating whether or not it is possible to
// generate the target sum using the numbers passed from the array
// A number in a array can be used as many as needed and should be non-negative
const canSum = (targetSum, arr) => {
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;

  for (let num of arr) {
    const remainder = targetSum - num;
    if (canSum(remainder, arr) === true) return true;
  }
  return false;
};

const memoCanSum = (targetSum, arr, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;

  for (let num of arr) {
    const remainder = targetSum - num;
    if (memoCanSum(remainder, arr, memo) === true) {
      memo[targetSum] = true;
      return true;
    }
  }
  memo[targetSum] = false;

  return memo[targetSum];
};

console.log("canSum(4,[2,2,4]):", canSum(4, [2, 2, 4]));
console.log("canSum(7,[3, 4, 7, 5, 2]):", canSum(7, [3, 4, 7, 5, 2]));
// Without memo it takes more time
// console.log("canSum(300,[7, 14]):", canSum(300,[7, 14]));
console.log("memoCanSum(300,[7, 14]):", memoCanSum(300, [7, 14]));

const howSum = (targetSum, arr, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let num of arr) {
    const remainder = targetSum - num;
    const result = howSum(remainder, arr, memo);
    if (result !== null) {
      const res = [...result, num];
      memo[targetSum] = res;
      return memo[targetSum];
    }
  }
  memo[targetSum] = null;

  return memo[targetSum];
};

console.log("howSum(4, [2, 4]):", howSum(4, [2, 4]));
console.log("howSum(7, [3, 4, 7, 5, 2]):", howSum(7, [3, 4, 7, 5, 2]));
console.log("howSum(300, [7, 14]):", howSum(300, [7, 14]));

/*
Climbing Stairs:

You have n stairs and can climb 1 or 2 steps at a time. Count the number of distinct ways to reach the top.
Use a fibonacci sequence to solve this problem.
*/
const climbStairs = (n) => {
  if (n <= 1) return 1; // base case
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1; // 1 way to "stay" at step 0
  dp[1] = 1; // 1 way to reach step 1

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // from i-1 (one step) and i-2 (two steps)
  }
  return dp[n];
};

console.log("climbStairs:", climbStairs(5)); // Output: 8

/*
House Robber:

Given an array of non-negative integers (each representing the amount of money in a house),
determine the maximum amount you can rob such that you never rob two adjacent houses.
*/
const rob = (nums) => {
  const dp = new Array(nums.length).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[nums.length - 1];
};

/*
House indices:    0    1    2    3    4
Money:            2    7    9    3    1

dp[0] = 2
dp[1] = max(2,7) = 7
dp[2] = max(dp[1], dp[0]+9) = max(7, 2+9=11) = 11
dp[3] = max(dp[2], dp[1]+3) = max(11, 7+3=10) = 11
dp[4] = max(dp[3], dp[2]+1) = max(11, 11+1=12) = 12
*/

console.log("Rob:", rob([2, 7, 9, 3, 1])); // Output: 12

/*
Maximum Subarray (Kadane’s Algorithm):

Find the contiguous subarray (of at least one element) which has the largest sum.

DP Recurrence:
Let currentSum be the best sum ending at the current index.
Recurrence:
currentSum = max(num, currentSum + num)
maxSum = max(maxSum, currentSum)
*/
function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either start a new subarray at nums[i] or extend the previous subarray
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

console.log("maxSubArray:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6
