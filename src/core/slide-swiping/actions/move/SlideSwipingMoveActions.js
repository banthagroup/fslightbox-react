import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";
import { getClientXFromEvent } from "../../../../helpers/events/getClientXFromEvent";
import { LIGHTBOX_CONTAINER } from "../../../../constants/elements";

export function SlideSwipingMoveActions(
    {
        collections: {
            sourcesHoldersTransformers
        },
        componentsStates: {
            hasMovedWhileSwiping: hasMovedWhileSwipingState,
        },
        core: {
            classListManager
        },
        data: { sourcesCount },
        stageIndexes
    }, swipingProps
) {
    this.runActionsForEvent = (e) => {
        // we are showing InvisibleHover component in move event not in down event
        // due to IE problems with videos sources controlling
        if (!hasMovedWhileSwipingState.get()) {
            hasMovedWhileSwipingState.set(true);
        }

        classListManager
            .manageElement(LIGHTBOX_CONTAINER)
            .add(CURSOR_GRABBING_CLASS_NAME);

        swipingProps.swipedDifference = getClientXFromEvent(e) - swipingProps.downClientX;

        transformSourceHolderAtIndexToPosition(stageIndexes.current, 'zero');
        // if there are only two slides we need to check if source we want to transform exists
        if (stageIndexes.previous !== undefined && swipingProps.swipedDifference > 0) {
            transformSourceHolderAtIndexToPosition(stageIndexes.previous, 'negative');
        } else if (stageIndexes.next !== undefined && swipingProps.swipedDifference < 0) {
            transformSourceHolderAtIndexToPosition(stageIndexes.next, 'positive');
        }
    };

    const transformSourceHolderAtIndexToPosition = (index, position) => {
        sourcesHoldersTransformers[index]
            .byValue(swipingProps.swipedDifference)
            [position]();
    };
}
