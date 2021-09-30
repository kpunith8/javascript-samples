// Rotate a 2D a array 90 degrees clockwise
const rotateImage = array => {
  const n = array.length;

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const temp = array[i][j];
      array[i][j] = array[j][i];
      array[j][i] = temp;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < (n / 2); j++) {
      const temp = array[i][j];
      array[i][j] = array[i][n-1-j];
      array[i][n-1-j] = temp;
    }
  }

  return array
}

const arrayTranspose = array => {
  const n = array.length;
  const result = [];
  for (let i = 0; i < n; i++) {
    result[i] = [];
    for (let j = 0; j < n; j++) {
      result[i][j] = array[j][i];
    }
  }
  return result;
}


const arr1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const rotatedArray = [[7, 4, 1], [8, 5, 2], [9, 6, 3]];

console.log('transpose of an array', arrayTranspose(arr1));

console.log('Rotate an image', rotateImage(arr1));

// [-6, -4, -1, 1, 2, 5] => [1, 1, 4, 16, 25, 36]
const sortedSquaredArray = arr => {
  const result = [];
  let left = 0;
  let right = arr.length - 1;

  // Keep 2 pointers, one at the start and one at the end
  // If the absolute value of the element at the start is greater than the element at the end, put the squared value to the end
  for(let i = arr.length - 1; i >= 0; i--) {
    if(Math.abs(arr[left]) > arr[right]) {
      result[i] = arr[left] * arr[left];
      left++;
    } else {
      result[i] = arr[right] * arr[right];
      right--;
    }
  }

  return result
}

console.log('Sorted squared array', sortedSquaredArray([-6, -4, -1, 1, 2, 5]));


// sum of two numbers in 2 arrays, takes O(a + b) time
const sumOfTwoNumbers = (arr1, arr2, target) => {
  const match = {}
  for (let i = 0; i < arr1.length; i++) {
    const diff = target - arr1[i];
    match[diff] = diff
  }

  for(let j = 0; j < arr2.length; j++) {
    if(match[arr2[j]]) {
      return true
    }
  }

  return false
}
// Another solution would be looping through both arrays, that could take O(n^2) time

console.log('sumOfTwoNumbers:', sumOfTwoNumbers([1, 2, 3, 4, 5], [2, 3, 4, 5, 6], 8));

// Kadan's algorithm
// Maxium sum of contiguous subarray
const maxSubArray = arr => {
  let maxSum = arr[0];
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum
}

console.log('maximum sum of contiguous array:', maxSubArray([-2, 2, 5, -11, 6])); // [2, 5] => 7
