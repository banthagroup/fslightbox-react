import { TimeoutQueue } from "../timeouts/TimeoutQueue";
import { ANIMATION_TIME } from "../../constants/css-constants";

export function getRemoveFadeOutTimeoutQueue(
    {
        injector: {
            resolve
        },
        core: {
            sourceAnimator
        }
    }
) {
    const timeoutQueue = resolve(TimeoutQueue);
    timeoutQueue.time = ANIMATION_TIME;
    timeoutQueue.action = () => {
        sourceAnimator.removeFadeOutFromAllSources();
    };
    return timeoutQueue;
}
