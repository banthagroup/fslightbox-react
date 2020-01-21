import { SlideSwipingUpActionerBucket } from "./SlideSwipingUpActionerBucket";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";

export function SlideSwipingUpActioner(
    {
        componentsServices,
        core: { lightboxCloser },
        elements: { container },
        resolve,
        slideSwipingProps
    }
) {
    const slideSwipingUpActionsBucket = resolve(SlideSwipingUpActionerBucket);

    this.runNoSwipeActions = () => {
        componentsServices.hideSlideSwipingHovererIfShown();

        if (!slideSwipingProps.isSourceDownEventTarget) {
            lightboxCloser.closeLightbox();
        }

        slideSwipingProps.isSwiping = false;
    };

    this.runActions = () => {
        if (slideSwipingProps.swipedX > 0) {
            slideSwipingUpActionsBucket.runPositiveSwipedXActions();
        } else {
            slideSwipingUpActionsBucket.runNegativeSwipedXActions();
        }

        componentsServices.hideSlideSwipingHovererIfShown();

        container.current.classList.remove(CURSOR_GRABBING_CLASS_NAME);

        slideSwipingProps.isSwiping = false;
    };
}
