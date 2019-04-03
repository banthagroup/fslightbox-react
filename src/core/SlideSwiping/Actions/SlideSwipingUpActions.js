/**
 * @class SlideSwipingUpActions
 * @param { FsLightbox } fsLightbox
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference} } swipingProps
 */
export function SlideSwipingUpActions(fsLightbox, swipingProps) {
    /** @var { MouseEvent | TouchEvent } event */
    let event;

    this.setUpEvent = (e) => {
        event = e;
    };

    this.runActions = () => {
        const stageSources = fsLightbox.core.stageSources.getAllStageIndexes();
    };
}
