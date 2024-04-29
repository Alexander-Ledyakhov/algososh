import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import {LinkedList} from "./classList"
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";

type TArr = {
  letter: string;
  state: ElementStates;
};

export const ListPage: React.FC = () => {

  const [loader, setLoader] = useState(false)
  const [arr, setArr] = useState<TArr[]>([])
  const [list] = useState(new LinkedList<TArr>())
  const [valueBtn, setValueBtn] = useState<'addHead' | 'addTail' | 'addIndex' | 'removeHead' | 'removeTail' | 'removeIndex' | null>()
  const [indexAddItem, setIndexAddItem] = useState<number | null>(null)
  const [indexAddItemBottom, setIndexAddItemBottom] = useState<number | null>(null)
  const [valueInputList, setValueInputList] = useState("")
  const [valueInputIndex, setValueInputIndex] = useState("")


  useEffect(() => {
    const arrStart = [0, 34, 8, 1]
    arrStart.forEach((item) => {
      list.append({ letter: item.toString(), state: ElementStates.Default })
    })
    setArr([...list.showValues()])
  }, [list])


  const addHead = async () => {
    setLoader(true)
    setValueBtn('addHead')
    setIndexAddItem(0)

    await delay(SHORT_DELAY_IN_MS)
    setIndexAddItem(null)
    list.prepend({ letter: valueInputList, state: ElementStates.Modified})
    setArr([...list.showValues()])
    setValueInputList('')

    await delay(SHORT_DELAY_IN_MS)
    list.showValues()[0].state = ElementStates.Default

    setValueBtn(null)
    setLoader(false)
  };


  const addTail = async () => {
    setLoader(true)
    setValueBtn('addTail')
    setIndexAddItem(arr.length - 1)

    await delay(SHORT_DELAY_IN_MS)
    setIndexAddItem(null)
    list.append({ letter: valueInputList, state: ElementStates.Modified})
    setArr([...list.showValues()])
    setValueInputList('')

    await delay(SHORT_DELAY_IN_MS)
    list.showValues()[arr.length].state = ElementStates.Default

    setValueBtn(null)
    setLoader(false)
  };


  const addIndex = async () => {
    setLoader(true);
    setValueBtn('addIndex')
    let index = Number(valueInputIndex)

    for (let i = 0; i <= index; i++) {
      setIndexAddItem(i)
      await delay(SHORT_DELAY_IN_MS)
      list.showValues()[i].state = ElementStates.Changing
    }
    setIndexAddItem(null)

    for (let i = 0; i <= index; i++) {
      list.showValues()[i].state = ElementStates.Default
    }
    list.insertAt({ letter: valueInputList, state: ElementStates.Modified}, index)
    setArr([...list.showValues()])

    list.showValues()[index].state = ElementStates.Modified
    await delay(SHORT_DELAY_IN_MS)
    list.showValues()[index].state = ElementStates.Default

    setValueInputList('')
    setValueInputIndex('')
    setValueBtn(null)
    setLoader(false)
  }


  const removeHead = async () => {
    setLoader(true);
    setValueBtn('removeHead')
    setIndexAddItemBottom(0)
    await delay(SHORT_DELAY_IN_MS)
    setIndexAddItemBottom(null)
    list.removeHead();
    setArr([...list.showValues()])
    setValueBtn(null)
    setLoader(false)
  };


  const removeTail = async () => {
    setLoader(true);
    setValueBtn('removeTail')
    setIndexAddItemBottom(arr.length - 1)
    await delay(SHORT_DELAY_IN_MS)
    setIndexAddItemBottom(null)
    list.removeTail();
    setArr([...list.showValues()])
    setValueBtn(null)
    setLoader(false)
  };


  const removeIndex = async () => {
    setLoader(true);
    setValueBtn('removeIndex')
    let index = Number(valueInputIndex)
    for (let i = 0; i <= index; i++) {
      list.showValues()[i].state = ElementStates.Changing      
      setArr([...list.showValues()])
      await delay(SHORT_DELAY_IN_MS)
      if (i === index) {
        setIndexAddItemBottom(i)
        list.showValues()[i].state = ElementStates.Default
        setArr([...list.showValues()])
        await delay(SHORT_DELAY_IN_MS)
      }
    }
    setIndexAddItemBottom(null)
    list.removeAt(index);
    for (let i = 0; i <= index; i++) {
      if (list.showValues()[i]) list.showValues()[i].state = ElementStates.Default
    }
    setArr([...list.showValues()])
    setValueInputIndex('')
    setValueBtn(null)
    setLoader(false)
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={`${style.list} mb-6`}>
        <Input 
          value={valueInputList}
          extraClass={style.listInput}
          placeholder="Введите значение"
          isLimitText={true}
          maxLength={4}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setValueInputList(evt.target.value)
          }}/>
        <Button 
          extraClass={style.listBtnValue} 
          text="Добавить в head" 
          onClick={addHead}
          isLoader={loader && valueBtn === 'addHead'}
          disabled={valueInputList === ''} 
          />
        <Button 
          extraClass={style.listBtnValue} 
          text="Добавить в tail" 
          onClick={addTail}
          isLoader={loader && valueBtn === 'addTail'}
          disabled={valueInputList === ''} 
          />
        <Button 
          extraClass={style.listBtnValue} 
          text="Удалить из head" 
          onClick={removeHead}
          isLoader={loader && valueBtn === 'removeHead'}
          disabled={list.isEmpty()} 
          />
        <Button 
          extraClass={style.listBtnValue} 
          text="Удалить из tail" 
          onClick={removeTail}
          isLoader={loader && valueBtn === 'removeTail'}
          disabled={list.isEmpty()} 
          />
      </div>
      <div className={style.list}>
        <Input 
          extraClass={style.listInput}
          placeholder="Введите индекс"
          value={valueInputIndex}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setValueInputIndex(evt.target.value)
          }}
          type='number' 
          />
        <Button 
          extraClass={style.listBtnIndex} 
          text="Добавить по индексу" 
          onClick={addIndex}
          isLoader={loader && valueBtn === 'addIndex'}
          disabled={valueInputList === '' || valueInputIndex === '' || list.getSize() < Number(valueInputIndex)} 
          />
        <Button 
          extraClass={style.listBtnIndex} 
          text="Удалить по индексу" 
          onClick={removeIndex}
          isLoader={loader && valueBtn === 'removeIndex'}
          disabled={list.isEmpty() || valueInputIndex === '' || list.getSize() < Number(valueInputIndex)}
          />
      </div>
      <div>
        <ul className={style.listUl}>
          {arr.map((circle, index) => {
              return (
                <li key={index} className={style.listLi}>
                  <Circle 
                    letter={circle.letter}
                    state={circle.state}
                    index={index}
                    head={
                      index === 0 && indexAddItem === null
                      ? 'head' : indexAddItem === index
                      ? <Circle letter={valueInputList} isSmall state={ElementStates.Changing}/> : ''
                    }
                    tail={
                      index === arr.length - 1 && indexAddItemBottom === null 
                      ? 'tail' : indexAddItemBottom === index 
                      ? <Circle letter={circle.letter} isSmall state={ElementStates.Changing}/> : ''
                    }
                  />
                  {index !== arr.length-1 && <ArrowIcon />}
                </li>
              )
            })
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
