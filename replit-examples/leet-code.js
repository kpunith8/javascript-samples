/*
Prefix Sum:
303. Range Sum Query - Immutable
525. Contiguous Array
560. Subarray Sum Equals K

Two Pointers:
167. Two Sum II - Input Array is Sorted
15. 3 Sum
11. Container with most water

Sliding Window:
643. Maximum Average Subarray I
3. Longest Substring without Repeating Characters
76. Minimum Window Substring

Fast and Slow Pointers:
141. Linked List Cycle
202. Happy Number
287. Find the Duplicate Number

Linked List in-place reversal:
206. Reverse Linked List
92. Reverse Linked List II
24. Swap Nodes in Pairs

Monotonic Stack:
496. Next Greater Element I
739. Daily Temperatures
84. Largest Rectangle in Histogram

Top K. Elements OR min/max Heap:
215. Kth Largest element in an array
347. Top K Frequent Elements
373. Find K Pairs with Smallest Sums

Overlapping Intervals:
56. Merge Intervals
57. Insert Interval
435. Non-overlapping intervals

Modified Binary Search:
33. Search in Rotated Sorted Array
153. Find Minimum in Rotated Sorted Array
240. Search a 2D Matrix II

Binary Tree Traversal:
257. Binary Tree Paths
230. Kth Smallest Element in a BST
124. Binary Tree Maximum Path Sum
107. Binary Tree Level Order Traversal II

Depth First Search:
133. Clone Graph
113. Path Sum II
210. Course Schedule II

Breadth First Search:
102. Binary Tree Level Order Traversal
994. Rotting Oranges
127. Word Ladder

Matrix Traversal:
733. Flood Fill
200. Number of Islands
130. Surrounded Regions

Backtracking:
46. Permutations
78. Subsets
51. N-Queens

Dynamic Programming:
70. Climbing Stairs
322. Coin Change
300. Longest Increasing Subsequence
416. Partition Equal Subset Sum
312. Burst Balloons
1143. Longest Common Subsequence

*/

// Sliding window technique
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/
const maxProfit = (prices) => {
  let maxProfit = 0;
  let leftIndex = 0;
  let rightIndex = 1;

  while (rightIndex < prices.length) {
    if (prices[leftIndex] < prices[rightIndex]) {
      const profit = prices[rightIndex] - prices[leftIndex];
      maxProfit = Math.max(maxProfit, profit);
    } else {
      leftIndex = rightIndex;
    }
    rightIndex += 1;
  }

  return maxProfit;
};

let prices = [7, 1, 5, 3, 6, 4]; // 5
prices = [7, 6, 4, 3, 1]; // 0
console.log("Buy and sell for max Profit:", maxProfit(prices));

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/
const maxProfit1 = (prices) => {
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < prices[i + 1]) {
      const profit = prices[i + 1] - prices[i];
      maxProfit += profit;
    }
  }

  return maxProfit;
};

prices = [7, 1, 5, 3, 6, 4]; // 7
prices = [1, 2, 3, 4, 5]; // 4
console.log("Buy and sell when next day price is high:", maxProfit1(prices));

// https://leetcode.com/problems/longest-mountain-in-array
// 2-Pointer Approach
const longestMountain = (arr) => {
  const length = arr.length;
  if (length < 3) return 0; // A mountain should have atleast 3 elements

  let maxLength = 0;

  for (let i = 1; i < length; i++) {
    // check if arr[i] is peak
    if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
      let left = i - 1;
      let right = i + 1;

      while (left > 0 && arr[left] > arr[left - 1]) {
        left -= 1;
      }

      while (right < length - 1 && arr[right] > arr[right + 1]) {
        right += 1;
      }

      maxLength = Math.max(maxLength, right - left + 1);

      i = right;
    }
  }

  return maxLength;
};

// [2, 1, 4, 7, 3, 2, 5] => 5
// [2, 2, 2] => 0
// [1, 3, 2] => 3
console.log("Longest Mountain:", longestMountain([2, 1, 4, 7, 3, 2, 5]));

// 303. Range Sum Query - Immutable - Prefix Sum
// T - O(n) for preprocessing, O(1) for query
const createRangeSumQuery = (nums) => {
  const prefixSums = new Array(nums.length + 1).fill(0);

  for (let index = 0; index < nums.length; index++) {
    prefixSums[index + 1] = prefixSums[index] + nums[index];
  }

  return function sumRange(left, right) {
    return prefixSums[right + 1] - prefixSums[left];
  };
};

const sumRange = createRangeSumQuery([-2, 0, 3, -5, 2, -1]);
console.log("Range Sum Query:", sumRange(0, 2)); // Output: 1

// 525. Contiguous Array - Prefix sum and HashMap

// Find the maximum length of a contiguous subarray containing an equal number of 0s and 1s.

// The key observation is that equal counts of zeros and ones can be modeled as a zero-sum problem.
// By normalizing 0 to -1 and 1 to +1, any subarray containing an equal number of zeros
// and ones will have a cumulative sum of zero.
function findMaxLength(nums) {
  const firstOccurrenceByBalance = new Map();

  firstOccurrenceByBalance.set(0, -1);

  let sum = 0;
  let maxLength = 0;

  for (let index = 0; index < nums.length; index++) {
    sum += nums[index] === 1 ? 1 : -1;

    if (firstOccurrenceByBalance.has(sum)) {
      const previousIndex = firstOccurrenceByBalance.get(sum);

      maxLength = Math.max(maxLength, index - previousIndex);
    } else {
      firstOccurrenceByBalance.set(sum, index);
    }
  }

  return maxLength;
}

console.log(
  "Find Max Length of Contiguous Array:",
  findMaxLength([0, 1, 0, 1, 1, 0]),
);

// 560. Subarray Sum Equals K - Prefix sum and HashMap

// The total number of continuous subarrays, whose sum equals k
// if the array contains a negative number, we cannot use sliding window technique.
// Instead we can use prefix sum and hashmap to store the count of prefix sums.

/*
The core insight:

sum(i, j) = prefixSum(j) - prefixSum(i-1)

We want sum(i,j) = k, which means:

prefixSum(j) - prefixSum(i-1) = k
prefixSum(i-1) = prefixSum(j) - k

So at every index j, if we know how many times the value (prefixSum(j) - k) has
occurred as a prefix sum before this point,
we know how many subarrays ending at j sum to k.
*/
function subArraySum(nums, k) {
  const prefixSumCount = new Map();
  // This handles the case where the subarray starting from index 0 itself sums to k (prefixSum - k = 0).
  prefixSumCount.set(0, 1); // Initialize with sum 0 having one occurrence

  let prefixSum = 0;
  let count = 0;

  for (const num of nums) {
    prefixSum += num;

    if (prefixSumCount.has(prefixSum - k)) {
      count += prefixSumCount.get(prefixSum - k);
    }
    prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
  }

  return count;
}

console.log("Subarray Sum Equals K:", subArraySum([1, 2, 1, 2, 1], 3)); // Output: 4

