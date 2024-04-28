import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import style from "./string.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

type TArr = {
  letter: string
  state: ElementStates
}[]

export const StringComponent: React.FC = () => {

  const [inputStringComponent, setInputStringComponent] = useState<string>('')
  const [loader, setLoader] = useState(false);
  const [states, setStates] = useState<ElementStates[]>([]);
  const [arr, setArr] = useState<TArr>([]);

  const changeColor = (state: ElementStates , firstIndex: number, secondIndex:number) => {
    setStates(prevStates => {
          const updatedStates = [...prevStates];
          updatedStates[firstIndex] = state
          updatedStates[secondIndex] = state
          return updatedStates;
        });
  }

  const defaultArr = async (startIndexArr: number, endIndexArr: number, reverseObj: TArr) => {
    setArr(reverseObj)
    while (startIndexArr <= endIndexArr) {
      changeColor(ElementStates.Default, startIndexArr, endIndexArr)
      startIndexArr++
      endIndexArr--
    }
  }

  const changeColorArr = async (startIndexArr: number, endIndexArr: number) => {
    while (startIndexArr <= endIndexArr) {
      changeColor(ElementStates.Changing, startIndexArr, endIndexArr)
      await new Promise((resolve) => setTimeout(resolve, 500))
      changeColor(ElementStates.Modified, startIndexArr, endIndexArr)
      startIndexArr++
      endIndexArr--
    }
  }

  const unwrap = async () => {
    setLoader(true)
    const inputStringArr = inputStringComponent.split('')
    let startIndexArr = 0
    let endIndexArr = inputStringArr.length - 1
    const reverseObj = inputStringArr.map((letter => ({ letter: letter, state: ElementStates.Default })))
    await defaultArr (startIndexArr, endIndexArr, reverseObj)
    await new Promise((resolve) => setTimeout(resolve, 500))
    reverseObj[startIndexArr].state = ElementStates.Changing
    reverseObj[endIndexArr].state = ElementStates.Changing
    setArr(reverseObj.reverse())
    await changeColorArr(startIndexArr, endIndexArr)
    setLoader(false)
  };
  
  return (
    <SolutionLayout title="Строка">
      <div className={style.string_solutionLayout}>
        <Input
          placeholder="Введите текст" 
          extraClass={style.string_input}
          maxLength={11} 
          isLimitText={true} 
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setInputStringComponent(evt.target.value)
          }}
        />
        <Button 
          text="Развернуть" 
          isLoader={loader} 
          disabled={inputStringComponent.length === 0} 
          onClick={unwrap} 
        />
      </div>
      <ul className={`${style.string_string} mt-40`}>
        {arr.map((circle, index) => {
          return <Circle letter={circle.letter} key={index} state={states[index]} />;
        })}
      </ul>
    </SolutionLayout>
  );
};