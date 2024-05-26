import renderer from "react-test-renderer";
import { Circle } from "./circle";

it("Корректная отрисовка элемента без буквы", () => {
    const tree = renderer
        .create(<Circle/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Корректная отрисовка элемента с буквами", () => {
    const tree = renderer
        .create(<Circle letter="текст"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Корректная отрисовка элемента с head", () => {
    const tree = renderer
        .create(<Circle head="head"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Корректная отрисовка элемента с react-элементом в head", () => {
    const tree = renderer
        .create(<Circle head={<Circle />}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Корректная отрисовка элемента с index", () => {
    const tree = renderer
        .create(<Circle index={562}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Корректная отрисовка элемента с пропом isSmall ===  true", () => {
    const tree = renderer
        .create(<Circle isSmall={true}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Корректная отрисовка элемента в состоянии default", () => {
    const tree = renderer
        .create(<Circle state="default"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Корректная отрисовка элемента в состоянии changing", () => {
    const tree = renderer
        .create(<Circle state="changing"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Корректная отрисовка элемента в состоянии modified", () => {
    const tree = renderer
        .create(<Circle state="modified"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});