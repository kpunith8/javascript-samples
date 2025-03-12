/* Slow and speed pointer approach /*
/*
1. Given an array nums containing n + 1 integers where each integer is in the range [1, n],
there is only one duplicate number. The goal is to find that duplicate without
modifying the array and using only constant extra space
*/
function findDuplicate(nums) {
  // Phase 1: Finding the intersection point in the cycle.
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow]; // Move slow pointer one step.
    fast = nums[nums[fast]]; // Move fast pointer two steps.
  } while (slow !== fast);

  // Phase 2: Finding the entrance to the cycle.
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow]; // Move both one step at a time.
    fast = nums[fast];
  }

  return slow;
}

const nums = [2, 5, 9, 6, 9, 3, 8, 9, 7, 1]; // [1, 3, 4, 2, 2]; // [3, 1, 3, 4, 2]; // [1,3,4,2,2]
console.log("Duplicate number:", findDuplicate(nums));

/*
2. Happy Number
Determining if 19 is a Happy Number:

Step 1: Start with 19.

Compute the sum of the squares of its digits:
1^2 + 9^2 = 1 + 81 = 82

Step 2: Now take 82.
8^2 + 2^2 = 64 + 4 = 68

Step 3: Now take 68.
6^2 + 8^2 = 36 + 64 = 100

Step 4: Now take 100.
1^2 + 0^2 + 0^2 = 1 + 0 + 0 = 1

Since the process reached 1, the number 19 is a happy number.
*/
function isHappy(n) {
  function getNext(num) {
    let totalSum = 0;
    while (num > 0) {
      let digit = num % 10;
      totalSum += digit * digit;
      num = Math.floor(num / 10);
    }
    return totalSum;
  }

  let slow = n;
  let fast = getNext(n);

  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow); // Move one step.
    fast = getNext(getNext(fast)); // Move two steps.
  }

  return fast === 1;
}

const number = 19;
console.log(`${number} is a happy number:`, isHappy(number)); // Output: true
