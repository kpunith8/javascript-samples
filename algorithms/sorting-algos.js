const arr1 = [3, 0, 2, 5, -1, 4, 1];

// Compare the next element and swap if its greater than the previous, O(n^2)
const bubbleSort = (arr) => {
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (arr[j] > arr[j + 1]) {
        //   let temp = arr[j];
        //   arr[j] = arr[j + 1];
        //   arr[j + 1] = temp;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
};

console.log("Bubble sort:", bubbleSort(arr1));

// Find the minimum element in the list and swap with the first element and so on, O(n^2)
// First item in the array becomes min
const selectionSort = (arr) => {
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    let min = i;
    let temp = arr[i];

    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
      arr[i] = arr[min];
      arr[min] = temp;
    }
  }
  return arr;
};

console.log("Selection sort:", selectionSort(arr1));

// Inserstion sort
const insertionSort = (arr) => {
  const length = arr.length;
  // First item in the array considered sorted by default and compared and inserted
  for (let i = 1; i < length; i++) {
    let temp = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = temp;
  }
  return arr;
};

console.log("Insertion sort:", insertionSort([3, 0, 2, 5, -1, 4, 1]));

// Bubble, selection, and insertion sorts, sort the array in place doesn't take more memory hence space complexity is O(1)

// egghead.io - Quick sort
// O(n log n)
function quickSort(array) {
  if (array.length < 2) return array;
  let pivotIndex = Math.floor(array.length / 2);
  let pivot = array[pivotIndex];
  let less = [];
  let greater = [];
  for (let i in array) {
    if (i !== pivotIndex) {
      array[i] > pivot ? greater.push(array[i]) : less.push(array[i]);
    }
  }
  return [...quickSort(less), pivot, ...quickSort(greater)];
}

console.log("quick sort", quickSort([6, 5, 4, 3, 2, 1]));

// Merge sort - Divide and Conquer
// O(n log n)
const merge = (arr, start, mid, end) => {
  // create a temp array
  const temp = new Array(end - start + 1);

  // crawlers for both intervals and for temp
  let i = start;
  let j = mid + 1;
  let k = 0;

  // traverse both arrays and in each iteration add smaller of both elements in temp
  while (i <= mid && j <= end) {
    if (arr[i] <= arr[j]) {
      temp[k] = arr[i]; // could be, temp[k++] = arr[i++] and remove the increment steps
      k += 1;
      i += 1;
    } else {
      temp[k] = arr[j];
      k += 1;
      j += 1;
    }
  }

  // add elements left in the first array
  while (i <= mid) {
    temp[k] = arr[i];
    k += 1;
    i += 1;
  }

  // add elements left in the second array
  while (j <= end) {
    temp[k] = arr[j];
    k += 1;
    j += 1;
  }

  // copy temp to original interval
  for (i = start; i <= end; i += 1) {
    arr[i] = temp[i - start];
  }
};

export const mergeSort = (arr, start, end) => {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    // recursively divide the array into two halves
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    // merge the sorted halves
    merge(arr, start, mid, end);
  }

  return arr;
};

const merge1 = (left, right) => {
  let arr = [];
  // Break out of loop if any one of the array gets empty
  while (left.length && right.length) {
    // Pick the smaller among the smallest element of left and right sub arrays
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  // Concatenating the leftover elements
  // (in case we didn't go through the entire left or right array)
  return [...arr, ...left, ...right];
};

export const mergeSort1 = (array) => {
  const half = array.length / 2;

  // Base case or terminating case
  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);
  return merge1(mergeSort1(left), mergeSort1(array));
};

/* Merge 2 sorted arrays */
const mergeSortedArrays2 = (arr1, arr2) => {
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

console.log(
  "Merge sorted arrays:",
  mergeSortedArrays2([1, 2, 8, 9], [3, 4, 5, 6, 7])
);

const mergeSortedArrays = (arr1, arr2) => {
  const res = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    res.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    res.push(arr2[j]);
    j++;
  }

  return res;
};

const mergeSortedArrays1 = (left, right) => {
  let arr = [];
  // Break out of loop if any one of the array gets empty
  while (left.length && right.length) {
    // Pick the smaller among the smallest element of left and right sub arrays
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  // Concatenating the leftover elements
  // (in case we didn't go through the entire left or right array)
  return [...arr, ...left, ...right];
};

console.log(
  "Merge sorted arrays",
  mergeSortedArrays1([0, 2, 3, 4, 6, 8], [0, 1, 4, 5])
);
