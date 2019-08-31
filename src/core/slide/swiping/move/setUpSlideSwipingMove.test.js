import * as getAnimationDebounceObject from "../../../animations/getAnimationDebounce";
import { setUpSlideSwipingMove } from "./setUpSlideSwipingMove";
import { SlideSwipingMoveActioner } from "./SlideSwipingMoveActioner";

const fsLightbox = {
    core: { slideSwiping: { move: {} } },
    data: { sourcesCount: 2 },
    injector: {
        resolve: (constructor) => {
            if (constructor === SlideSwipingMoveActioner) {
                return slideSwipingMoveActioner;
            } else throw new Error('Invalid dependency');
        }
    },
    slideSwipingProps: { isSwiping: false }
};
const slideSwipingMoveActioner = { runActionsForEvent: jest.fn() };
const slideSwipingMove = fsLightbox.core.slideSwiping.move;

let isPreviousAnimationDebounced = false;
getAnimationDebounceObject.getAnimationDebounce = jest.fn(() => () => isPreviousAnimationDebounced);
const e = 'event';

const setUp = () => {
    setUpSlideSwipingMove(fsLightbox);
    slideSwipingMove.listener(e);
};

test('listener', () => {
    setUp();
    expect(fsLightbox.slideSwipingProps.swipedX).toBeUndefined();
    expect(slideSwipingMoveActioner.runActionsForEvent).not.toBeCalled();

    fsLightbox.slideSwipingProps.isSwiping = true;
    setUp();
    expect(fsLightbox.slideSwipingProps.swipedX).toBeUndefined();
    expect(slideSwipingMoveActioner.runActionsForEvent).not.toBeCalled();

    fsLightbox.slideSwipingProps.isSwiping = false;
    isPreviousAnimationDebounced = true;
    setUp();
    expect(fsLightbox.slideSwipingProps.swipedX).toBeUndefined();
    expect(slideSwipingMoveActioner.runActionsForEvent).not.toBeCalled();

    fsLightbox.slideSwipingProps.isSwiping = true;
    isPreviousAnimationDebounced = true;
    setUp();
    expect(fsLightbox.slideSwipingProps.swipedX).toBeUndefined();
    expect(slideSwipingMoveActioner.runActionsForEvent).toBeCalledWith(e);

    fsLightbox.data.sourcesCount = 1;
    setUp();
    expect(fsLightbox.slideSwipingProps.swipedX).toBe(1);
    expect(slideSwipingMoveActioner.runActionsForEvent).toBeCalledTimes(1);
}); 
