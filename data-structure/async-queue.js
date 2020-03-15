// https://github.com/rauschma/async-iter-demo/blob/master/src/async_iter_tools.js
import ArrayQueue from "./array-queue.js";

class AsyncQueue {
  constructor() {
    // enqueues > dequeues
    this._values = new ArrayQueue();
    // dequeues > enqueues
    this._settlers = new ArrayQueue();
    this._closed = false;
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  enqueue(value) {
    if (this._closed) {
      throw new Error("Closed");
    }

    if (this._settlers.length > 0) {
      if (this._values.length > 0) {
        throw new Error("Illegal internal state");
      }
      const settler = this._settlers.dequeue();
      if (value instanceof Error) {
        settler.reject(value);
      } else {
        settler.resolve({ value });
      }
    } else {
      this._values.enqueue(value);
    }
  }

  /**
   * @returns a Promise for an IteratorResult
   */
  next() {
    if (this._values.length > 0) {
      const value = this._values.dequeue();
      if (value instanceof Error) {
        return Promise.reject(value);
      } else {
        return Promise.resolve({ value });
      }
    }

    if (this._closed) {
      if (this._settlers.length > 0) {
        throw new Error("Illegal internal state");
      }
      return Promise.resolve({ done: true });
    }

    // Wait for new values to be enqueued
    return new Promise((resolve, reject) => {
      this._settlers.enqueue({ resolve, reject });
    });
  }

  close() {
    while (this._settlers.length > 0) {
      this._settlers.dequeue().resolve({ done: true });
    }
    this._closed = true;
  }
}

export default AsyncQueue;
