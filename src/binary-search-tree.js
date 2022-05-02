const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = this.rootNode;
    const newNode = new Node(data);
    if (node === null) this.rootNode = newNode;
    else this.insertNode(this.rootNode, newNode);
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else {
        if (node.right === null) node.right = newNode;
        else this.insertNode(node.right, newNode);
      }
  }

  has(data) {
    let node = this.rootNode;
    while (node) {
      if (data === node.data) {
        return true;
      }
      if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return false;
  }

  find(data) {
    let node = this.rootNode;
    while (node.data !== data) {
      if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
      if (node === null) {
        return null;
      }
    }
    return node;
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode (node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let rightMin = node.right;
        while (rightMin.left) {
          rightMin = rightMin.left;
        }
        node.data = rightMin.data;
        node.right = removeNode(node.right, rightMin.data);

        return node;
      }
    }
  }

  min() {
    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};