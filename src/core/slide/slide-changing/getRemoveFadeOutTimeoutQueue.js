import { TimeoutQueue } from "../../timeouts/TimeoutQueue";
import { ANIMATION_TIME } from "../../../constants/css-constants";

export function getRemoveFadeOutTimeoutQueue(
    {
        injector: {
            injectDependency
        },
        core: {
            sourceAnimator
        }
    }
) {
    const timeoutQueue = injectDependency(TimeoutQueue);
    timeoutQueue.time = ANIMATION_TIME;
    timeoutQueue.action = () => {
        sourceAnimator.removeFadeOutFromAllSources();
    };
    return timeoutQueue;
}
