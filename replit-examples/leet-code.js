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

// https://leetcode.com/problems/longest-substring-without-repeating-characters/
const lengthOfLongestSubstring = (str) => {
  let charSet = new Set();
  let leftIndex = 0;
  let result = 0;

  for (let rightIndex = 0; rightIndex < str.length; rightIndex++) {
    while (charSet.has(str[rightIndex])) {
      charSet.delete(str[leftIndex]);
      leftIndex += 1;
    }
    charSet.add(str[rightIndex]);
    result = Math.max(result, rightIndex - leftIndex + 1);
  }

  return result;
};

let str = "abcabcbb"; // 3
// Explanation: The answer is "abc", with the length of 3.

str = "bbbbb"; // 1
// Explanation: The answer is "b", with the length of 1.
console.log(
  "Lenght of longest substring - non repeating:",
  lengthOfLongestSubstring(str)
);
