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

function lengthOfLongestSubstringMap(s) {
  const map = new Map();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1); // Move left pointer
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

console.log(lengthOfLongestSubstringMap("abcabcbb")); // Output: 3

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

// Find the maximum sum of any contiguous subarray of size ‘k’
/*
Input: [2, 1, 5, 1, 3, 2], k=3
Output: 9
Explanation: Subarray with maximum sum is [5, 1, 3].
*/
function maxSumSubarrayOfSizeK(k, arr) {
  let maxSum = 0;
  let windowSum = 0;
  let windowStart = 0;

  for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i]; // Add the next element

    // Slide the window, we don't start shrinking until we hit the size 'k'
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[windowStart]; // Subtract the element going out
      windowStart++; // Slide the window ahead
    }
  }

  return maxSum;
}
console.log(
  "Maximum sum of subarray of size k:",
  maxSumSubarrayOfSizeK(3, [2, 1, 5, 1, 3, 2])
);

// Maximum Average Subarray - 2 Pointer
/*
Input: nums = [1,12,-5,-6,50,3], k = 4

Window 1: [1,12,-5,-6] → sum = 1+12-5-6 = 2 → avg = 0.5
Window 2: [12,-5,-6,50] → sum = 12-5-6+50 = 51 → avg = 12.75
Window 3: [-5,-6,50,3] → sum = -5-6+50+3 = 42 → avg = 10.5
Maximum average: 12.75
*/
const maximumAvgSubArray = (arr, k) => {
	let currentSum = 0;
	// Calculate the sum of first K elements
	for (let i = 0; i < k; i++) {
		currentSum += arr[i];
	}

	let maxSum = currentSum;

	// Start from Kth index
	for (let i = k; i < arr.length; i++) {
		currentSum += arr[i] - arr[i - k]; // Add the current element and remove the last one
		maxSum = Math.max(maxSum, currentSum);
	}

	return maxSum / k;
};

console.log(
	"MaximumAvgSubarray:",
	maximumAvgSubArray([1, 12, -5, -6, 50, 3], 4)
);
