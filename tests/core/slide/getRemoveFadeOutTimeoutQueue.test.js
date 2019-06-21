import { getRemoveFadeOutTimeoutQueue } from "../../../src/core/slide/getRemoveFadeOutTimeoutQueue";
import { ANIMATION_TIME } from "../../../src/constants/css-constants";
import { TimeoutQueue } from "../../../src/core/timeouts/TimeoutQueue";

const timeoutQueue = {};
const fsLightbox = {
    injector: {
        injectDependency: jest.fn(() => timeoutQueue)
    },
    core: {
        sourceAnimator: {
            removeFadeOutFromAllSources: jest.fn()
        }
    }
};

const removeFadeOutTimeoutQueue = getRemoveFadeOutTimeoutQueue(fsLightbox);

describe('injecting TimeoutQueue', () => {
    it('should call injectDependency with TimeoutQueue', () => {
        expect(fsLightbox.injector.injectDependency).toBeCalledWith(TimeoutQueue);
    });
});

describe('setting timeout queue time', () => {
    it('should set time to fade in animation time ', () => {
        expect(removeFadeOutTimeoutQueue.time).toBe(ANIMATION_TIME);
    });
});

describe('setting action to a method that on calls call removeFadeOutFromAllSources', () => {
    beforeAll(() => {
        removeFadeOutTimeoutQueue.action();
    });

    it('should call removeFadeOutFromAllSources', () => {
        expect(fsLightbox.core.sourceAnimator.removeFadeOutFromAllSources).toBeCalled();
    });
});

describe('returning instance of TimeoutQueue', () => {
    it('should be timeoutQueue', () => {
        expect(removeFadeOutTimeoutQueue).toEqual(timeoutQueue);
    });
});
