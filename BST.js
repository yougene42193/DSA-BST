'use strict';

class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    if (this.key == key) {
      return this.value;
    }
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    else {
      throw new Error('Key error');
    }
  }
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key error');
    }
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}
function treeHeight(tree) {
  return Math.max(tree.left && treeHeight(tree.left),
    tree.right && treeHeight(tree.right)) + 1;
}

function isBST(bst) {
  if(bst.left) {
    if(bst.left.key > bst.key) {
      return false;
    }
    if(!isBST(bst.left)) {
      return false;
    }
  }
  if(bst.right) {
    if(bst.right.key < bst.key) {
      return false;
    }
    if(!isBST(bst.right)) {
      return false;
    }
  }
  return true;
}

function thirdLargestNode(node, counter = 1) {
  if(!node) {
    return console.log('Tree is too small, not enough data');
  }
  if(counter === 3) {
    return node.value;
  }
  return thirdLargestNode(node.right, counter + 1) || thirdLargestNode(node.left, counter + 1);
}

function isBalanced(bst) {
  if(bst.left && bst.right) {
    const heightDifference = Math.abs(treeHeight(bst.left) - treeHeight(bst.left));
    if(heightDifference > 1) {
      return false;
    }
    return isBalanced(bst.left), isBalanced(bst.right);
  } else if (bst.left && treeHeight(bst.left) > 1) {
    return false;
  } else if (bst.right && treeHeight(bst.right) > 1) {
    return false;
  } else {
    return true;
  }
}

function main() {
  let BST = new BinarySearchTree();
  BST.insert(3, 3);
  BST.insert(1, 1);
  BST.insert(4, 4);
  BST.insert(6, 6);
  BST.insert(9, 9);
  BST.insert(2, 2);
  BST.insert(5, 5);
  BST.insert(7, 7);
  console.log(BST);
  console.log(treeHeight(BST));
}

main();