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
console.log("Longest Mountain:", longestMountain([1, 3, 2]));
