/**
 * @constructor
 * @param { FsLightbox.componentsStates.hasMovedWhileSwiping | { get: function(): boolean, set: function(boolean)} } hasMovedWhileSwipingState
 * @param { FsLightbox.core.sourceHoldersTransformer | SourceHoldersTransformer } sourceHoldersTransformer
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference} } swipingProps
 */
export function SlideSwipingMoveActions(
    {
        componentsStates: {
            hasMovedWhileSwiping: hasMovedWhileSwipingState,
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

    const calculateDifference = () => {
        swipingProps.swipedDifference = moveClientX - swipingProps.downClientX;
    };

    const callTransforms = () => {
        sourceHoldersTransformer.transformStageSourceHoldersByValue(swipingProps.swipedDifference);
    };
}