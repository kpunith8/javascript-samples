let stack = [];

const checkParentheses = (word) => {
  const map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  for (var i = 0; i < word.length; i++) {
    if (word[i] === "(" || word[i] === "[" || word[i] === "{") {
      stack.push(word[i]);
    } else {
      const last = stack.pop();

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

console.log('balanced parens:', checkParentheses("{()}()"))

/* Merge sorted arrays */
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

console.log('Merge sorted arrays:', mergeSortedArrays2([1, 2, 8, 9], [3, 4, 5, 6, 7]))

const mergeSortedArrays = (arr1, arr2) => {
  const res = []
  let i = 0
  let j = 0

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i])
      i++
    } else {
      res.push(arr2[j])
      j++
    }
  }

  while (i < arr1.length) {
    res.push(arr1[i]);
    i++
  }

  while (j < arr2.length) {
    res.push(arr2[j])
    j++
  }

  return res
}

const mergeSortedArrays1 = (left, right) => {
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

console.log('Merge sorted arrays', mergeSortedArrays1([0, 2, 3, 4, 6, 8], [0, 1, 4, 5]))

// Find the difference between arrays using set
// Assuming firstArr doesn't have duplicate items
const arrayDiff = (firstArr, comparisonArray) => {
  const uniqueSecondArr = new Set(comparisonArray);
  return firstArr.filter(elem => !uniqueSecondArr.has(elem));
};

const uniqueArray = arr => arr.filter((item, index, array) => array.indexOf(item) === index)

console.log('uniqueArray', uniqueArray([1, 2, 3, 1, 4, 2, 3]))

// Both arrays can have duplicate items
const arrayDiff1 = (firstArr, comparisonArray) => {
  const uniqueFirstArr = uniqueArray(firstArr)
  const uniqueSecondArr = uniqueArray(comparisonArray)

  return uniqueFirstArr.filter(elem => !uniqueSecondArr.includes(elem))
}

const arr1 = [23, 1, 44, 53, 3, 2, 89, 21, 11]

// Compare the next element and swap if its greater than the previous, O(n^2)
const bubbleSort = (arr) => {
  const length = arr.length

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }

  return arr
}

console.log('Bubble sort:', bubbleSort(arr1))

// Find the minimum element in the list and swap with the first element and so on, O(n^2)

// First item in the array becomes min
const selectionSort = arr => {
  const length = arr.length

  for (let i = 0; i < length; i++) {
    let min = i
    let temp = arr[i]

    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
      arr[i] = arr[min]
      arr[min] = temp
    }
  }
  return arr
}

console.log('Selection sort:', selectionSort(arr1))

// Insert the minimum number found to the right position
const insertionSort = arr => {
  const length = arr.length
  for (let i = 0; i < length; i++) {
    if (arr[i] < arr[0]) {
      // Move the number to first position
      arr.unshift(arr.splice(i, 1)[0])
    } else {
      // Move the number to the right position
      for (let j = 1; j < i; j++) {
        if (arr[i] > arr[j - 1] && arr[i] < arr[j]) {
          arr.splice(j, 0, arr.splice(j, 1)[0])
        }
      }
    }
  }
  return arr
}

console.log('Insertion sort:', insertionSort(arr1))

// Inserstion sort - another version
const insertionSort1 = arr => {
  const length = arr.length
  // First item in the array considered sorted by default and compared and inserted
  for (let i = 1; i < length; i++) {
    let temp = arr[i]
    let j = i - 1

    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j]
      j--
    }

    arr[j + 1] = temp
  }
  return arr
}

console.log('Insertion sort:', insertionSort1([3, 0, 2, 5, -1, 4, 1]))

// Bubble, selection, and insertion sorts, sort the array in place doesn't take more memory hence space complexity is O(1)



const reverseStringImperative = (str) => {
  let reversed = '';
  for (const c of str) {
    reversed = c + reversed;
  }
  // for (let i = str.length - 1; i >= 0; i--) {
  //   reversed += str[i];
  // }
  return reversed;
}

const reverseStringRecursive = (str) => {
  if (str.length === 0) return
  if (str.length === 1) return str
  return reverseStringRecursive(str.substr(1)) + str[0]
}

console.log('string reverse: recursive:', reverseStringRecursive('abcde'))

const reverseStringReduce = (str) => {
  return str.split('').reduce((r, c) => c + r, '');
}

