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
