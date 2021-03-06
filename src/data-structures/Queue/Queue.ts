
export class BiNode<T extends any = any> {
  constructor(
    public value: T,
    public next: BiNode | null = null,
    public previous: BiNode | null = null,
  ) { }
}

/**
 * First in First Out aproach.
 * Usefull for processing tasks, using methods dequeue and enqueue.
 * @complexity
 * Insert O(1)
 * Remove O(1)
 * Search O(n)
 * Access O(n)
 * @related Stack works the opposite way
 */
export class Queue<T extends any> {
  fist: BiNode<T> | null = null;
  last: BiNode<T> | null = null;
  size: number = 0;

  constructor(initialData: T[] = []) {
    for (let val of initialData) {
      this.enqueue(val)
    }
  }

  get length() {
    return this.size
  }

  /**
   * Adds to the end and returns the size of the queue.
   * @param value value to add
   */
  enqueue(val: T) {
    const node = new BiNode<T>(val)
    if (!this.fist) {
      this.fist = node
      this.last = this.fist
    } else {
      this.last!.next = node
      node.previous = this.last
      this.last = node
    }
    this.size++
    return this.size
  }

  *[Symbol.iterator]() {
    let current = this.fist
    while (current) {
      yield current.value
      current = current.next
    }
  }

  /**
   * Allows you to peek at the next element to go out of the Queue.
   * Basically the first element or null if Queue is empty.
   */
  peek() {
    return this.fist ? this.fist.value : null
  }
  /**
   * removes the first element and returns the value
   */
  dequeue() {
    if (!this.fist || this.size === 0) return null
    let current = this.fist
    this.fist = this.fist.next
    if (this.fist) {
      this.fist.previous = null
    }
    if (this.size === 1) {
      this.last = null
      this.fist = null
    }
    this.size--
    current.next = null
    return current.value
  }

  /**
     * Returns the node at index or null. 
     * @note Added as an extra method. Not recommended to use because its not as fast as the other method.
     * @complexity O(n) maybe faster
     * @param index index of the value (0 based index)
     * @example
     *    queue.get(2).value
          queue.get(2).next
          queue.get(2).previous
     */
  get(index: number) {
    if (
      index < 0 ||
      index >= this.size ||
      this.fist === null ||
      this.size === 0
    ) {
      return null
    }
    //Is the index closer to the tail or the head?
    const isCloserToTail = index > this.size / 2
    if (isCloserToTail) {
      let count = this.size - 1
      let current = this.last
      while (count !== index) {
        current = current!.previous
        count--
      }
      return current
    } else {
      let current: BiNode<T> | null = this.fist
      let count = 0
      while (count !== index) {
        current = current!.next
        count++
      }
      return current
    }
  }

  toArray() {
    let current = this.fist
    let data = []
    while (current) {
      data.push(current.value)
      current = current.next
    }
    return data
  }
}

// const queue = new Queue<string>(["1", "2", "3"]);

// queue.enqueue("1");
// queue.enqueue("2");
// queue.enqueue("3");
// queue.enqueue("4");
// queue.enqueue("5");
// console.log(queue.toArray());
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// console.log(queue.toArray());
