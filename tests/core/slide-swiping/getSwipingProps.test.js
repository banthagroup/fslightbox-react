import { getSwipingProps } from "../../../src/core/slide-swiping/getSwipingProps";

describe('getting correct swiping props object literal', () => {
    it('should return right object', () => {
        expect(getSwipingProps()).toEqual({
            downClientX: 0,
            isAfterSwipeAnimationRunning: false,
            swipedDifference: 0,
            isSourceDownEventTarget: false,
        });
    });
});