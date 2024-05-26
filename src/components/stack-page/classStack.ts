import { TArr } from "./stack-page";

interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    reset: () => void;
    getSize: () => number;
    getContainer: () => T[];
}
  
class Stack<T> implements IStack<T> {
    private container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item);
    };
  
    pop = (): void => {
      this.container.pop();
    };
  
    peak = (): T | null => {
      if (this.container.length === 0) {
        return null;
      }
      return this.container[this.container.length - 1];
    };
  
    reset = (): void => {
      this.container = [];
    };
  
    getSize = () => this.container.length;
    
    getContainer = () => this.container;
}

export const stack = new Stack<TArr>();