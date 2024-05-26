import renderer from "react-test-renderer";
import { Button } from "./button";

it("Корректная отрисовка кнопки с текстом", () => {
    const tree = renderer
        .create(<Button text="текст"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Корректная отрисовка кнопки без текста", () => {
    const tree = renderer
        .create(<Button/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Корректная отрисовка заблокированной кнопки", () => {
    const tree = renderer
        .create(<Button disabled={true}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Корректная отрисовка кнопки с индикацией загрузки", () => {
    const tree = renderer
        .create(<Button isLoader={true}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});