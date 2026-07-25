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
  lengthOfLongestSubstring(str),
);

function lengthOfLongestSubstringMap(s) {
  const map = new Map();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char)) {
      left = Math.max(left, map.get(char) + 1); // Move left pointer
    }

    map.set(char, right);

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
  maxSumSubarrayOfSizeK(3, [2, 1, 5, 1, 3, 2]),
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
  maximumAvgSubArray([1, 12, -5, -6, 50, 3], 4),
);

const hasSubStringAnagram = (str, anagram) => {
  const length = anagram.length;
  const anagramSet = new Set(anagram);
  const windowSet = new Set(str.slice(0, length));

  if (
    windowSet.size === anagramSet.size &&
    [...windowSet].every((char) => anagramSet.has(char))
  ) {
    return true;
  }

  for (let i = 0; i < str.length - length; i++) {
    windowSet.delete(str[i]);
    windowSet.add(str[i + length]);

    if (
      windowSet.size === anagramSet.size &&
      [...windowSet].every((char) => anagramSet.has(char))
    ) {
      return true;
    }
  }

  return false;
};

console.log("hasSubStringAnagram:", hasSubStringAnagram("listen", "tsi"));

// Should consider duplicate chars in the anagram
const countSubstringAnagrams = (str, anagram) => {
  const anagramMap = new Map();
  for (const char of anagram) {
    anagramMap.set(char, (anagramMap.get(char) || 0) + 1);
  }

  let left = 0;
  let count = anagramMap.size;
  let result = 0;

  for (let right = 0; right < str.length; right++) {
    const char = str[right];
    if (anagramMap.has(char)) {
      anagramMap.set(char, anagramMap.get(char) - 1);
      if (anagramMap.get(char) === 0) {
        count--;
      }
    }

    while (count === 0) {
      if (right - left + 1 === anagram.length) {
        result++;
      }
      const leftChar = str[left];
      if (anagramMap.has(leftChar)) {
        anagramMap.set(leftChar, anagramMap.get(leftChar) + 1);
        if (anagramMap.get(leftChar) > 0) {
          count++;
        }
      }
      left++;
    }
  }

  return result;
};

console.log(
  "countSubstringAnagrams:",
  countSubstringAnagrams("gattaetat", "att"),
);

/*
76 — Minimum Window Substring
Given two strings s and t, find the minimum window substring of 's'
such that every character in 't' (including duplicates) is included in the window.
If no such window exists, return an empty string "".

* Optimal Approach — Variable-Size Sliding Window + Two Frequency Maps

1. Build need: frequency map of characters in t.
2. Track required = need.size — the number of distinct characters we must fully satisfy.
3. Use a windowCounts map to track frequencies of characters currently in [left, right].
4. Track formed — the number of distinct characters in windowCounts whose count has met or
exceeded the required count in need. When formed === required, the window is fully valid.
5. Expand right one step at a time:
  a. Add s[right] to windowCounts.
  b. If this character is one we need, and its count in the window just reached the required count
  (not exceeded, exactly reached — check windowCounts[char] === need[char]), increment formed.
6. While formed === required (window is currently valid), try to shrink from the left to minimize:
  a. Record the window length if it's smaller than the best found so far.
  b. Remove s[left] from windowCounts (decrement its count).
  c. If that character was needed, and its count drops below the required count,
  decrement formed (window becomes invalid) — this breaks the while loop, and we go back to expanding right.
  d. Move left forward.
7. Continue until right reaches the end of s. Return the recorded minimum window (or "" if none found).
*/
function minWindow(s, t) {
  if (t.length > s.length || t.length === 0) return "";

  // Step 1: build frequency map of what we need
  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }
  const required = need.size; // number of distinct chars we must fully satisfy

  // Step 2: sliding window state
  const windowCounts = new Map();
  let left = 0;
  let formed = 0; // number of distinct chars currently satisfying their required count

  let minLen = Infinity;
  let minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

    // if this char is one we need, and we just hit the required count, mark it "formed"
    if (need.has(char) && windowCounts.get(char) === need.get(char)) {
      formed++;
    }

    // window is fully valid -> try shrinking from left to minimize
    while (formed === required) {
      // record if this is the smallest valid window so far
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      // remove leftmost char, shrink window
      const leftChar = s[left];
      windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);

      if (
        need.has(leftChar) &&
        windowCounts.get(leftChar) < need.get(leftChar)
      ) {
        formed--; // no longer valid, break out after this
      }

      left++;
    }
  }

  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

console.log("Minimum Window Substring:", minWindow("ADOBECODEBANC", "ABC")); // Output: "BANC"
