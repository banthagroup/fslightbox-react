import { getOuterElementOfWidthGetter } from "./getOuterElementOfWidthGetter";
import { getInnerElementOfWidthGetter } from "./getInnerElementOfWidthGetter";

export function getScrollbarWidth() {
    const outer = getOuterElementOfWidthGetter();
    const inner = getInnerElementOfWidthGetter();
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    document.body.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}