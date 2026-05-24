# Data Structures Directory Guide

## 📖 Overview

The `data-structure/` directory contains implementations of fundamental data structures built from scratch in JavaScript. These implementations provide deep understanding of how data structures work internally and are essential for technical interviews and system design.

---

## 📂 Files Breakdown

### 1. **hash-table.js**
Hash Table implementation with collision handling

**Key Concepts:**
- Hash function design
- Collision resolution strategies
- Load factor management
- Dynamic resizing

**Time Complexities:**
- Average case: O(1) for get, set, delete
- Worst case: O(n) with poor hash function or high collisions

**Collision Handling Methods:**

| Method | Description | Pros | Cons |
|--------|-------------|------|------|
| Chaining | Linked list at each bucket | Simple, good for high load | Extra memory |
| Open Addressing | Find alternate slot | Memory efficient | Clustering |
| Double Hashing | Use 2nd hash function | Reduces clustering | More complex |

**Implementation Details:**
- Array-based storage
- Linked list chaining for collisions
- Dynamic resizing when load factor exceeded
- Key-value pair management

**Methods:**
- `set(key, value)` - Add or update
- `get(key)` - Retrieve value
- `remove(key)` - Delete entry
- `keys()` - Get all keys
- `values()` - Get all values
- `allItems()` - Get all entries

---

### 2. **linked-list.js**
Multiple linked list implementations

**Structures Implemented:**

#### A. **Singly Linked List**
- Single pointer per node
- Forward traversal only
- Time: O(n) for access, O(1) for insert/delete at head

**Operations:**
- `insert(value)` - Add at beginning
- `append(value)` - Add at end
- `remove(value)` - Remove first occurrence
- `display()` - Print all values

#### B. **Doubly Linked List**
- Two pointers per node (next, prev)
- Bidirectional traversal
- Allows efficient reverse iteration

**Additional Operations:**
- Reverse traversal
- Insertion at both ends
- Deletion from both ends

#### C. **Stack (Linked List Based)**
- Last-In-First-Out (LIFO)
- O(1) push and pop operations
- Based on linked list

**Operations:**
- `push(value)` - Add to top
- `pop()` - Remove from top
- `peek()` - View top element
- `isEmpty()` - Check if empty

#### D. **Queue (Linked List Based)**
- First-In-First-Out (FIFO)
- O(1) enqueue and dequeue operations
- Based on linked list

**Operations:**
- `enqueue(value)` - Add to rear
- `dequeue()` - Remove from front
- `peek()` - View front element
- `isEmpty()` - Check if empty

**Use Cases:**
- Undo/redo functionality (Stack)
- Task scheduling, BFS (Queue)
- Browser history (Stack)
- Printer queue (Queue)

---

### 3. **trees.js**
Binary Search Tree (BST) implementation

**Key Concepts:**
- Left subtree < parent < right subtree
- Self-balancing not included (basic implementation)
- Recursive structure

**Time Complexities:**
- Balanced: O(log n) search, insert, delete
- Skewed: O(n) in worst case

**Node Structure:**
```javascript
{
  value: data,
  left: leftChildNode,
  right: rightChildNode
}
```

**Methods:**
- `insert(value)` - Add value maintaining BST property
- `search(value)` - Find value
- `delete(value)` - Remove node
- `inOrder()` - Left-Root-Right traversal (sorted)
- `preOrder()` - Root-Left-Right traversal
- `postOrder()` - Left-Right-Root traversal
- `levelOrder()` - Breadth-first traversal

**Tree Traversal Methods:**

| Traversal | Order | Use Case |
|-----------|-------|----------|
| In-Order | L-R-L | Get sorted output |
| Pre-Order | R-L-R | Serialization |
| Post-Order | L-R-R | Deletion |
| Level-Order | Level by level | BFS |

**Applications:**
- Database indexing
- Expression parsing
- Auto-complete systems
- Game AI (minimax trees)

---

### 4. **dfs-tree.js**
Depth-First Search (DFS) implementations for trees

**Key Concepts:**
- Recursive tree exploration
- Stack-based approach
- Parent-child relationships

**DFS Variants:**

#### A. **Recursive DFS**
- Built-in JavaScript call stack
- Clean, readable code
- Risk of stack overflow for deep trees

#### B. **Iterative DFS**
- Explicit stack data structure
- No recursion limit
- More control over traversal

**Methods:**
- `depthFirstRecursive(node)` - Recursive DFS
- `depthFirstIterative(node)` - Iterative with stack
- `depthFirstPrint(node)` - Print DFS order

**Time Complexity:** O(V + E) where V = vertices, E = edges

**Use Cases:**
- Maze solving
- Topological sorting
- Cycle detection
- Path finding

---

### 5. **graph.js**
Graph data structure implementation

**Graph Types:**
- Directed graphs
- Undirected graphs
- Weighted graphs

**Representations:**

#### Adjacency List (Used in Implementation)
```javascript
{
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C']
}
```

**Advantages:**
- Space efficient: O(V + E)
- Fast iteration over neighbors
- Better for sparse graphs

**Adjacency Matrix Alternative:**
- 2D array [V × V]
- Good for dense graphs
- O(1) edge lookup but O(V²) space

**Methods:**
- `addVertex(vertex)` - Add node
- `addEdge(v1, v2)` - Connect vertices
- `removeVertex(vertex)` - Remove node
- `removeEdge(v1, v2)` - Remove connection
- `getNeighbors(vertex)` - Get adjacent vertices

**Graph Algorithms:**
- DFS (Depth-First Search)
- BFS (Breadth-First Search)
- Dijkstra's shortest path
- Topological sort

