/* Reverse a string */
export const reverseStringArr = str => {
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

export const reverseStringLib = str => {
  // return [...str].reverse().join('') // with destructuring
  return str
    .split("")
    .reverse()
    .join("");
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


// export { mergeSortedArrays, reverseStringArr, reverseStringLib };
