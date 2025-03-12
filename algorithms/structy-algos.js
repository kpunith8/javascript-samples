// https://structy.net/problems/token-replace
// Use 2 pointer technique
// O(n) - Space and time complexity
const tokenReplace = (s, tokens) => {
  let result = "";
  let i = 0;
  let j = 1;

  while (i < s.length) {
    if (s[i] !== "$") {
      result += s[i];
      i += 1;
      j = i + 1;
    } else if (s[j] !== "$") {
      j += 1;
    } else {
      const key = s.slice(i, j + 1);
      result += tokens[key];
      i = j + 1;
      j = i + 1;
    }
  }

  return result;
};

const inputString = "Hello, my name is $name$ and I'm $age$ years old.";
const tokens = {
  $name$: "Jane",
  $age$: 30,
};

console.log("tokenReplace:", tokenReplace(inputString, tokens));

// https://structy.net/problems/token-transform
// O(n ^ m) - Space and time complexity
const tokenTransform = (s, tokens) => {
  let result = [];
  let i = 0;
  let j = 1;

  while (i < s.length) {
    if (s[i] !== "$") {
      result.push(s[i]);
      i += 1;
      j = i + 1;
    } else if (s[j] !== "$") {
      j += 1;
    } else {
      const key = s.slice(i, j + 1);
      const value = tokens[key];
      // Use recursion to evaluate the value of the token
      const evaluatedValue = tokenTransform(value, tokens);
      // Storing the evalulated value by mutating the tokens improves execution time
      // We can also make use dynamic programming techique to reduce the memory usage
      tokens[key] = evaluatedValue;
      result.push(evaluatedValue);
      i = j + 1;
      j = i + 1;
    }
  }

  return result.join("");
};

const tokens1 = {
  $1$: "a$2$",
  $2$: "b$3$",
  $3$: "c$4$",
  $4$: "d$5$",
  $5$: "e$6$",
  $6$: "f!",
};

console.log(
  "tokenTransform:",
  tokenTransform("$1$ $1$ $1$ $1$ $1$ $1$ $4$ $4$", tokens1)
);

// https://structy.net/problems/anagrams
// Anagrams are strings that contain the same characters, but in any order.
// Time: O(n + m)
// Space: O(n + m)
const anagrams = (s1, s2) => {
  const count = {};

  // Count each character in the first string
  for (let char of s1) {
    if (!count[char]) {
      count[char] = 0;
    }
    count[char] += 1;
  }

  // Decrement by one if the character is present in the second string
  for (let char of s2) {
    if (count[char] === undefined) {
      return false;
    } else {
      count[char] -= 1;
    }
  }

  for (let char in count) {
    if (count[char] !== 0) {
      return false;
    }
  }

  return true;
};

console.log("anagrams:", anagrams("restful", "fluster"));

// https://structy.net/problems/most-frequent-char
const mostFrequentChar = (s) => {
  const count = {};

  for (let char of s) {
    if (char in count) {
      count[char] += 1;
    } else {
      count[char] = 0;
    }
  }

  let best = null;
  for (let char in count) {
    if (best === null || count[char] > count[best]) {
      best = char;
    }
  }

  return best;
};

console.log("mostFrequentChar:", mostFrequentChar("bookeepero"));

const pairSum = (numbers, targetSum) => {
  const previousNumbers = {};

  for (let i = 0; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const complement = targetSum - currentNumber; // For the pair product, use targetSum / currentNumber
    if (previousNumbers[complement] !== undefined) {
      return [previousNumbers[complement], i];
    } else {
      previousNumbers[currentNumber] = i;
    }
  }
};

console.log("pairSum:", pairSum([1, 2, 3, 4, 6], 6));

// https://structy.net/problems/uncompress
const uncompress = (s) => {
  let result = [];
  const numbers = "0123456789";
  let i = 0;
  let j = 0;

  while (j < s.length) {
    if (numbers.includes(s[j])) {
      j += 1;
    } else {
      const count = Number(s.slice(i, j));
      for (let k = 0; k < count; k += 1) {
        result.push(s[j]); // String concatenation would take O(n) time complexity
      }

      j += 1;
      i = j;
    }
  }

  return result.join("");
};

console.log("uncompress:", uncompress("2a5b1c"), uncompress("10g"));
