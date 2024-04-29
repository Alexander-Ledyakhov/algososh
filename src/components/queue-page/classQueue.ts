import { ElementStates } from "../../types/element-states";

interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: (item: T) => void;
    reset: () => void;
    getContainer: () => (T | null)[] | null;
    isEmpty: () => boolean;
    getTail: () => void;
    getHead: () => void;
    getSize: () => number;
  }
  
export class Queue<T> implements IQueue<T> {
    private container: T[] = [];
    private head: number = 0;
    private tail: number = 0;
    private length: number = 0;
    readonly size: number;
  
    constructor(size: number) {
      this.size = size;
      this.container = Array(size).fill("");
    }
  
    enqueue(item: T) {
      if (this.tail < this.size) {
        this.container[this.tail % this.size] = item;
        if (this.head === 0) this.head = 1;
        this.tail++;
        this.length++;
      }
    }
  
    dequeue(item: T) {
      this.container[this.head - 1] = item;
      (this.head < this.size) && this.head++;
      this.length--;
    }
    reset() {
      this.container = Array(this.size).fill({
        letter: '',
        state: ElementStates.Default
      });
      this.tail = 0;
      this.length = 0;
      this.head = 0;
    }
  
    getContainer = () => this.container;
    isEmpty = () => this.length === 0;
    getTail = () => this.tail
    getHead = () => this.head;
    getSize = () => this.size;
}