**Use Cases:**
- Social networks
- Maps and navigation
- Recommendation systems
- Network routing

---

### 6. **min-heap.js**
Min-Heap data structure implementation

**Key Concepts:**
- Complete binary tree property
- Min element at root
- Parent < Children property

**Heap Property:**
```
Parent value ≤ Child values (Min Heap)
```

**Array Representation:**
```javascript
// For node at index i:
Parent: Math.floor((i - 1) / 2)
Left child: 2 * i + 1
Right child: 2 * i + 2
```

**Methods:**
- `insert(value)` - Add element (O(log n))
- `extractMin()` - Remove minimum (O(log n))
- `peek()` - Get minimum (O(1))
- `heapify()` - Build heap from array (O(n))

**Operations:**
- **Bubble Up** (Sift Up): Move new element up
- **Bubble Down** (Sift Down): Move root down after deletion

**Time Complexities:**
| Operation | Time |
|-----------|------|
| Insert | O(log n) |
| Delete min | O(log n) |
| Get min | O(1) |
| Heapify | O(n) |

**Applications:**
- Priority queues
- Dijkstra's algorithm
- Huffman coding
- Heap sort
- K smallest/largest elements

---

### 7. **array-queue.js**
Queue implementation using JavaScript array

**Methods:**
- `enqueue(element)` - Add to rear: O(1)
- `dequeue()` - Remove from front: O(n) - inefficient!
- `peek()` - View front element: O(1)
- `isEmpty()` - Check if empty: O(1)

**Limitation:** Array's `shift()` operation is O(n)

**Better Alternative:** Use circular array or linked list for true O(1) dequeue

**Use Cases:**
- Task scheduling
- Breadth-first search
- Event handling
- Print queue simulation

---

### 8. **async-queue.js**
Asynchronous queue for handling async operations

**Key Features:**
- Process items asynchronously
- Control concurrency
- Handle errors gracefully
- Order preservation

**Methods:**
- `add(task)` - Add async task
- `process()` - Process all items
- `wait()` - Promise-based waiting
- Error handling and retry logic

**Use Cases:**
- API request batching
- Database operations
- File processing
- Rate limiting

---

### 9. **queue-user-defined.js**
Custom queue implementation (alternative to array-based)

**Optimization:** Tracks front position instead of using shift()

**Methods:**
- `enqueue(value)` - O(1)
- `dequeue()` - O(1)
- `print()` - Display queue
- `isEmpty()` - Check empty status

**Internal Representation:**
```javascript
{
  items: {},    // Object for efficient access
  count: 0,     // Total items
  lowestCount: 0 // Front position
}
```

---

### 10. **set-user-defined.js**
Set data structure implementation

**Key Concepts:**
- Unique values only
- No ordering
- Similar to mathematical sets

**Methods:**
- `add(element)` - Add to set
- `remove(element)` - Remove element
- `has(element)` - Check membership
- `values()` - Get all elements
- `union(otherSet)` - Combine sets
- `intersection(otherSet)` - Common elements
- `difference(otherSet)` - Elements in this but not other
- `subset(otherSet)` - Check if subset
- `size()` - Get set size

**Set Operations:**

| Operation | Formula | Result |
|-----------|---------|--------|
| Union | A ∪ B | All unique elements |
| Intersection | A ∩ B | Common elements |
| Difference | A - B | In A but not B |
| Subset | A ⊆ B | All A in B |

**Use Cases:**
- Unique collection storage
- Membership testing
- Graph algorithms
- Database queries

---

### 11. **index.js**
Entry point demonstrating all data structures

**Features:**
- Usage examples for each structure
- Comparative demonstrations
- Performance characteristics shown

**Running:**
```bash
npm start -- data-structure/index.js
```

---

## 📊 Complexity Comparison

| Structure | Access | Search | Insert | Delete | Space |
|-----------|--------|--------|--------|--------|-------|
| Array | O(1) | O(n) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1)* | O(1)* | O(n) |
| Hash Table | O(1) avg | O(1) avg | O(1) avg | O(1) avg | O(n) |
| BST | O(log n) avg | O(log n) avg | O(log n) avg | O(log n) avg | O(n) |
| Heap | O(n) | O(n) | O(log n) | O(log n) | O(n) |
| Graph | - | O(V+E) | O(1) | O(V+E) | O(V+E) |

*If at head

---

## 🎓 Learning Path

### Beginner
1. Array basics (native JS arrays)
2. Linked lists - understand pointers
3. Stacks and Queues - LIFO/FIFO
4. Set basics

### Intermediate
1. Hash tables - collision handling
2. Trees - BST properties
3. Tree traversals

### Advanced
1. Heaps - priority queue
2. Graphs - representations and algorithms
3. Advanced tree structures (AVL, Red-Black)

---

## 💻 Running Examples

```bash
# Run all demonstrations
npm start -- data-structure/index.js

# Test individual files
npm test

# Debug specific structure
node -r esm data-structure/hash-table.js
```

---

## 🔍 Interview Tips

1. **Know the basics** - Can you implement from scratch?
2. **Complexity matters** - Know all operation complexities
3. **Trade-offs** - Understand space vs time trade-offs
4. **Choose wisely** - Pick right structure for problem
5. **Implement efficiently** - Optimize common operations

---

## 📚 Further Resources

- [Visualgo - Data Structure Visualization](https://visualgo.net/)
- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)
- [GeeksforGeeks DS Tutorials](https://www.geeksforgeeks.org/data-structures/)
- [Cracking the Coding Interview](https://www.crackingthecodinginterview.com/)

---

**Last Updated:** January 2026
