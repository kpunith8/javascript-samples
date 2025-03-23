let stack = [];

const checkParentheses = (word) => {
  const map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  for (let i = 0; i < word.length; i++) {
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

console.log("balanced parens:", checkParentheses("{()}()"));

// Find the difference between arrays using set
// Assuming firstArr doesn't have duplicate items
const arrayDiff = (firstArr, comparisonArray) => {
  const uniqueSecondArr = new Set(comparisonArray);
  return firstArr.filter((elem) => !uniqueSecondArr.has(elem));
};

const uniqueArray = (arr) =>
  arr.filter((item, index, array) => array.indexOf(item) === index);

console.log("uniqueArray", uniqueArray([1, 2, 3, 1, 4, 2, 3]));

// Both arrays can have duplicate items
const arrayDiff1 = (firstArr, comparisonArray) => {
  const uniqueFirstArr = uniqueArray(firstArr);
  const uniqueSecondArr = uniqueArray(comparisonArray);

  return uniqueFirstArr.filter((elem) => !uniqueSecondArr.includes(elem));
};

const arr1 = [23, 1, 44, 53, 3, 2, 89, 21, 11];

const reverseStringImperative = (str) => {
  let reversed = "";
  for (const c of str) {
    reversed = c + reversed;
  }
  // for (let i = str.length - 1; i >= 0; i--) {
  //   reversed += str[i];
  // }
  return reversed;
};

const reverseStringRecursive = (str) => {
  if (str.length === 0) return;
  if (str.length === 1) return str;
  return reverseStringRecursive(str.substr(1)) + str[0];
};

console.log("string reverse: recursive:", reverseStringRecursive("abcde"));

const reverseStringReduce = (str) => {
  return str.split("").reduce((r, c) => c + r, "");
};

const palindromeRecursive = (str) => {
  // Remove non alphabet chars and compare
  // replace(/[^\w]/g, "").replace(/_/g, "")
  str = str.replace(/[\W_\s]/g, "").toLowerCase();
  if (str.length === 1) return true;
  if (str.length === 2) return str[0] === str[1];

  if (str[0] === str[str.length - 1]) {
    return palindromeRecursive(str.slice(1, str.length - 1));
  }

  return false;
};

console.log("Recursive palindrome:", palindromeRecursive("mad-_d.$   am"));

const palindromeImperative = (str) => str.split("").reverse().join("") === str;

const palindromeImperative1 = (str) => {
  let reversedString = "";
  let length = str.length;

  while (length >= 1) {
    reversedString += str[length - 1];
    length--;
  }

  return reversedString === str;
};

console.log("Imperative Palindrone:", palindromeImperative("maam"));
console.log("Imperative Palindrone:", palindromeImperative1("maddam"));

// Duplicate items in an array
const numbers = [1, 2, 3, 2, 4, 5, 5, 6];

// Removes the duplicates
const set = new Set(numbers);

const duplicatesUsingSet = numbers.filter((item) => {
  if (set.has(item)) {
    set.delete(item);
  } else {
    return item;
  }
});

const numbers1 = [1, 2, 3, 2, 2, 4, 5, 5, 6, 5];

// Output may contain duplicate items if those items occur more than twice in the array
// Call Set on the result to remove the duplicates in the output
const duplicatesUsingIndexOf = numbers1.filter(
  (item, index) => index !== numbers1.indexOf(item)
);

console.log({ duplicatesUsingSet, duplicatesUsingIndexOf });

const countOccuranceOfNumbers = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item]: ++acc[item] || 1 }), {});

const countOccuranceOfNumbersMap = (arr) => {
  const recurrenceCount = {};
  arr.map((item) => {
    if (item in recurrenceCount) {
      recurrenceCount[item] = recurrenceCount[item] + 1;
    } else {
      recurrenceCount[item] = 1;
    }
  });
  // Pick the number having highest occurence in the array
  // [2, 3, 2, 3, 3, 1, 1] => Should return 3, because number 3 repeats 3 times.
  let result = { count: 0 };

  for (let key in recurrenceCount) {
    if (recurrenceCount[key] > result.count) {
      result = { number: key, count: recurrenceCount[key] };
    }
  }

  return { recurrenceCount, result };
};

const occurrencesOf = (numbers, number) =>
  numbers.reduce(
    (counter, currentNumber) =>
      number === currentNumber ? counter + 1 : counter,
    0
  );

console.log(
  "Count the occurence of a number(reduce):",
  countOccuranceOfNumbers([1, 2, 3, 4, 2, 3, 4])
);
console.log(
  "\nCount the occurence of a number(map):",
  countOccuranceOfNumbersMap([1, 2, 3, 4, 2, 3, 4, 1, 3, 1, 3])
);

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

console.log("First recurring number:", firstRecurringChar([1, 2, 3, 1, 1]));
console.log("First recurring char:", firstRecurringChar("abcdeffhdd"));

