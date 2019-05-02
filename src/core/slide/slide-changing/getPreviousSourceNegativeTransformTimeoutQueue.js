import { TimeoutQueue } from "../../timeouts/TimeoutQueue";
import { FADE_IN_ANIMATION_TIME } from "../../../constants/cssConstants";

export function getPreviousSourceNegativeTransformTimeoutQueue(
    {
        injector: {
            injectDependency
        }
    }
) {
    const timeoutQueue = injectDependency(TimeoutQueue);
    timeoutQueue.time = FADE_IN_ANIMATION_TIME - 30;
    return timeoutQueue;
}