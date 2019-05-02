import { TimeoutQueue } from "../../timeouts/TimeoutQueue";
import { FADE_IN_ANIMATION_TIME } from "../../../constants/cssConstants";

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
    timeoutQueue.time = FADE_IN_ANIMATION_TIME;
    timeoutQueue.action = () => {
        sourceAnimator.removeFadeOutFromAllSources();
    };
    return timeoutQueue;
}