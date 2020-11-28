import { getScreenXFromEvent } from "../../../../helpers/events/getScreenXFromEvent";
import { SOURCE_MAIN_WRAPPERS } from "../../../../constants/elements";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";

export function SlideSwipingDownActioner(
    {
        core: { classFacade },
        elements: { sources },
        slideSwipingProps,
        stageIndexes
    }
) {
    this.runActions = (e) => {
        /**
         *  we prevent default event behaviour to block triggering listener twice on mobile devices
         * 'touchstart' simultaneously with 'mousedown'
         *
         * cannot prevent default action when target is video because button would not be clickable
         * cannot prevent default when touchstart called from React - generates console error
         */
        if (e.target.tagName !== 'VIDEO' && !e.touches) {
            e.preventDefault();
        }

        slideSwipingProps.isSwiping = true;

        slideSwipingProps.downScreenX = getScreenXFromEvent(e);

        slideSwipingProps.swipedX = 0;

        const currentElement = sources[stageIndexes.current].current;
        (currentElement && currentElement.contains(e.target)) ?
            slideSwipingProps.isSourceDownEventTarget = true :
            slideSwipingProps.isSourceDownEventTarget = false;

        classFacade.removeFromEachElementClassIfContains(SOURCE_MAIN_WRAPPERS, TRANSFORM_TRANSITION_CLASS_NAME);
    };
}


