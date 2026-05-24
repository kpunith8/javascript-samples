# Algorithms Directory Guide

## 📖 Overview

The `algorithms/` directory contains implementations of fundamental and advanced algorithms used in computer science and technical interviews. These implementations demonstrate problem-solving techniques, optimization strategies, and common algorithm patterns.

---

## 📂 Files Breakdown

### 1. **binary-search.js**
Binary search algorithm implementation for sorted arrays

**Key Concepts:**
- Time Complexity: O(log n)
- Space Complexity: O(1) or O(log n) for recursive
- Use Cases: Finding elements in sorted data
- Variations: Iterative and recursive implementations

**Methods:**
- Basic binary search
- Search for insertion position
- Search in rotated array

---

### 2. **dynamic-prog.js**
Dynamic Programming solutions to classic problems

**Key Concepts:**
- Memoization (top-down approach)
- Tabulation (bottom-up approach)
- Optimal substructure
- Overlapping subproblems

**Common Problems:**
- Fibonacci sequence
- Coin change problem
- Longest common subsequence
- 0/1 Knapsack problem
- Longest increasing subsequence
- Matrix chain multiplication
- Maximum subarray sum

**Time Complexity Improvements:**
- Naive recursive: Exponential O(2^n)
- DP memoization: Polynomial O(n²) or better

---

### 3. **general-algos.js**
Utility algorithms and general-purpose functions

**Key Algorithms:**

| Function | Purpose | Time Complexity |
|----------|---------|-----------------|
| `chunkArrayInGroups()` | Split array into groups | O(n) |
| `sumAll()` | Sum range of numbers | O(n) |
| `arrayDiff()` | Find differences between arrays | O(n*m) |
| `checkParentheses()` | Validate bracket matching | O(n) |
| `isValidParentheses()` | Check valid parentheses | O(n) |
| `firstRecurringNumber()` | Find first duplicate | O(n) |

**Data Structures Used:**
- Hash maps for O(1) lookups
- Stacks for bracket validation

---

### 4. **general-algos.test.js**
Jest test cases for general algorithms

**Testing Patterns:**
- Describe blocks for grouping
- Multiple test cases per function
- Edge case testing
- Performance benchmarking

**Coverage:**
- Null/undefined inputs
- Empty arrays
- Single element arrays
- Large datasets

---

### 5. **interview-algos.js**
Common technical interview algorithm problems

**Categories:**

| Problem Type | Examples |
|---|---|
| String Manipulation | Palindromes, anagrams, reversal |
| Array Operations | Rotations, permutations, sequences |
| Number Theory | Prime checking, factorials |
| Recursion | Tree problems, backtracking |
| Dynamic Programming | Sequences, paths |

---

### 6. **lru-cache.js**
Least Recently Used Cache implementation

**Key Concepts:**
- Cache eviction policy
- O(1) access time
- LRU ordering maintenance

**Implementation:**
- Hash Map + Doubly Linked List
- Get operation: Marks node as recently used
- Put operation: Adds to front, evicts least recent if full

**Operations:**
```
get(key)     - O(1) - Retrieve cached value
put(key, value) - O(1) - Store or update value
```

---

### 7. **recursive-algos.js**
Recursive algorithm implementations

**Key Concepts:**
- Base cases and recursive cases
- Call stack implications
- Tail recursion optimization
- Stack overflow prevention

**Common Patterns:**
- Tree traversal (in-order, pre-order, post-order)
- Backtracking algorithms
- Divide and conquer
- Divide into smaller subproblems

**Examples:**
- Factorial calculation
- Fibonacci sequence
- Tree traversal
- Maze solving

---

### 8. **sliding-window.js**
Sliding window technique for array problems

**Key Concepts:**
- Two-pointer technique
- Window size management
- Character frequency tracking
- Optimization for subarray problems

**Common Problems:**
- Maximum/minimum in subarray
- Longest substring without repeating characters
- Sliding window maximum
- Permutation in string

**Time Complexity Improvement:**
- Naive: O(n²) with nested loops
- Sliding window: O(n) with one pass

---

### 9. **slow-fast-pointer.js**
Slow and fast pointer technique

