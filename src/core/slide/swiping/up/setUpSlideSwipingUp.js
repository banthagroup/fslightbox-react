import { SlideSwipingUpActioner } from "./SlideSwipingUpActioner";

export function setUpSlideSwipingUp(
    {
        core: { slideSwiping: { up: self } },
        injector: { resolve },
        slideSwipingProps
    }
) {
    const slideSwipingUpActioner = resolve(SlideSwipingUpActioner);

    self.listener = () => {
        if (slideSwipingProps.isSwiping) {
            (slideSwipingProps.swipedX) ?
                slideSwipingUpActioner.runActions() :
                slideSwipingUpActioner.runNoSwipeActions();
        }
    };
}
