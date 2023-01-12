import { SlideSwipingMoveActioner } from "./SlideSwipingMoveActioner";
import { getHasFramePassedFunc } from "../../../animations/getHasFramePassedFunc";

export function SlideSwipingMove({ props: { sources }, resolve, slideSwipingProps }) {
    const slideSwipingMoveActioner = resolve(SlideSwipingMoveActioner);
    const hasFramePassedFunc = getHasFramePassedFunc();

    (sources.length === 1) ?
        this.listener = () => {
            // if there is only one slide we need to simulate swipe to prevent lightbox from closing
            slideSwipingProps.swipedX = 1;
        } :
        this.listener = (e) => {
            if (slideSwipingProps.isSwiping && hasFramePassedFunc()) {
                slideSwipingMoveActioner.runActionsForEvent(e);
            }
        };
}
