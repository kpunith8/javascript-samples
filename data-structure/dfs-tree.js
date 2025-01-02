export class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Use stack as data structure, pre-order traversal = Self - Left - Right
export const depthFirstSearchPrint = (root) => {
  const stack = [root];

  while (stack.length > 0) {
    const curr = stack.pop();
    console.log(curr.val);
    // Stack is LIFO, top most item to be removed should be on top
    // hence pushing the left child at the end
    if (curr.right !== null) {
      stack.push(curr.right);
    }

    if (curr.left !== null) {
      stack.push(curr.left);
    }
  }
};

// Pre-oder traversal
export const depthFirstRecursive = (root) => {
  if (root === null) return;

  console.log(root.val);
  depthFirstRecursive(root.left);
  depthFirstRecursive(root.right);
};

// Change the order of printing the value of the node to traverse
// in post-order and in-order

// Post-Order = Left - Right - Self
// In-Order = Left - Self - Right

export const sumTree = (root) => {
  const stack = [root];
  let sum = 0;

  while (stack.length > 0) {
    const curr = stack.pop();
    sum += curr.val;

    if (curr.right !== null) {
      stack.push(curr.right);
    }

    if (curr.left !== null) {
      stack.push(curr.left);
    }
  }

  return sum;
};

export const sumTreeRecursive = (root) => {
  if (root === null) return 0;

  return sumTreeRecursive(root.left) + root.val + sumTreeRecursive(root.right);
};