const palindromeRecursive = str => {
  // Remove non alphabet chars and compare
  // replace(/[^\w]/g, "").replace(/_/g, "")
  str = str.replace(/[\W_\s]/g, "").toLowerCase()
  if (str.length === 1) return true;
  if (str.length === 2) return str[0] === str[1];

  if (str[0] === str[str.length - 1]) {
    return palindromeRecursive(str.slice(1, str.length - 1))
  }

  return false
}

console.log('Recursive palindrome:', palindromeRecursive('mad-_d.$   am'))

const palindromeImperative = str => str.split('').reverse().join('') === str

const palindromeImperative1 = str => {
  let reversedString = ''
  let length = str.length

  while (length >= 1) {
    reversedString += str[length - 1]
    length--
  }


  return reversedString === str
}

console.log('Imperative Palindrone:', palindromeImperative('maam'))
console.log('Imperative Palindrone:', palindromeImperative1('maddam'))


// Duplicate items in an array
const numbers = [1, 2, 3, 2, 4, 5, 5, 6];

// Removes the duplicates
const set = new Set(numbers);

const duplicatesUsingSet = numbers.filter(item => {
  if (set.has(item)) {
    set.delete(item);
  } else {
    return item;
  }
});


const numbers1 = [1, 2, 3, 2, 2, 4, 5, 5, 6, 5];

// Output may contain duplicate items if those items occur more than twice in the array
// Call Set on the result to remove the duplicates in the output
const duplicatesUsingIndexOf = numbers1.filter((item, index) => index !== numbers1.indexOf(item));

console.log({ duplicatesUsingSet, duplicatesUsingIndexOf })

const countOccuranceOfNumbers = arr => arr.reduce((acc, item) => ({ ...acc, [item]: ++acc[item] || 1 }), {})

const countOccuranceOfNumbersMap = arr => {
  const recurrenceCount = {}
  arr.map(item => {
    if (item in recurrenceCount) {
      recurrenceCount[item] = recurrenceCount[item] + 1
    } else {
      recurrenceCount[item] = 1
    }
  })
  // Pick the number having highest occurence in the array
  // [2, 3, 2, 3, 3, 1, 1] => Should return 3, because number 3 repeats 3 times.
  let result = { count: 0 }

  for (let key in recurrenceCount) {
    if (recurrenceCount[key] > result.count) {
      result = { number: key, count: recurrenceCount[key] }
    }
  }

  return { recurrenceCount, result }
}

const occurrencesOf = (numbers, number) => numbers.reduce((counter, currentNumber) => (number === currentNumber ? counter + 1 : counter), 0);

console.log('Count the occurence of a number(reduce):', countOccuranceOfNumbers([1, 2, 3, 4, 2, 3, 4]))
console.log('\nCount the occurence of a number(map):', countOccuranceOfNumbersMap([1, 2, 3, 4, 2, 3, 4, 1, 3, 1, 3]))

// Find the first recurring charcter in a string or an array
// google interview question with O(n) complexity
// input: string or array of numbers
const firstRecurringChar = (input) => {
  const map = {};

  for (let i = 0; i < input.length; i++) {
    // If the map already has the key mapped to current value, return it
    if (map[input[i]]) {
      return input[i];
    } else {
      // If the key not found add it to the map
      map[input[i]] = i;
    }
  }
};

console.log('First recurring number:', firstRecurringChar([1, 2, 3, 1, 1]))
console.log('First recurring char:', firstRecurringChar('abcdeffhdd'))

// Sieve of Earosthenes algorithm to print all prime numbers to less than or equal to given integer

// Prime number: Number which can be divided by 1 and itself
// 2 is only the even prime number

function sieveOfEratosthenes(n) {
  const primes = new Array(n + 1)
  primes.fill(true) // set all as true initially
  primes[0] = primes[1] = false // Handling case for 0 and 1
  const sqrtn = Math.ceil(Math.sqrt(n))
  for (let i = 2; i <= sqrtn; i++) {
    if (primes[i]) {
      for (let j = 2 * i; j <= n; j += i) {
        primes[j] = false
      }
    }
  }

  for (let i = 2; i <= n; i++) {
    if (primes[i]) {
      console.log(i)
    }
  }
}

console.log('\nSieve of Earosthenes algorithm:', sieveOfEratosthenes(60))

