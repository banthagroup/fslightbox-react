import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/cssConstants";

/**
 * @constructor
 */
export function SlideSwipingMoveActions(
    {
        data,
        componentsStates: {
            hasMovedWhileSwiping: hasMovedWhileSwipingState,
        },
        elements: {
            container: lightboxContainer
        },
        core: {
            sourceHoldersTransformer,
        }
    }, swipingProps
) {
    /** @var { MouseEvent | TouchEvent } event */
    let event;
    let moveClientX;

    this.setMoveEvent = (e) => {
        event = e;
    };

    this.runActions = () => {
        ifHasMovedWhileSwipingIsFalseSetItToTrue();
        setUpMoveClientX();
        addCursorGrabbingClassToContainerIfNotAlreadyAddedAndIfThereAreAtLeastTwoSlides();
        calculateDifference();
        callTransforms();
    };

    const ifHasMovedWhileSwipingIsFalseSetItToTrue = () => {
        if (!hasMovedWhileSwipingState.get()) {
            hasMovedWhileSwipingState.set(true);
        }
    };

    const setUpMoveClientX = () => {
        (event.touches) ?
            moveClientX = event.touches[0].clientX :
            moveClientX = event.clientX
    };

    const addCursorGrabbingClassToContainerIfNotAlreadyAddedAndIfThereAreAtLeastTwoSlides = () => {
        if (!lightboxContainer.current.classList.contains(CURSOR_GRABBING_CLASS_NAME) && data.totalSlides > 1) {
            lightboxContainer.current.classList.add(CURSOR_GRABBING_CLASS_NAME);
        }
    };

    const calculateDifference = () => {
        swipingProps.swipedDifference = moveClientX - swipingProps.downClientX;
    };

    const callTransforms = () => {
        sourceHoldersTransformer.transformStageSourceHoldersByValue(swipingProps.swipedDifference);
    };
}
