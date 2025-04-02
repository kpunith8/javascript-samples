const sortedSquaredArray = (arr) => {
  const result = [];
  let left = 0;
  let right = arr.length - 1;

  // Keep 2 pointers, one at the start and one at the end
  // If the absolute value of the element at the start is greater than
  // the element at the end, put the squared value to the end
  for (let i = arr.length - 1; i >= 0; i--) {
    if (Math.abs(arr[left]) > arr[right]) {
      result[i] = arr[left] * arr[left];
      left++;
    } else {
      result[i] = arr[right] * arr[right];
      right--;
    }
  }

  return result;
};

console.log("Sorted squared array:", sortedSquaredArray([-6, -4, -1, 1, 2, 5])); // [1, 1, 4, 16, 25, 36]

/*
Two Sum (Sorted Array)
Problem: Given a sorted array and a target sum, find two numbers that add up to the target.
O(n) time, O(1) space.
*/
function twoSum(numbers, target) {
  let left = 0; // Pointer at the start
  let right = numbers.length - 1; // Pointer at the end

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1]; // Return 1-based indices
    } else if (sum < target) {
      left++; // Increase sum by moving left pointer
    } else {
      right--; // Decrease sum by moving right pointer
    }
  }
  return []; // No solution found
}

console.log("twoSum:", twoSum([2, 7, 11, 15], 9)); // Output: [1, 2]

/*
Remove Duplicates from Sorted Array
Problem: Remove duplicates in-place from a sorted array and return the new length.
O(n) time, O(1) space.
*/
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let write = 1; // Pointer to place next unique element
  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[read - 1]) {
      nums[write] = nums[read]; // Copy unique element
      write++;
    }
  }
  return write; // Length of array without duplicates
}

let nums = [0, 0, 1, 1, 1, 2, 3, 3];
console.log("removeDuplicates:", removeDuplicates(nums)); // Output: 4
console.log("Non-duplicate array items:", nums.slice(0, 4)); // Output: [0, 1, 2, 3]

/*
Container With Most Water
Problem: Find two lines that form a container with the maximum water capacity.
Best Time Complexity: O(n), space complexity: O(1).
*/
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    // Area = width * min height of the two lines
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * minHeight);

    // Move the pointer of the shorter line inward
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxWater;
}

console.log("Container With Most Water:", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // Output: 49

/*
Problem: Find all unique triplets that sum to zero.
Best Time Complexity: O(n²), O(1) space (excluding sorting/output).
*/
function threeSum(nums) {
  nums.sort((a, b) => a - b); // Sort array: O(n log n)
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
        // Skip duplicates
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}

console.log("threeSum:", threeSum([-1, 0, 1, 2, -1, -4])); // Output: [[-1, -1, 2], [-1, 0, 1]]

/*
Reverse String
Problem: Reverse a string in-place.
Best Time Complexity: O(n), O(1) space.
*/
function reverseString(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Swap characters
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}

// If a string is passed, split it first `s.split("")` and return the result by joining `s.join("")`
console.log(
  "reverseString, in-place:",
  reverseString(["h", "e", "l", "l", "o"])
); // Output: ["o", "l", "l", "e", "h"]

/*
Valid Palindrome
Problem: Check if a string is a palindrome, ignoring non-alphanumeric characters and case.
Best Time Complexity: O(n), O(1) space.
*/
function isValidPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, ""); // Clean string
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(
  "isValidPalindrome:",
  isValidPalindrome("A man, a plan, a canal: Panama")
); // Output: true

/*
Trapping Rain Water
Problem: Calculate how much water can be trapped between bars.
Best Time Complexity: O(n), O(1) space.
*/
function trapRainWater(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    if (leftMax < rightMax) {
      water += leftMax - height[left]; // Water trapped at left
      left++;
    } else {
      water += rightMax - height[right]; // Water trapped at right
      right--;
    }
  }
  return water;
}

console.log(
  "trapRainWater:",
  trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])
); // Output: 6

/*
Move Zeroes
Problem: Move all zeros to the end while maintaining order of non-zero elements.
Best Time Complexity: O(n), O(1) space.
*/
function moveZeroes(nums) {
  let nonZero = 0; // Pointer for next non-zero position

  // Move all non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[nonZero] = nums[i];
      nonZero++;
    }
  }
  // Fill remaining positions with zeros
  for (let i = nonZero; i < nums.length; i++) {
    nums[i] = 0;
  }
  return nums;
}

console.log("moveZeroes:", moveZeroes([0, 1, 0, 3, 12])); // Output: [1, 3, 12, 0, 0]
