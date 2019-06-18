import { getPreviousSourceNegativeTransformTimeoutQueue } from "../../../../src/core/slide/slide-changing/getPreviousSourceNegativeTransformTimeoutQueue";
import { ANIMATION_TIME } from "../../../../src/constants/css-constants";
import { TimeoutQueue } from "../../../../src/core/timeouts/TimeoutQueue";

const timeoutQueue = {};
const fsLightbox = {
    injector: {
        injectDependency: jest.fn(() => timeoutQueue)
    },
};

const previousSourceTransformQueue = getPreviousSourceNegativeTransformTimeoutQueue(fsLightbox);

describe('injecting TimeoutQueue', () => {
    it('should call injectDependency with TimeoutQueue', () => {
        expect(fsLightbox.injector.injectDependency).toBeCalledWith(TimeoutQueue);
    });
});

describe('setting time to fade in animation time - 30 (better UX due to decreased by 30)', () => {
    it('should set time to fade in animation time - 30', () => {
        expect(previousSourceTransformQueue.time).toBe(ANIMATION_TIME - 30);
    });
});

describe('returning instance of TimeoutQueue', () => {
    it('should be equal to timeoutQueue', () => {
        expect(previousSourceTransformQueue).toEqual(timeoutQueue);
    });
});
