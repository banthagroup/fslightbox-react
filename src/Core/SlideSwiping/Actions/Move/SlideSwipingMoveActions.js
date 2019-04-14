/**
 * @class
 * @param { FsLightbox.core.stageSources | StageSources } stageSources
 * @param { transformStageSourceHoldersByValue | Function } transformStageSourceHoldersByValue
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference} } swipingProps
 */
export function SlideSwipingMoveActions(
    {
        core: {
            stageSources,
            sourceHoldersTransformer: {
                transformStageSourceHoldersByValue
            }
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
        setUpMoveClientX();
        calculateDifference();
        callTransforms();
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
        transformStageSourceHoldersByValue(swipingProps.swipedDifference);
    };
}