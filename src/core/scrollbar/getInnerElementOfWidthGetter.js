import { getDiv } from "../../helpers/dom/getDiv";

export function getInnerElementOfWidthGetter() {
    const inner = getDiv();
    inner.style.width = '100%';
    return inner;
}