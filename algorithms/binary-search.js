// Binary search: Divide and Conquer
// O(n log n)
const binarySearch = (arr, left, right, itemToBeSearched) => {
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

export default binarySearch
