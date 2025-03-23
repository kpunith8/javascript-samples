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

/*
Detecting a Cycle in a Linked List (Floyd’s Cycle Detection)
This algorithm determines whether a linked list has a cycle.
If a cycle exists, the fast pointer will eventually meet the slow pointer.
*/
function hasCycle(head) {
  let slow = head,
    fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next; // Move slow pointer one step
    fast = fast.next.next; // Move fast pointer two steps
    if (slow === fast) {
      // Cycle detected
      return true;
    }
  }
  // No cycle found
  return false;
}

/*
Finding the Middle of a Linked List
In this problem, when the fast pointer reaches the end, the slow pointer will be in the middle.
*/
function findMiddle(head) {
  let slow = head,
    fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next; // Move slow pointer one step
    fast = fast.next.next; // Move fast pointer two steps
  }
  // Slow pointer is now at the middle of the list
  return slow;
}

/*
Checking for a Palindrome in a Linked List
This approach involves using the two-pointer technique to first find the middle of the linked list,
then reverse the second half, and finally compare both halves for equality.
*/
function isPalindrome(head) {
  if (!head || !head.next) return true;

  // Step 1: Find the middle of the list
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse the second half of the list
  let prev = null;
  while (slow) {
    let next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }

  // Step 3: Compare the first and second halves
  let left = head,
    right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}
