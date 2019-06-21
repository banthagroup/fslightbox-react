import { TimeoutQueue } from "../timeouts/TimeoutQueue";
import { ANIMATION_TIME } from "../../constants/css-constants";

export function getPreviousSourceNegativeTransformTimeoutQueue(
    {
        injector: {
            injectDependency
        }
    }
) {
    const timeoutQueue = injectDependency(TimeoutQueue);
    timeoutQueue.time = ANIMATION_TIME - 30;
    return timeoutQueue;
}
