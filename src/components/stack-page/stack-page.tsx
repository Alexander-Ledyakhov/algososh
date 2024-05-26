import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

import style from "./stack.module.css";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { stack } from "./classStack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";

export type TArr = {
  letter: string
  state: ElementStates
}

export const StackPage: React.FC = () => {

  const [inputStack, setInputStack] = useState<string>('')
  const [arr, setArr] = useState<TArr[]>([]);
  const [loader, setLoader] = useState(false);
  const [valueBtn, setValueBtn] = useState<'add' | 'remove' | 'reset' | null>();

  const addStack = async () => {
    setLoader(true)
    setValueBtn('add')
    stack.push({
      letter: inputStack,
      state: ElementStates.Changing,
    })
    setArr([...stack.getContainer()])
    setInputStack('')
    await delay(SHORT_DELAY_IN_MS)
    stack.getContainer()[stack.getSize() - 1].state = ElementStates.Default;
    setArr([...stack.getContainer()])
    setValueBtn(null)
    setLoader(false)
  }

  const removeStack = async () => {
    setLoader(true)
    setValueBtn('remove')
    stack.getContainer()[stack.getSize() - 1].state = ElementStates.Changing
    await delay(SHORT_DELAY_IN_MS)
    stack.pop();
    setArr([...stack.getContainer()])
    setValueBtn(null)
    setLoader(false)
  }

  const resetStack = async () => {
    setLoader(true);
    setValueBtn('reset')
    for (let index = 0; index < stack.getSize(); index++) {
      stack.getContainer()[index].state = ElementStates.Changing
    }
    await delay(SHORT_DELAY_IN_MS)
    stack.reset(); 
    setArr([...stack.getContainer()])
    setValueBtn(null)
    setLoader(false)
  }

  return (
    <SolutionLayout title="Стек">
      <div className={style.stack_container}>
        <div className={style.stack_menu}>
          <Input 
            placeholder="Введите текст"
            extraClass={style.stack_input}
            type="text"
            maxLength={4}
            isLimitText
            value={inputStack}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setInputStack(evt.target.value)
            }} 
            />
          <Button
            text="Добавить"
            onClick={addStack}
            isLoader={valueBtn === 'add' && loader}
            disabled={valueBtn !== 'add' && inputStack === ''}
            />
          <Button 
            text="Удалить"
            onClick={removeStack}
            isLoader={valueBtn === 'remove' && loader}
            disabled={valueBtn !== 'remove' && stack.getSize() === 0}
          />
        </div>
        <Button 
            extraClass='ml-40'
            text="Очистить"
            onClick={resetStack}
            isLoader={valueBtn === 'reset' && loader}
            disabled={valueBtn !== 'reset' && stack.getSize() === 0} 
            />
      </div>
      <ul className={style.stack_arr}>
        {
          arr && arr.map((circle, index) =>
            <Circle
              key={index}
              state={circle.state}
              letter={circle.letter}
              head={index === stack.getSize() - 1 ? 'top' : ''}
              index={index}
            />)
        }
      </ul>
    </SolutionLayout>
  )
}
