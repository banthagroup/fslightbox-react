/**
 * @class SlideSwipingMove
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference} } swipingProps
 */
export function SlideSwipingMove(stageSources, swipingProps) {
    let moveClientX;

    this.listener = (e) => {
        const stageSourcesIndexes = stageSources.getAllStageIndexes();
        for (let indexKey in stageSourcesIndexes) {
        }
    };
}