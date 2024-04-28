import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./queue.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

type TArr = {
  letter: string;
  state: ElementStates;
};

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

class Queue<T> implements IQueue<T> {
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

export const QueuePage: React.FC = () => {

  const [valueInputQueue, setValueInputQueue] = useState("");
  const [loader, setLoader] = useState(false);
  const [valueBtn, setValueBtn] = useState<'add' | 'remove' | 'reset' | null>();
  const [queue, setQueue] = useState(new Queue<TArr>(7));

  const addQueue = async () => {
    setLoader(true)
    setValueBtn('add')
    if (queue.getTail() < queue.getSize()) {
      queue.enqueue({
        letter: valueInputQueue,
        state: ElementStates.Changing
      })
      setQueue(queue)
      await new Promise(resolve => setTimeout(resolve, 500))
      queue.getContainer()[queue.getTail() - 1].state = ElementStates.Default
    }
    setValueInputQueue("")
    setValueBtn(null)
    setLoader(false)
  };

  const removeQueue = async () => {
    setLoader(true);
    setValueBtn('remove')
    queue.getContainer()[queue.getHead() - 1].state = ElementStates.Changing;
    await new Promise(resolve => setTimeout(resolve, 500));
    queue.dequeue({
      letter: '',
      state: ElementStates.Default
    });
    setQueue(queue);
    setValueBtn(null)
    setLoader(false);
  };

  const resetQueue = async () => {
    setLoader(true);
    setValueBtn('reset')
    for (let index = 0; index < queue.getTail(); index++) {
      queue.getContainer()[index].state = ElementStates.Changing;
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    queue.reset();
    setQueue(queue);
    setValueBtn(null)
    setLoader(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={style.queue_container}>
        <div className={style.queue_menu}>
          <Input 
            placeholder="Введите значение"
            extraClass={style.queue_input}
            type="text"
            maxLength={4}
            isLimitText
            value={valueInputQueue}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setValueInputQueue(evt.target.value);
            }} 
            />
          <Button
            text="Добавить"
            onClick={addQueue}
            isLoader={valueBtn === 'add' && loader}
            disabled={valueInputQueue === ''}
            />
          <Button 
            text="Удалить"
            onClick={removeQueue}
            isLoader={valueBtn === 'remove' && loader}
            disabled={queue.isEmpty()}
          />
        </div>
        <Button 
            extraClass='ml-40'
            text="Очистить"
            onClick={resetQueue}
            isLoader={valueBtn === 'reset' && loader}
            disabled={queue.getHead() === 0} 
            />
      </div>
      <ul className={style.queue_arr}>
        {
          queue.getContainer().map((circle, index) =>
            <Circle
              key={index}
              state={circle.state}
              letter={circle.letter}
              head={index + 1 === queue.getHead() ? 'head' : ''}
              tail={!queue.isEmpty() && index === queue.getTail() - 1 ? 'tail' : ''}
              index={index}
            />)
        }
      </ul>
    </SolutionLayout>
  );
};
