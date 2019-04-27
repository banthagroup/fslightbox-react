import { getDiv } from "../../helpers/dom/getDiv";

export function getOuterElementOfWidthGetter() {
    const outer = getDiv();
    const outerStyle = outer.style;
    outerStyle.visibility = "hidden";
    outerStyle.width = "100px";
    outerStyle.msOverflowStyle = "scrollbar";
    outerStyle.overflow = "scroll";
    return outer;
}