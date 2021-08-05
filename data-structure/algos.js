// Split the array based on size and return the 2-D array
export const chunkArrayInGroups = (arr, size) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i += size) {
    newArr.push(arr.slice(i, i + size));
  }
  return newArr;
};

// Return the sum of those two numbers plus the sum of all the numbers between them.
// Array passed can be in any order
export const sumAll = (arr) => {
  const sortedArr = arr.sort((a, b) => a - b);
  let betweenNumbers = [];
  let numbersToBeGenerated = Math.max(...arr) - Math.min(...arr) - 1; //sortedArr[sortedArr.length - 1] - sortedArr[0] - 1;
  let newNumber = sortedArr[0];

  for (let i = 0; i < numbersToBeGenerated; i++) {
    betweenNumbers.push(newNumber + 1);
    newNumber += 1;
  }
  const sumOfAll = arr
    .concat(betweenNumbers)
    .reduce((prev, next) => prev + next, 0);

  return sumOfAll;
};

// export const sumAll = arr => {
//   var sum = 0;
//   for (var i = Math.min(...arr); i <= Math.max(...arr); i++) {
//     sum += i;
//   }
//
//   return sum;
// }

// export const sumAll = arr => {
//   var sortedArr = arr.sort((a,b) => a-b);
//   var firstNum = arr[0];
//   var lastNum = arr[1];
//
//   // Using Arithmetic Progression summing formula
//   var sum = (lastNum - firstNum + 1) * (firstNum + lastNum) / 2;
//
//   return sum;
// }

// export const sumAll = arr => {
//   var max = Math.max(arr[0], arr[1]);
//   var min = Math.min(arr[0], arr[1]);
//   var sum = 0;
//   for (var i = min; i <= max; i++) {
//     sum += i;
//   }

//   return sum;
// }

// Find the difference between the arrays
export const arrayDiff = (arr1, arr2) =>
  arr1.filter((item) => !arr2.includes(item));

export function destroyer(arr) {
  // arguments is not available when you use arrow functions
  const toBeRemoved = Array.from(arguments);
  // Remove all the values in both the arrays
  return arr.filter((item) => !toBeRemoved.includes(item));
}

export const whatIsInAName = (collection, source) => {
  var srcKeys = Object.keys(source)

  return collection.filter(function (obj) {
    return srcKeys.every(function (key) {
      return obj.hasOwnProperty(key) && obj[key] === source[key];
    });
  });
};

// Balanced braces
var stack = [];

export const checkParentheses = (word) => {
  var map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  for (var i = 0; i < word.length; i++) {
    if (word[i] === "(" || word[i] === "[" || word[i] === "{") {
      stack.push(word[i]);
    } else {
      var last = stack.pop();

      if (word[i] !== map[last]) {
        return false;
      }
    }
  }

  if (stack.length !== 0) {
    return false;
  }

  return true;
};

// Remove duplicates in a string

// let repeatedStr = "abcddsaddals";

// console.log("Unique strings using Set:", [...new Set(repeatedStr)].join(""));

// First non repeating char in a given string
// search by indexOf and lastIndex if they match that is the first non-repeated char
export const nonRepeatedChar = (str) => {
  const result = str
    .split("") // split it into array so that we can apply map and filter higher order functions on them
    .filter((char) => str.indexOf(char) === str.lastIndexOf(char));
  // console.log(`First non-repeated string in '${str}' is: ${result}`);
  // for (let i = 0; i < str.length; i++) {
  //   if (str.indexOf(str.charAt(i)) === str.lastIndexOf(str.charAt(i))) {
  //     return str.charAt(i);
  //   }
  // }
  return result;
};

// google interview question with O(n) complexity
export const firstRecurringNumber = (input) => {
  const map = {};

  for (let i = 0; i < input.length; i++) {
    if (map[input[i]] !== undefined) {
      return input[i];
    } else {
      map[input[i]] = i;
    }
  }
};

// With O(n^2) complexity
export const firstRecurringNumberImperitive = (input) => {
  const map = {};

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; i++) {
      if (input[i] === input[j]) {
        return input[i];
      }
    }
  }
  return undefined;
};

/* Reverse a string */
export const reverseStringArr = (str) => {
  if (!str || typeof str !== "string") {
    return;
  }
  if (str.length < 2) {
    return str;
  }

  const reversedArray = [];
  const totalItems = str.length - 1;
  for (let i = totalItems; i >= 0; i--) {
    reversedArray.push(str[i]);
  }

  return reversedArray.join("");
};

export const reverseStringLib = (str) => {
  // return [...str].reverse().join('') // with destructuring
  return str.split("").reverse().join("");
};

/* Merge sorted arrays */
export const mergeSortedArrays = (arr1, arr2) => {
  let mergedArray = [];
  let array1Item = arr1[0];
  let array2Item = arr2[0];
  let i = 1;
  let j = 1;

  if (!arr1 || !arr2) {
    return;
  }

  if (arr1.length === 0) {
    return arr2;
  }

  if (arr2.length === 0) {
    return arr1;
  }

  while (array1Item || array2Item) {
    if (!array2Item || array1Item < array2Item) {
      mergedArray = [...mergedArray, array1Item];
      array1Item = arr1[i];
      i++;
    } else {
      mergedArray = [...mergedArray, array2Item];
      array2Item = arr2[j];
      j++;
    }
  }

  return mergedArray;
};