**Key Concepts:**
- Two pointers at different speeds
- Cycle detection
- Meeting point algorithms

**Problems Solved:**
- Detect cycle in linked list
- Find cycle start node
- Middle of linked list
- Intersection of two lists

**Floyd's Cycle Detection:**
```
Slow pointer moves 1 step
Fast pointer moves 2 steps
If they meet → cycle exists
```

---

### 10. **sorting-algos.js**
Various sorting algorithm implementations

**Algorithms Covered:**

| Algorithm | Time | Space | Stable | Notes |
|-----------|------|-------|--------|-------|
| Bubble Sort | O(n²) | O(1) | Yes | Educational, rarely used |
| Selection Sort | O(n²) | O(1) | No | Minimal swaps |
| Insertion Sort | O(n²) | O(1) | Yes | Good for small arrays |
| Merge Sort | O(n log n) | O(n) | Yes | Divide & conquer |
| Quick Sort | O(n log n) avg | O(log n) | No | In-place, practical |
| Heap Sort | O(n log n) | O(1) | No | Guaranteed time |

---

### 11. **structy-algos.js**
Algorithm challenges from structy.dev

**Problem Categories:**
- Array and string manipulation
- Tree and graph problems
- Dynamic programming
- Graph algorithms (BFS, DFS)

**Resources:**
- Practice problems from Structy platform
- Solutions with explanations
- Complexity analysis

---

### 12. **two-pointers.js**
Two-pointer technique implementations

**Key Concepts:**
- Converging pointers (from start/end)
- Diverging pointers (from middle)
- Meeting point algorithms

**Common Problems:**
- Two sum problem
- Reverse array
- Container with most water
- Palindrome validation
- Remove duplicates

**Pattern Examples:**
```javascript
// Converging pattern
let left = 0, right = arr.length - 1;
while (left < right) {
  // Process and move pointers
  left++;
  right--;
}

// Diverging pattern
let left = 0, right = 0;
while (right < arr.length) {
  // Process and expand
  right++;
}
```

---

### 13. **index.js**
Entry point demonstrating all algorithms

**Usage:**
```bash
npm start -- algorithms/index.js
```

**Output:**
- Examples of algorithm usage
- Sample input and output
- Demonstration of key functions

---

## 🎓 Learning Path

### Beginner
1. Start with `general-algos.js` - Basic operations
2. Learn `sorting-algos.js` - Fundamental sorting
3. Practice `two-pointers.js` - Simple two-pointer problems

### Intermediate
1. Study `recursive-algos.js` - Recursion patterns
2. Learn `sliding-window.js` - Optimization technique
3. Practice `binary-search.js` - Efficient searching

### Advanced
1. Master `dynamic-prog.js` - Complex optimization
2. Study `lru-cache.js` - System design patterns
3. Challenge yourself with `structy-algos.js`

---

## 💻 Running Examples

```bash
# Run all algorithm demonstrations
npm start -- algorithms/index.js

# Run specific algorithm
npm start -- algorithms/binary-search.js

# Run tests
npm test algorithms/general-algos.test.js
```

---

## 📊 Complexity Analysis

### Time Complexity Big O Notation

| Notation | Name | Growth |
|----------|------|--------|
| O(1) | Constant | Flat |
| O(log n) | Logarithmic | Slow |
| O(n) | Linear | Proportional |
| O(n log n) | Linearithmic | Fast sorting |
| O(n²) | Quadratic | Nested loops |
| O(n³) | Cubic | Triple nested |
| O(2^n) | Exponential | Doubles with input |
| O(n!) | Factorial | Extreme growth |

---

## 🔍 Interview Tips

1. **Understand the problem** - Ask clarifying questions
2. **Identify the pattern** - Which technique applies?
3. **Start simple** - Solve brute force first
4. **Optimize** - Apply appropriate technique
5. **Code carefully** - Avoid off-by-one errors
6. **Test thoroughly** - Edge cases matter

---

## 📚 Further Resources

- [LeetCode](https://leetcode.com/) - Algorithm practice
- [GeeksforGeeks](https://www.geeksforgeeks.org/) - Tutorials
- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)
- [Visualgo](https://visualgo.net/) - Algorithm visualizations

---


