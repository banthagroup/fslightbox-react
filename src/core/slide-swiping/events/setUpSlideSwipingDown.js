import { getClientXFromEvent } from "../../../helpers/events/getClientXFromEvent";

export function setUpSlideSwipingDown(
    {
        stageIndexes,
        data,
        elements: {
            container,
            sources
        },
        core: {
            slideSwiping: {
                down: self
            }
        }
    }, swipingProps) {


    self.listener = (e) => {
        data.isSwipingSlides = true;

        // cannot prevent default action when target is video because button would be not clickable
        // and cannot prevent event on mobile because we use passive event listener for touch start
        if (e.target.tagName !== 'VIDEO' && !e.touches) {
            e.preventDefault();
        }

        (e.target.classList.contains('fslightbox-source')) ?
            swipingProps.isSourceDownEventTarget = true :
            swipingProps.isSourceDownEventTarget = false;

        swipingProps.downClientX = getClientXFromEvent(e);

        swipingProps.swipedDifference = 0;
    };
}


