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
