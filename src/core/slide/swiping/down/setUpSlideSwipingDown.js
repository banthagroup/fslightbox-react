import { getClientXFromEvent } from "../../../../helpers/events/getClientXFromEvent";
import { SOURCES_OUTERS } from "../../../../constants/elements";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";

export function setUpSlideSwipingDown(
    {
        core: { classFacade, slideSwiping: { down: self } },
        slideSwipingProps
    }
) {
    self.listener = (e) => {
        slideSwipingProps.isSwiping = true;

        slideSwipingProps.downClientX = getClientXFromEvent(e);

        // cannot prevent default action when target is video because button would be not clickable
        // and cannot prevent event on mobile because we use passive event listener for touch start
        if (e.target.tagName !== 'VIDEO' && !e.touches) {
            e.preventDefault();
        }

        (e.target.classList.contains('fslightbox-source')) ?
            slideSwipingProps.isSourceDownEventTarget = true :
            slideSwipingProps.isSourceDownEventTarget = false;

        classFacade.removeFromEachElementClassIfContains(SOURCES_OUTERS, TRANSFORM_TRANSITION_CLASS_NAME);
    };
}


