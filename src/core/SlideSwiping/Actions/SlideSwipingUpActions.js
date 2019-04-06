import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../constants/CssConstants";
import { SourceHoldersTransitioner } from "../../Transitions/SourceHoldersTransitioner";

/**
 * @class SlideSwipingUpActions
 * @param { FsLightbox } fsLightbox
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference} } swipingProps
 */
export function SlideSwipingUpActions(fsLightbox, swipingProps) {
    /** @var { MouseEvent | TouchEvent } event */
    let event;
    let stageSourcesIndexes;
    const sourceHoldersTransitioner = new SourceHoldersTransitioner(fsLightbox);

    this.setUpEvent = (e) => {
        event = e;
    };

    this.runActions = () => {
        const stageSourcesIndexes = fsLightbox.core.stageSources.getAllStageIndexes();
        sourceHoldersTransitioner.setStageSourcesIndexes(stageSourcesIndexes);

        // slide next
        if (swipingProps.swipedDifference < 0) {
            if (fsLightbox.data.totalSlides >= 3) {
                sourceHoldersTransitioner.addTransitionToCurrentAndNext();
                fsLightbox.core.swipingSlideChanger.changeSlideTo(stageSourcesIndexes.next + 1);
            }

            else if(fsLightbox.data.totalSlides === 2) {
                if(fsLightbox.getters.getSlide() === 1) {
                    sourceHoldersTransitioner.addTransitionToCurrentAndNext();
                    fsLightbox.core.swipingSlideChanger.changeSlideTo(stageSourcesIndexes.next + 1);
                } else {
                    sourceHoldersTransitioner.addTransitionToCurrent();
                    fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders();
                }
            } else {
                sourceHoldersTransitioner.addTransitionToCurrent();
                fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolderAtIndex(0).zero();
            }
        }

        // slide previous
        else {
            if (fsLightbox.data.totalSlides >= 3) {
                sourceHoldersTransitioner.addTransitionToCurrentAndPrevious();
                fsLightbox.core.swipingSlideChanger.changeSlideTo(stageSourcesIndexes.previous + 1);
            }

            else if(fsLightbox.data.totalSlides === 2) {
                if(fsLightbox.getters.getSlide() === 1) {
                    sourceHoldersTransitioner.addTransitionToCurrent();
                    fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders();
                } else {
                    sourceHoldersTransitioner.addTransitionToCurrentAndPrevious();
                    fsLightbox.core.swipingSlideChanger.changeSlideTo(stageSourcesIndexes.previous + 1);
                }
            } else {
                sourceHoldersTransitioner.addTransitionToCurrent();
                fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolderAtIndex(0).zero();
            }
        }

        swipingProps.isAfterSwipeAnimationRunning = true;
        swipingProps.swipedDifference = 0;
        fsLightbox.setters.setState({
            isSwipingSlides: false
        });

        setTimeout(() => {
            sourceHoldersTransitioner.removeAll();
            swipingProps.isAfterSwipeAnimationRunning = false;
        }, 250);
    };
}
