import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./queue.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./classQueue";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";

type TArr = {
  letter: string;
  state: ElementStates;
};

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
      await delay(SHORT_DELAY_IN_MS)
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
    await delay(SHORT_DELAY_IN_MS)
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
    await delay(SHORT_DELAY_IN_MS)
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
