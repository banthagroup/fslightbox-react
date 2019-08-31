import { setUpSlideSwipingUp } from "./setUpSlideSwipingUp";
import { SlideSwipingUpActioner } from "./SlideSwipingUpActioner";

const fsLightbox = {
    core: { slideSwiping: { up: {} } },
    injector: {
        resolve: (constructorDependency) => {
            if (constructorDependency === SlideSwipingUpActioner) {
                return slideSwipingUpActions;
            }
        }
    },
    slideSwipingProps: {}
};
const slideSwipingUp = fsLightbox.core.slideSwiping.up;
const slideSwipingUpActions = { runNoSwipeActions: jest.fn(), runActions: jest.fn() };

setUpSlideSwipingUp(fsLightbox);

test('listener', () => {
    fsLightbox.slideSwipingProps.isSwiping = false;
    fsLightbox.slideSwipingProps.swipedX = 1000;
    slideSwipingUp.listener();
    expect(slideSwipingUpActions.runActions).not.toBeCalled();
    expect(slideSwipingUpActions.runNoSwipeActions).not.toBeCalled();

    fsLightbox.slideSwipingProps.isSwiping = true;
    fsLightbox.slideSwipingProps.swipedX = 1000;
    slideSwipingUp.listener();
    expect(slideSwipingUpActions.runActions).toBeCalled();
    expect(slideSwipingUpActions.runNoSwipeActions).not.toBeCalled();

    fsLightbox.slideSwipingProps.isSwiping = true;
    fsLightbox.slideSwipingProps.swipedX = 0;
    slideSwipingUp.listener();
    expect(slideSwipingUpActions.runActions).toBeCalledTimes(1);
    expect(slideSwipingUpActions.runNoSwipeActions).toBeCalled();
});
