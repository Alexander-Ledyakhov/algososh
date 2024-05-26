import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import './fibonacci.css'
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";

export const FibonacciPage: React.FC = () => {
  const [inputFibonacci, setInputFibonacci] = useState<number>()
  const [arrFibonacci, setArrFibonacci] = useState<number[]>([]);
  const [loader, setLoader] = useState(false);
  
  const validNumFibonacci = inputFibonacci === undefined || inputFibonacci === 0 || inputFibonacci > 19

  const fib = (n: number, memo: Record<number, number> = {}): number => {
    if (n in memo) {
      return memo[n];
    }
    if (n <= 2) {
      return 1;
    }
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
  };

  const submitFibonacci = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(validNumFibonacci) return;
    setArrFibonacci([])
    for(let i = 1; i <= inputFibonacci+1; i++){
      setLoader(true);
      arrFibonacci.push(fib(i))
      setArrFibonacci(arr => [...arr, fib(i)])
      await delay(SHORT_DELAY_IN_MS)
    }
    setLoader(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <div>
        <form className="form" onSubmit={submitFibonacci}>
          <Input
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setInputFibonacci(Number(evt.target.value))
            }}
            extraClass='input'
            type="number"
            max={19}
            isLimitText={true}
          />
          <Button text={"Рассчитать"}
            type='submit'
            isLoader={loader}
            disabled={validNumFibonacci}
          />
        </form>
        <ul className="ul">
          {
            arrFibonacci && arrFibonacci.map((num, index) => (
                <Circle
                  key={index}
                  letter={String(num)}
                  index={index}
                  />
            ))
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
