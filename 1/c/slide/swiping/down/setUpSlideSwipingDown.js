import { SlideSwipingDownActioner } from "./SlideSwipingDownActioner";

export function setUpSlideSwipingDown({ core: { slideSwipingDown: self }, resolve, slideSwipingProps }) {
    const actioner = resolve(SlideSwipingDownActioner);

    self.listener = (e) => {
        // If user is zooming with browser built-in pinching there is usually a situation where user first touches the screen
        // with one finger and then with another. In this situation isSwiping is set set to true after first touch.
        // To not run pinch actions an move and up events we are setting isSwiping to false if screen is touched with 2 or more fingers.
        (e.touches && e.touches.length > 1)
            ? slideSwipingProps.isSwiping = false
            : actioner.runActions(e);
    };
}