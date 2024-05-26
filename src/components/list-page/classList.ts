class Node<T> {
    letter: T
    next: Node<T> | null
    constructor(letter: T, next?: Node<T> | null) {
      this.letter = letter;
      this.next = (next === undefined ? null : next);
    }
}
  
interface ILinkedList<T> {
    prepend: (element: T) => void;
    append: (element: T) => void;
    removeHead: () => void;
    insertAt: (element: T, index: number) => void;
    removeAt: (index: number) => void;
    removeTail: () => void;
    showValues: () => T[];
    isEmpty: () => boolean;
    getSize: () => number;
}
  
export  class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    constructor(elements?: T[]) {
      this.head = null;
      this.size = 0;
  
      if (elements?.length) {
        elements.forEach(el => this.append(el));
      }
    }
  
    prepend(element: T) {
      const node = new Node(element);
      
      if (this.head === null) {
        this.head = node;
      } else {
        node.next = this.head;
        this.head = node;
      }
  
      this.size++;
    }
  
    append(element: T) {
      const node = new Node(element);
      let current;
  
      if (this.head === null) {
        this.head = node;
      } else {
        current = this.head;
        while (current.next) {
          current = current.next;
        }
  
        current.next = node;
      }
      this.size++;
    }
  
    insertAt(element: T, index: number) {
      if (index < 0 || index > this.size) {
        throw new Error("Enter a valid index");
      } else {
        const node = new Node(element);
  
        if (index === 0) {
          node.next = this.head;
          this.head = node;
        } else if (this.head && this.head.next) {
          let current = this.head;
          let currentIndex = 0;
  
          while (currentIndex < index -1) {
            current = this.head.next;
            currentIndex++;
          }
          node.next = current.next;
          current.next = node;
        }
        this.size++;
      }
    }
  
    removeHead() {
      if (this.isEmpty()) {
        throw new Error("Index is empty");
      } 
      if (this.head && this.head.next) {
        this.head = this.head.next;
      } else this.head = null;
      this.size--;
    }
  
    removeTail() {
      if (this.isEmpty()) {
        throw new Error("Index is empty");
      }
      if (this.head && this.head.next) {
        let current = this.head;
        while (current.next && current.next.next) {
          current = current.next;
        }
        current.next = null;
      } else this.head = null;
      this.size--;
    }
  
    removeAt(index: number): void {
      if (this.isEmpty()) {
        throw new Error("Index is empty");
      }
      if (index < 0) {
        throw new Error("Enter a valid index");
      }
      if (index === 0) {
        this.removeHead();
      } else {
        let prev = null;
        let current = this.head;
        let currentIndex = 0;
        while (currentIndex < index) {
          prev = current;
          current = current!.next;
          currentIndex++;
        }
        prev!.next = current!.next;
      }
      this.size--;
    }
  
    showValues(): T[] {
      let res = [];
      let current: Node<T> | null = this.head;
      while (current !== null) {
        res.push(current.letter);
        current = current.next;
      }
      return res;
    }
  
    isEmpty(): boolean {
      return this.head === null;
    };

    getSize(): number {
      return this.size;
    };
}