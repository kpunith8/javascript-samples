// Recursive solution to decimal to binary
export const decimalToBinary = (num) => {
  if (num === 0) {
    return "0";
  }

  return decimalToBinary(num / 2) + (num % 2).toString();
}

// String reverse using recursively
export const recursiveReverseString = str => {
  if (str === '') return ''

  return recursiveReverseString(str.substring(1)) + str.charAt(0)
}

// Recursive solution to palindrome
export const isPalindrome = (str) => {
  if (!str || typeof str !== "string") {
    return false;
  }

  // Remove special chars and _
  // str.replace(/[^\w\s]/g, "")
  str = str.replace(/[\W_\s]/g, "").toLowerCase()
  if (str.length === 1) return true;
  if (str.length === 2) return str[0] === str[1];

  if (str[0] === str[str.length - 1]) {
    return isPalindrome(str.slice(1, str.length - 1))
  }

  return false
}