// Log all the pairs of an array
// for an array, a = [1,2,3] => [1,1], [1,2], [1,3], [2, 1], [2, 2], [2, 3] and son on
export const printAllThePairs = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // For non-repeating pair for eg., [1, 2] and [2, 1] are start second loop from index i + 1,
    // to print each and every pair, start from index 0
    for (let j = 0; j < arr.length; j++) {
      console.log([arr[i], arr[j]]);
    }
  }
};

// If it has length > 1 we can say they have the common item in them
export const commonItemsInTheArray = (arr1, arr2) => {
  // for(let i = 0; i < arr1.length; i++) {
  //   for(let j = 0; j < arr2.length; j++) {
  //     if(arr1[i] === arr2[j]) {
  //       return true; // Or return the item from either of the array
  //     }
  //   }
  // }
  // Takes O(n^2) time because it loops over each items
  return arr1.filter((item) => arr2.includes(item));
};

// Convert the first arr to a object and compare with object properties
// of obj with arr2, so that it would reduce the time by O(n + m)
// Object lookup will take constant time of O(1)
export const commonItemsInTheArrayImproved = (arr1, arr2) => {
  const arrayToObj = {};
  let commonItemFound = false;
  arr1.forEach((item) => {
    if (!arrayToObj[item]) {
      arrayToObj[item] = true;
    }
  });

  arr2.forEach((item) => {
    if (arrayToObj[item]) {
      commonItemFound = true;
    }
  });
  return commonItemFound;
};

// return true if an array pair is equal to sum
// arr = [1,2,3,4,5], sum = 9 => true
export const hasPairWithSum = (arr, sum) => {
  const resultSet = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (resultSet.has(arr[i])) {
      return true;
    }
    resultSet.add(sum - arr[i]);
  }
  return false;
};

// strings: ['abc', 'cc', 'c', 'cc', 'abc'] queries: ['abc', 'cc']
// output: [2, 0] => Frequency of query strings found in the string
function matchingStrings(strings, queries) {
  const res = [];
  for (let i = 0; i < queries.length; i++) {
    let count = 0;

    strings.map((str) => {
      if (str === queries[i]) {
        count++;
      }

      res[i] = count;
    });
  }

  return res;
}

// Recursive solution to palindrome
export const isPalindrome = (str) => {
  if (!str || typeof str !== "string") {
    return false;
  }

  if (str.length < 2) {
    return true;
  }

  if (str.charAt(0) !== str.charAt(str.length - 1)) {
    return false;
  }

  return isPalindrome(str.slice(1, str.length - 1));
}

// Recursive solution to decimal to binary
export const decimalToBinary = (num) => {
  if (num === 0) {
    return "0";
  }

  return decimalToBinary(num / 2) + (num % 2).toString();
}

// Binary search by divide and conquer
export const binarySearch = (arr, left, right, itemToBeSearched) => {
  if (left > right) {
    return;
  }
  const mid = Math.floor((left + right) / 2)

  if (itemToBeSearched === arr[mid]) {
    console.log(`Binary search: item ${itemToBeSearched} found at index ${mid}`)
    return arr[mid];
  }

  if (itemToBeSearched < arr[mid]) {
    return binarySearch(arr, left, mid - 1, itemToBeSearched)
  }

  return binarySearch(arr, mid + 1, right, itemToBeSearched)
}

// merge sort - divide and conquer
const merge = (arr, start, mid, end) => {
  // create a temp array
  const temp = new Array(end - start + 1);

  // crawlers for both intervals and for temp
  let i = start
  let j = mid + 1
  let k = 0

  // traverse both arrays and in each iteration add smaller of both elements in temp
  while (i <= mid && j <= end) {
    if (arr[i] <= arr[j]) {
      temp[k] = arr[i]; // could be, temp[k++] = arr[i++] and remove the increment steps
      k += 1; i += 1;
    }
    else {
      temp[k] = arr[j];
      k += 1; j += 1;
    }
  }

  // add elements left in the first array
  while (i <= mid) {
    temp[k] = arr[i];
    k += 1; i += 1;
  }

  // add elements left in the second array
  while (j <= end) {
    temp[k] = arr[j];
    k += 1; j += 1;
  }

  // copy temp to original interval
  for (i = start; i <= end; i += 1) {
    arr[i] = temp[i - start]
  }
}

export const mergeSort = (arr, start, end) => {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    console.log({start, end})
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }

  // return arr
}


const merge1 = (left, right) => {
  let arr = []
  // Break out of loop if any one of the array gets empty
  while (left.length && right.length) {
    // Pick the smaller among the smallest element of left and right sub arrays
    if (left[0] < right[0]) {
      arr.push(left.shift())
    } else {
      arr.push(right.shift())
    }
  }

  // Concatenating the leftover elements
  // (in case we didn't go through the entire left or right array)
  return [...arr, ...left, ...right]
}

export const mergeSort1 = array => {
  const half = array.length / 2

  // Base case or terminating case
  if (array.length < 2) {
    return array
  }

  const left = array.splice(0, half)
  return merge1(mergeSort1(left), mergeSort1(array))
}

// String reverse using recursively
export const recursiveReverseString = str => {
  if(str === '') return ''

  return recursiveReverseString(str.substring(1)) + str.charAt(0)
}
