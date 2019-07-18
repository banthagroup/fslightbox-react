import { getRemoveFadeOutTimeoutQueue } from "./getRemoveFadeOutTimeoutQueue";
import { ANIMATION_TIME } from "../../constants/css-constants";
import { TimeoutQueue } from "../timeouts/TimeoutQueue";

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

test('actions', () => {
    expect(fsLightbox.injector.injectDependency).toBeCalledWith(TimeoutQueue);
    expect(removeFadeOutTimeoutQueue.time).toBe(ANIMATION_TIME);

    removeFadeOutTimeoutQueue.action();
    expect(fsLightbox.core.sourceAnimator.removeFadeOutFromAllSources).toBeCalled();
    expect(removeFadeOutTimeoutQueue).toEqual(timeoutQueue);
});
