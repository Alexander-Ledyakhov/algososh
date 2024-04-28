import React, { ChangeEvent, ReactElement, useCallback, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";

type TArr = {
  letter: string;
  state: ElementStates;
};

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
}

class LinkedList<T> implements ILinkedList<T> {
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

}

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

    await new Promise(resolve => setTimeout(resolve, 500))
    setIndexAddItem(null)
    list.prepend({ letter: valueInputList, state: ElementStates.Modified})
    setArr([...list.showValues()])
    setValueInputList('')

    await new Promise(resolve => setTimeout(resolve, 500))
    list.showValues()[0].state = ElementStates.Default

    setValueBtn(null)
    setLoader(false)
  };


  const addTail = async () => {
    setLoader(true)
    setValueBtn('addTail')
    setIndexAddItem(arr.length - 1)

    await new Promise(resolve => setTimeout(resolve, 500))
    setIndexAddItem(null)
    list.append({ letter: valueInputList, state: ElementStates.Modified})
    setArr([...list.showValues()])
    setValueInputList('')

    await new Promise(resolve => setTimeout(resolve, 500))
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
      await new Promise(resolve => setTimeout(resolve, 500))
      list.showValues()[i].state = ElementStates.Changing
    }
    setIndexAddItem(null)

    for (let i = 0; i <= index; i++) {
      list.showValues()[i].state = ElementStates.Default
    }
    list.insertAt({ letter: valueInputList, state: ElementStates.Modified}, index)
    setArr([...list.showValues()])

    list.showValues()[index].state = ElementStates.Modified
    await new Promise(resolve => setTimeout(resolve, 500))
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
    await new Promise(resolve => setTimeout(resolve, 500))
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
    await new Promise(resolve => setTimeout(resolve, 500));
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
      await new Promise(resolve => setTimeout(resolve, 500))
      if (i === index) {
        setIndexAddItemBottom(i)
        list.showValues()[i].state = ElementStates.Default
        setArr([...list.showValues()])
        await new Promise(resolve => setTimeout(resolve, 500))
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
          disabled={valueInputList === '' || valueInputIndex === ''} 
          />
        <Button 
          extraClass={style.listBtnIndex} 
          text="Удалить по индексу" 
          onClick={removeIndex}
          isLoader={loader && valueBtn === 'removeIndex'}
          disabled={list.isEmpty() || valueInputIndex === ''}
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