// Tar = Rat
// Arc = Car
const checkAnagram = (str1, str2) => {
  str1 = str1.toLowerCase()
  str2 = str2.toLowerCase()

  let notAnagramStr = `${str1} and ${str2} are not anagrams`
  if (str1.length !== str2.length) return notAnagramStr

  const str1Count = {}
  const str2Count = {}

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] in str1Count) {
      str1Count[str1[i]] = str1Count[str1[i]] + 1
    } else {
      str1Count[str1[i]] = 1
    }
  }

  for (let j = 0; j < str2.length; j++) {
    if (str2[j] in str2Count) {
      str2Count[str2[j]] = str2Count[str2[j]] + 1
    } else {
      str2Count[str2[j]] = 1
    }
  }

  let result = { isAnagram: false }
  for (let k in str1Count) {
    // return {isAnagram: str2Count[k] === str1Count[k]}
    if (str2Count[k] === str1Count[k]) {
      result = { ...result, isAnagram: true }
    } else {
      result = { ...result, isAnagram: false }
    }
  }


  return result.isAnagram ? `${str1} and ${str2} are anagrams` : notAnagramStr
}

console.log('\nAnagrams:', checkAnagram('arc', 'ara'))



// Function to return gcd of a and b
function gcdEucledean(a, b) {
  if (a == 0)
    return b;
  return gcdEucledean(b % a, a);
}

// Function to find gcd of array of numbers
function findGCDOfN(arr) {
  let result = arr[0];
  let length = arr.length
  for (let i = 1; i < length; i++) {
    result = gcdEucledean(arr[i], result);

    if (result == 1) {
      return 1;
    }
  }
  return result;
}

// Function to return LCM of 2 numbers
//  a x b = LCM(a, b) * GCD (a, b)
function lcm(a, b) {
  return (a * b) / gcdEucledean(a, b)
}

console.log("GCD of N numbers:", findGCDOfN([12, 36, 60]), lcm(12, 15))

// bbbbb => 1
// abcabdabc => 3
const longestSubstringWithoutRepeatingChars = str => {
  const res = {}
  const temp = []
  for (let char of str) {
    if (res[char]) {
      res[char] = parseInt(res[char]) + 1
    } else {
      res[char] = 1
      temp.push(char)
      console.log(temp)
    }
  }

  return temp.length
}

console.log('longestSubstringWithoutRepeatingChars', longestSubstringWithoutRepeatingChars('abbbbbabcfeabcdefg'), // Fix needed for this
  longestSubstringWithoutRepeatingChars('bbbbb'),
  longestSubstringWithoutRepeatingChars('abcdef'))

const str = "the quick brown fox jumps over the lazy dog"

const checkPangram = str => {
  let str1 = str.toLowerCase();
  let alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');

  for (let i = 0; i < alphabets.length; i++) {
    if (str1.indexOf(alphabets[i]) < 0) {
      return false;
    }
  }
  return true;
}

console.log('Check Panagram:', checkPangram(str))

// Interview Questions

// Nirman technologies interview question
let sentence = 'tools are fantastic to fix';

// odd length string reverse don't touch the middle char, other wise don't mmake any changes.

// output: ukmra hsiun is anmse my

const reverseOddLengthWords = str => {
  const splitWords = str.split(" ").reverse()
  let result = ''

  splitWords.forEach(splitWord => {
    const wordLength = splitWord.length
    if (wordLength % 2 !== 0) {
      const middleElement = Math.floor(wordLength / 2)
      let firstChars = splitWord.slice(0, middleElement).split("").reverse()
      let lastChars = splitWord.slice(middleElement + 1, wordLength).split("").reverse()
      let middleChar = splitWord[middleElement]

      result += [...firstChars, middleChar, ...lastChars].join("") + " "
    } else {
      result += splitWord + " "
    }
  })
  return result
}

console.log('reverseOddLengthWords:', reverseOddLengthWords(sentence))


// WhatFix interview question
// Find the smallest positive integer missing in the array
const arr = [4, 2, -1, 0, 3, 9, 1, -5]
const findSmallestMissing = (arr = []) => {
  let count = 1
  if (!arr.length) {
    return count
  }
  while (arr.indexOf(count) !== -1) {
    console.log('index', arr.indexOf(count))
    count++
  }

  return count
}

console.log('findSmallestMissing:', findSmallestMissing(arr));

// iterate through an object to get all the nested props
// https://www.tutorialspoint.com/recursively-list-nested-object-keys-javascript
// const recursiveSearch = (obj, results = [], parent) => {
//   const r = results
//   Object.keys(obj).forEach(key => {
//     const value = obj[key];
//     if (typeof value === 'object') {
//       r.push({ label: key, children: [] })
//       recursiveSearch(value, r, key)
//     } else {
//       r.filter(({ label }) => label === parent)[0].children.push({ label: key })
//     }
//   })

