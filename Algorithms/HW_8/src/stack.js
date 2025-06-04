class Stack {
  constructor() {
    this._items = [];
  }

  empty() {
    return this._items.length === 0;
  }

  push(element) {
    this._items.push(element);
  }

  pop() {
    if (this.empty()) {
      return null;
    }
    return this._items.pop();
  }

  peek() {
    if (this.empty()) {
      return null;
    }
    return this._items[this._items.length - 1];
  }

  search(element) {
    for (let i = this._items.length - 1; i >= 0; i--) {
      if (this._items[i] === element) {
        return (this._items.length - 1) - i;
      }
    }
    return -1;
  }

  size() {
    return this._items.length;
  }
}

module.exports = Stack;