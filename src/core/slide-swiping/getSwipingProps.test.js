import { getSwipingProps } from "./getSwipingProps";

it('should return right object', () => {
    expect(getSwipingProps()).toEqual({
        downClientX: 0,
        isAfterSwipeAnimationRunning: false,
        swipedDifference: 0,
        isSourceDownEventTarget: false,
    });
});
