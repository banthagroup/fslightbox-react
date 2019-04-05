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
        for (let index in stageSources) {
            fsLightbox.elements.sourceHolders[stageSources[index]].current.classList.add('fslightbox-transform-transition');
        }
        if(swipingProps.swipedDifference < 0) {
            fsLightbox.core.slideChanger.changeSlideTo(fsLightbox.core.stageSources.getNextSlideIndex() + 1);
        } else {
            fsLightbox.core.slideChanger.changeSlideTo(fsLightbox.core.stageSources.getPreviousSlideIndex() + 1);
        }

        swipingProps.isAfterSwipeAnimationRunning = true;
        swipingProps.swipedDifference = 0;
        fsLightbox.setters.setState({
            isSwipingSlides: false
        });

        setTimeout(() => {
            for (let index in stageSources) {
                fsLightbox.elements.sourceHolders[stageSources[index]].current.classList.remove('fslightbox-transform-transition');
            }
            swipingProps.isAfterSwipeAnimationRunning = false;
        }, 250);
    };
}
