import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";
import { getScreenXFromEvent } from "../../../../helpers/events/getScreenXFromEvent";

export function SlideSwipingMoveActioner(
    {
        collections: { sourceMainWrapperTransformers },
        componentsServices,
        elements: { container },
        slideSwipingProps,
        stageIndexes
    }
) {
    this.runActionsForEvent = (e) => {
        // we are showing InvisibleHover component in move event not in down event
        // due to IE problems with videos sources controlling
        componentsServices.showSlideSwipingHovererIfNotYet();

        container.current.classList.add(CURSOR_GRABBING_CLASS_NAME);

        slideSwipingProps.swipedX = getScreenXFromEvent(e) - slideSwipingProps.downScreenX;

        transformSourceHolderAtIndexToPosition(stageIndexes.current, 'zero');
        // if there are only two slides we need to check if source we want to transform exists
        if (stageIndexes.previous !== undefined && slideSwipingProps.swipedX > 0) {
            transformSourceHolderAtIndexToPosition(stageIndexes.previous, 'negative');
        } else if (stageIndexes.next !== undefined && slideSwipingProps.swipedX < 0) {
            transformSourceHolderAtIndexToPosition(stageIndexes.next, 'positive');
        }
    };

    const transformSourceHolderAtIndexToPosition = (index, position) => {
        sourceMainWrapperTransformers[index]
            .byValue(slideSwipingProps.swipedX)
            [position]();
    };
}
