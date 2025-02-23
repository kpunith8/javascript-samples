// Forward networks interview question
/*
Implement a function memoize that memorizes a function by caching the result computed by that function.
It's a commonly used technique for speeding up computations. Your implementation should satisfy the following requirements.

memoize should work on functions with an arbitrary number of arguments of arbitrary types,
including primitives, arrays and objects. For example, it should work on all these functions:

function add(x, y) {
  return x + y;
}

function trim(str) {
  return str.trim();
}

function merge(arrA, arrB) {
  return [...arrA, ...arrB];
}


Only result from the most recent invocation is cached. For example:

function square(x) {
  return x * x;
}

const memoizedSquare = memoize(square);

memoizedSquare(1); // from computation
memoizedSquare(1); // from cache
memoizedSquare(2); // from computation
memoizedSquare(2); // from cache
memoizedSquare(1); // from computation


The memoized function has a method .clear() that clears the cached result.

memoizedSquare(3); // from computation
memoizedSquare(3); // from cache
memoizedSquare.clear();
memoizedSquare(3); // from computation


Non-primitive arguments are compared by deep equality instead of referential equality.
For example, {a: 1, b: 2} and {b: 2, a: 1} should be considered equal.

function compare(obj) {
  return obj.a > obj.b;
}

const memoizedCompare = memoize(compare);

memoizedCompare({a: 1, b: 2}); // from computation
memoizedCompare({a: 1, b: 2}); // from cache
memoizedCompare({b: 2, a: 1}); // from cache
*/
function memoize(func) {
  // we can use the object for storing the results in the cache
  // using map to story they key as objects better lookup
  const cache = new Map()

 // Sorting the keys of an object so that a single key can be used
 // to cache the data even if order of the keys are different
  function sortObjectKeys(args) {
    if (typeof args === 'object') {
      return Object.keys(args).sort().reduce((acc, key) => {
        acc[key] = args[key]
        return acc
      }, {})
    }
    return args
  }

  function memoizedFunction(...args) {
    const key = JSON.stringify(sortObjectKeys(...args))
    const result = func(...args)

     if (cache.has(key)) {
        console.log('from cache')
        return cache.get(key)
     }
    cache.set(key, result)
    console.log('from computation')
    return result
  }

  memoizedFunction.clear = function() {
    cache.clear()
  }

  return memoizedFunction
}

// ==============================
// Test suite #1 - Only most recent result is memoized

function square(x) {
  console.log(`computing ${x} * ${x}`);
  return x * x;
}

const memoizedSquare = memoize(square);

memoizedSquare(1); // from computation
memoizedSquare(1); // from cache
memoizedSquare(2); // from computation
memoizedSquare(2); // from cache
memoizedSquare(1); // from computation

// ==============================
// Test suite #2 - Can clear memoized result
// 2. Can clear memoized result

memoizedSquare(3); // from computation
memoizedSquare(3); // from cache
memoizedSquare.clear();
memoizedSquare(3); // from computation


// ==============================
// Test suite #3 - Works with arbitrary number of arguments (4 in this example)

function sum(a, b, c, d) {
  console.log(`computing ${a} + ${b} + ${c} + ${d}`);
  return a + b + c + d;
}

const memoizedSum = memoize(sum);

memoizedSum(1, 2, 3, 4); // from computation
memoizedSum(1, 2, 3, 4); // from cache
memoizedSum(2, 1, 3, 4); // from computation

// ==============================
// Test suite #4 - Non-primitive arguments are compared by deep equality

function compare(obj) {
  console.log(`comparing ${obj.a} and ${obj.b}`);
  return obj.a > obj.b;
}

const memoizedCompare = memoize(compare);

memoizedCompare({a: 1, b: 2}); // from computation
memoizedCompare({a: 1, b: 2}); // from cache
memoizedCompare({b: 2, a: 1}); // from cache
memoizedCompare({b: 3, a: 1}); // from computation

// Nirman technologies interview question
// Reverse a odd length string, don't touch the middle char, otherwise don't make any changes.
let sentence = 'tools are fantastic to fix';
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

// Iterate through an object to get all the nested props
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

// mercor.ai - React pagination UI
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
