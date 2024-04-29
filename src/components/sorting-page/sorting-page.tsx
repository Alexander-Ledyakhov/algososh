import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import style from "./sorting.module.css";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";

type TArr = {
  index: number
  state: ElementStates
}[]

export const SortingPage: React.FC = () => {

  const [arr, setArr] = useState<TArr>([]);
  const [loader, setLoader] = useState({
    value: false,
    sortBy: 'ASC' || 'DESC' || ''
  });
  const [valueRadioInput, setValueRadioInput] = useState<'choice' | 'bubble' | null>(null);

  useEffect(() => {
    randomArr();
  }, []);

  const randomArr = () => {
    const quantity = Math.floor(Math.random() * (17 - 3) + 3)
    const arr = []
    for (let i = 0; i < quantity; i++) {
      const index = Math.floor(Math.random() * 101)
      arr.push({ index: index, state: ElementStates.Default })
    }
    setArr(arr)
  }

  const swap = (arr: TArr, firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }

  const selectionSort = async (arr: TArr, sortBy: 'ASC' | 'DESC') => {
    const { length } = arr
    for (let i = 0; i < length; i++) {
      let maxIndex = i;
      for (let k = i + 1; k < length; k++) {
        arr[k].state = ElementStates.Changing;
        arr[i].state = ElementStates.Changing;
        setArr([...arr])
        await delay(DELAY_IN_MS)
        if (sortBy === 'ASC' && arr[k].index < arr[maxIndex].index) {
          maxIndex = k
        }
        if (sortBy === 'DESC' && arr[k].index > arr[maxIndex].index) {
          maxIndex = k
        }
        arr[k].state = ElementStates.Default;
        arr[i].state = ElementStates.Default;
        setArr([...arr])
      }
      if (maxIndex !== i) swap(arr, maxIndex, i);
      arr[i].state = ElementStates.Modified;
      setArr([...arr])
    }
  }

  const bubbleSort = async (arr: TArr, sortBy: 'ASC' | 'DESC') => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      for (let k = 0; k < length - i - 1; k++) {
        arr[k].state = ElementStates.Changing;
        arr[k + 1].state = ElementStates.Changing;
        setArr([...arr])
        await delay(DELAY_IN_MS)
        if (sortBy === 'ASC' && arr[k].index > arr[k + 1].index) {
          swap(arr, k, k + 1)
        }
        if (sortBy === 'DESC' && arr[k].index < arr[k + 1].index) {
          swap(arr, k, k + 1)
        }
        arr[k].state = ElementStates.Default;
        arr[k + 1].state = ElementStates.Modified;
        setArr([...arr])
      }
      arr[length - 1 - i].state = ElementStates.Modified;
      setArr([...arr])
    }
  }

  const sort = async (sortBy: 'ASC' | 'DESC') => {
    setLoader({
      value: true,
      sortBy: sortBy
    });
    switch(valueRadioInput) {
      case 'choice':
        await selectionSort(arr, sortBy);
        break;
      case 'bubble':
        await bubbleSort(arr, sortBy)
        break;
    }
    setLoader({
      value: false,
      sortBy: ''
    });
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.sorting_menu}>
        <div className={style.sorting_radioInputs}>
          <RadioInput 
            label="Выбор" 
            checked={valueRadioInput === 'choice'}
            onChange={() => setValueRadioInput('choice')} 
            disabled={loader.value} 
          />
          <RadioInput 
            label="Пузырёк" 
            checked={valueRadioInput === 'bubble'}
            onChange={() => setValueRadioInput('bubble')}
            disabled={loader.value} 
          />
        </div>
        <div className={style.sorting_btns}>
          <Button text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass={style.sorting_btn}
            onClick={() => sort('ASC')}
            disabled={loader.value && loader.sortBy !== 'ASC'}
            isLoader={loader.value && loader.sortBy === 'ASC'}
          />
          <Button text="По убыванию"
            sorting={Direction.Descending}
            extraClass={style.sorting_btn}
            onClick={() => sort('DESC')}
            disabled={loader.value && loader.sortBy !== 'DESC'}
            isLoader={loader.value && loader.sortBy === 'DESC'}
          />
          <Button text="Новый массив" 
            extraClass={`${style.sorting_btn} ml-40`} 
            onClick={randomArr}
            disabled={loader.value} 
          />
        </div>
      </div>
      <ul className={style.sorting_chart}>
        {
          arr.length > 0 && arr.map((column, index) =>
            <Column key={index} index={column.index} state={column.state} />
          )
        }
      </ul>
    </SolutionLayout>
  );
};
