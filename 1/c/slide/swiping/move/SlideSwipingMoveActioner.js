import { CURSOR_GRABBING_CLASS_NAME } from "../../../../cn/classes-names";
import { getScreenXFromEvent } from "../../../../h/events/getScreenXFromEvent";

export function SlideSwipingMoveActioner(
    {
        componentsServices,
        elements: { container },
        slideSwipingProps,
	smw,
        stageIndexes
    }
) {
    this.runActionsForEvent = (e) => {
        // we are showing InvisibleHover component in move event not in down event
        // due to IE problems with videos sources controlling
        componentsServices.showSlideSwipingHovererIfNotYet();

        container.current.classList.add(CURSOR_GRABBING_CLASS_NAME);

        slideSwipingProps.swipedX = getScreenXFromEvent(e) - slideSwipingProps.downScreenX;

	var pi=stageIndexes.previous,ni=stageIndexes.next;
        t(stageIndexes.current,"z");
        if (pi !== undefined && slideSwipingProps.swipedX > 0) {
            t(pi,"ne")
        } else if (ni !== undefined && slideSwipingProps.swipedX < 0) {
            t(ni,"p")
        }
    };

	function t(i, p) {
		smw[i].v(sourcePointerProps.swipedX)[p]()
	}
}
