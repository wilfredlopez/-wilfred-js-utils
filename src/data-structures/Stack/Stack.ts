import { BiNode } from "../BiNode";

/**
 * Works in a Last In First Out Aproach. (Like the js functions call stack) or browser history
 *  Keeps a Collection of data. 
 * Uses LIFO data structure (last in first out). Where the last is the first value added and the first is the last value added. 
 * Great for undo/redo functionality.
 * You can push to the begining and pop from the end.
 * @complexity 
 * Insertion O(1) very fast all constant time.
 * Removal O(1) very fast all constant time.
 * Searching O(n)
 * Access O(n)
 * @related Queues work the opposite way
 */
export class Stack<T extends any> {
  fist: BiNode<T> | null = null;
  last: BiNode<T> | null = null;
  private _size = 0;

  get size() {
    return this._size;
  }
  /**
   * Adds to the begining
   * @param value value to add
   * @complexity O(1)
   */
  push(val: T) {
    const newHead = new BiNode<T>(val);
    if (!this.fist) {
      this.fist = newHead;
      this.last = this.fist;
    } else {
      this.fist.previous = newHead;
      newHead.next = this.fist;
      this.fist = newHead;
    }
    this._size++;
    return this._size;
  }

  *[Symbol.iterator]() {
    let current = this.fist;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  /**
   * Peeks at the next node that will go out when you call the pop method.
   * Returns null if empty.
   * @complexity O(1)
   */
  peek(): BiNode<T> | null {
    return this.fist ? this.fist : null;
  }

  /**
   * removes the first element and returns it
   * @complexity O(1)
   */
  pop() {
    if (!this.fist || this._size === 0) return null;
    let current = this.fist;
    this.fist = this.fist.next;
    if (this.fist) {
      this.fist.previous = null;
    }
    if (this._size === 1) {
      this.last = null;
      this.fist = null;
    }
    this._size--;
    current.next = null;
    return current.value;
  }

  /**
   * Added as an extra method. Not recommended to use because its not as fast as the other method.
   * @complexity O(n) maybe faster
   * Returns the value at the specified index or null if not found.
   * @param index index of the value
   */
  get(index: number) {
    if (
      index < 0 ||
      index >= this._size ||
      this.fist === null ||
      this._size === 0
    ) {
      return null;
    }
    //Is the index closer to the tail or the head?
    const isCloserToTail = index > this._size / 2;
    if (isCloserToTail) {
      let count = this._size - 1;
      let current = this.last;
      while (count !== index) {
        current = current!.previous;
        count--;
      }
      return current;
    } else {
      let current: BiNode<T> | null = this.fist;
      let count = 0;
      while (count !== index) {
        current = current!.next;
        count++;
      }
      return current;
    }
  }
}

// const stack = new Stack();

// stack.push("WILFRED");
// stack.push("Yanna");
// stack.push("Austria");
// stack.push("Pablo");
// stack.push("Cataline");
// stack.push("Theudy");

// for (let val of stack) {
//   console.log(val);
// }
// console.log(stack.fist?.value);
// console.log(stack.get(4)?.value);
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