// Sieve of Earosthenes algorithm to print all prime numbers to less than or equal to given integer

// Prime number: Number which can be divided by 1 and itself
// 2 is only the even prime number

function sieveOfEratosthenes(n) {
  const primes = new Array(n + 1);
  primes.fill(true); // set all as true initially
  primes[0] = primes[1] = false; // Handling case for 0 and 1
  const sqrtn = Math.ceil(Math.sqrt(n));
  for (let i = 2; i <= sqrtn; i++) {
    if (primes[i]) {
      for (let j = 2 * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }

  for (let i = 2; i <= n; i++) {
    if (primes[i]) {
      console.log(i);
    }
  }
}

console.log("\nSieve of Earosthenes algorithm:", sieveOfEratosthenes(60));

// Tar = Rat
// Arc = Car
const checkAnagram = (str1, str2) => {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  let notAnagramStr = `${str1} and ${str2} are not anagrams`;
  if (str1.length !== str2.length) return notAnagramStr;

  const str1Count = {};
  const str2Count = {};

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] in str1Count) {
      str1Count[str1[i]] = str1Count[str1[i]] + 1;
    } else {
      str1Count[str1[i]] = 1;
    }
  }

  for (let j = 0; j < str2.length; j++) {
    if (str2[j] in str2Count) {
      str2Count[str2[j]] = str2Count[str2[j]] + 1;
    } else {
      str2Count[str2[j]] = 1;
    }
  }

  let result = { isAnagram: false };
  for (let k in str1Count) {
    // return {isAnagram: str2Count[k] === str1Count[k]}
    if (str2Count[k] === str1Count[k]) {
      result = { ...result, isAnagram: true };
    } else {
      result = { ...result, isAnagram: false };
    }
  }

  return result.isAnagram ? `${str1} and ${str2} are anagrams` : notAnagramStr;
};

console.log("\nAnagrams:", checkAnagram("arc", "ara"));

// Function to return gcd of a and b
function gcdEucledean(a, b) {
  if (a === 0) return b;
  return gcdEucledean(b % a, a);
}

// Function to find gcd of array of numbers
function findGCDOfN(arr) {
  let result = arr[0];
  let length = arr.length;
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
  return (a * b) / gcdEucledean(a, b);
}

console.log("GCD of N numbers:", findGCDOfN([12, 36, 60]), lcm(12, 15));

// bbbbb => 1
// abcabdabc => 3
const longestSubstringWithoutRepeatingChars = (str) => {
  const res = {};
  const temp = [];
  for (let char of str) {
    if (res[char]) {
      res[char] = parseInt(res[char]) + 1;
    } else {
      res[char] = 1;
      temp.push(char);
      console.log(temp);
    }
  }

  return temp.length;
};

console.log(
  "longestSubstringWithoutRepeatingChars",
  longestSubstringWithoutRepeatingChars("abbbbbabcfeabcdefg"), // Fix needed for this
  longestSubstringWithoutRepeatingChars("bbbbb"),
  longestSubstringWithoutRepeatingChars("abcdef")
);

const str = "the quick brown fox jumps over the lazy dog";

const checkPangram = (str) => {
  let str1 = str.toLowerCase();
  let alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

  for (let i = 0; i < alphabets.length; i++) {
    if (str1.indexOf(alphabets[i]) < 0) {
      return false;
    }
  }
  return true;
};

console.log("Check Panagram:", checkPangram(str));

// Search through Facebook friends, looking for the closest friend that owned a dog.
// Graph problem - DFS
const graph = {};
graph.tyler = [
  { id: "henry", dog: false },
  { id: "john", dog: false },
  { id: "aimee", dog: false },
];
graph.henry = [
  { id: "peggy", dog: false },
  { id: "keli", dog: false },
];
graph.john = [{ id: "keli", dog: true }];
graph.aimee = [];
graph.peggy = [];
graph.keli = [{ id: "claire", dog: true }];
graph.claire = [];

function search(name) {
  let searchQueue = [].concat(graph[name]);
  let searched = [];
  while (searchQueue.length) {
    let person = searchQueue.shift();
    if (!searched.find((n) => n.id === person.id)) {
      if (person.dog) return `${person.id} has a dog`;
      else {
        searchQueue = searchQueue.concat(graph[person.id]);
        searched.push(person);
      }
    }
  }
  return "There are no friends that have a dog";
}

console.log(search("tyler"));

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
  console.log("Minimum denominations reqiured are:");
  for (let i = 0; i < 9; i++) {
    if (noteCounter[i] !== 0) {
      console.log(`${notes[i]}: ${noteCounter[i]}`);
    }
  }
}

countCurrency(2345);

// Remove duplicates in the string
let repeatedStr = "abcddsaddals";
const nonRepetedStr = repeatedStr
  .split("")
  .filter((item, idx, arr) => arr.indexOf(item) === idx)
  .join("");

console.log("nonRepetedStr:", nonRepetedStr);
