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

// https://leetcode.com/problems/minimum-size-subarray-sum/description/
/*
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
*/
var minSubArrayLen = function (target, nums) {
  let left = 0;
  let minLength = Infinity;
  let sum = 0;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
};