//   return r
// }

const printObject = obj => {
  // Base case: If the input is not an object, return
  if (typeof obj !== 'object' || obj === null) {
    return;
  }
  // Recursive case: Iterate over the object properties
  for (let key in obj) {
    // Skip inherited properties
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    // Print the key-value pair
    console.log(key + ':', obj[key]);

    // Recursively call the function for nested objects
    printObject(obj[key]);
  }
}

const obj1 = {
  name: {
    fName: "Punith",
    lName: "K",
  },
  address: {
    street: '3',
    place: {
      country: 'India',
      state: 'Karnataka',
    }
  }
}

// console.log('object iteratee:', JSON.stringify(recursiveSearch(obj1)))
printObject(obj1)

// egghead - algos
function quickSort(array) {
  if (array.length < 2) return array
  let pivotIndex = Math.floor(array.length / 2)
  let pivot = array[pivotIndex]
  let less = []
  let greater = []
  for (let i in array) {
    if (i != pivotIndex) {
      array[i] > pivot ? greater.push(array[i]) : less.push(array[i])
    }
  }
  return [
    ...quickSort(less),
    pivot,
    ...quickSort(greater)
  ]
}

console.log('quick sort', quickSort([6, 5, 4, 3, 2, 1]))


// Search through Facebook friends, looking for the closest friend that owned a dog.
// Graph problem - DFS
const graph = {}
graph.tyler = [{ id: 'henry', dog: false }, { id: 'john', dog: false }, { id: 'aimee', dog: false }]
graph.henry = [{ id: 'peggy', dog: false }, { id: 'keli', dog: false }]
graph.john = [{ id: 'keli', dog: true }]
graph.aimee = []
graph.peggy = []
graph.keli = [{ id: 'claire', dog: true }]
graph.claire = []

function search(name) {
  let searchQueue = [].concat(graph[name])
  let searched = []
  while (searchQueue.length) {
    let person = searchQueue.shift()
    if (!searched.find(n => n.id === person.id)) {
      if (person.dog) return `${person.id} has a dog`
      else {
        searchQueue = searchQueue.concat(graph[person.id])
        searched.push(person)
      }
    }
  }
  return "There are no friends that have a dog"
}

console.log(search('tyler'))

// Find minimum number of currency notes and values that sum to given amount
function countCurrency(amount) {
  let notes = [1000, 500, 200, 100, 50, 20, 10, 5, 1];
  let noteCounter = Array(9).fill(0);

  // count notes using Greedy approach
  for (let i = 0; i < 9; i++) {
    if (amount >= notes[i]) {
      noteCounter[i] = Math.floor(amount / notes[i]);
      amount = amount % notes[i];
    }
  }

  // Print notes
  console.log('Minimum denominations reqiured are:')
  for (let i = 0; i < 9; i++) {
    if (noteCounter[i] != 0) {
      console.log(`${notes[i]}: ${noteCounter[i]}`)
    }
  }
}

countCurrency(2345)


// mercor.ai - coding test
/*
import "./styles.css";
import { useState, useEffect, useCallback } from "react";

export default function App() {
  const [data, setData] = useState();
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://rickandmortyapi.com/api/character"
  );

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const chars = await global.fetch(nextPageUrl);
        const charsData = await chars.json();
        setData(charsData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, [nextPageUrl]);

  const onNextPageClick = useCallback(() => {
    if (data) {
      setNextPageUrl(data.info.next);
    }
  }, [data]);

  const onPrevPageClick = useCallback(() => {
    if (data) {
      setNextPageUrl(data?.info.prev);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      {data.results.map((char) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >
          <img
            src={char.image}
            alt={char.name}
            width="50"
            height="50"
            loading="lazy"
          />
          <div key={char.id}>{char.name}</div>
        </div>
      ))}
      <button
        style={{ marginRight: "10px" }}
        onClick={onPrevPageClick}
        disabled={data?.info.prev === null}
      >
        Prev Page
      </button>
      <button onClick={onNextPageClick}>Next Page</button>
    </div>
  );
}

*/

// Remove duplicates in the string
let repeatedStr = "abcddsaddals";
const nonRepetedStr = repeatedStr.split("").filter((item, idx, arr) => arr.indexOf(item) === idx).join("")

console.log("remove duplicates:", nonRepetedStr)
