import { reverse } from "./string"

describe("Тестирование алгоритма разворота строки", () => {

  it("Корректно разворачивает строку с чётным количеством символов", () => {
    const reverseLetter = []
    reverse("1234").forEach(item => reverseLetter.push(item.letter))
    expect(reverseLetter).toStrictEqual(["4", "3", "2", "1"]);
  });

  it("Корректно разворачивает строку с нечетным количеством символов", () => {
    const reverseLetter = []
    reverse("123").forEach(item => reverseLetter.push(item.letter))
    expect(reverseLetter).toStrictEqual(["3", "2", "1"]);
  });

  it("Корректно разворачивает строку с одним символом", () => {
    const reverseLetter = []
    reverse("1").forEach(item => reverseLetter.push(item.letter))
    expect(reverseLetter).toStrictEqual(["1"]);
  });

  it("Корректно разворачивает пустую строку", () => {
    const reverseLetter = []
    reverse("").forEach(item => reverseLetter.push(item.letter))
    expect(reverseLetter).toStrictEqual([]);
  });
});