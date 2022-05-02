// Merge sort - Divide and Conquer
// O(n log n)
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
    console.log({ start, end })
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }

  return arr
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
