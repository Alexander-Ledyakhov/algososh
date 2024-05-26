import { selectionSort, bubbleSort } from "./sorting-page"

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {

  it("Корректно сортирует выбором пустой массив", async () => {
    expect(await selectionSort([], 'ASC', jest.fn())).toStrictEqual([])
    expect(await selectionSort([], 'DESC', jest.fn())).toStrictEqual([])
  });

  it("Корректно сортирует выбором массив из одного элемента", async () => {
    expect(await selectionSort([{index: 1, state: "default"}], 'ASC', jest.fn())).toStrictEqual([1])
    expect(await selectionSort([{index: 1, state: "default"}], 'DESC', jest.fn())).toStrictEqual([1])
  });

  it("Корректно сортирует выбором массив из нескольких элементов (ASC)", async () => {
    const asc = await selectionSort([{index: 3, state: "default"},{index: 1, state: "default"},{index: 4, state: "default"}], 'ASC', jest.fn())
    expect(asc).toStrictEqual([1, 3, 4])
  });

  it("Корректно сортирует выбором массив из нескольких элементов (DESC)", async () => {
    const desc = await selectionSort([{index: 3, state: "default"},{index: 6, state: "default"},{index: 4, state: "default"}], 'DESC', jest.fn())
    expect(desc).toStrictEqual([6, 4 , 3])
  });

  it("Корректно сортирует пузырьком пустой массив", async () => {
    expect(await bubbleSort([], 'ASC', jest.fn())).toStrictEqual([])
    expect(await bubbleSort([], 'DESC', jest.fn())).toStrictEqual([])
  });

  it("Корректно сортирует пузырьком массив из одного элемента", async () => {
    expect(await bubbleSort([{index: 1, state: "default"}], 'ASC', jest.fn())).toStrictEqual([1])
    expect(await bubbleSort([{index: 1, state: "default"}], 'DESC', jest.fn())).toStrictEqual([1])
  });

  it("Корректно сортирует пузырьком массив из нескольких элементов (ASC)", async () => {
    const asc = await bubbleSort([{index: 3, state: "default"},{index: 1, state: "default"},{index: 4, state: "default"}], 'ASC', jest.fn())
    expect(asc).toStrictEqual([1, 3, 4])
  });

  it("Корректно сортирует пузырьком массив из нескольких элементов (DESC)", async () => {
    const desc = await bubbleSort([{index: 3, state: "default"},{index: 6, state: "default"},{index: 4, state: "default"}], 'DESC', jest.fn())
    expect(desc).toStrictEqual([6, 4 , 3])
  });
});