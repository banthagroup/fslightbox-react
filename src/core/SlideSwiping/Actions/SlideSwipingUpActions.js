import { SwipingTransitioner } from "../../Transitions/SwipingTransitioner";
import { SwipingSlideChanger } from "../../Slide/SwipingSlideChanger";
import { SlideSwipingUpActionsTransformMethodCreator } from "./SlideSwipingUpActionsTransformMethodCreator";

/**
 * @class
 * @param { FsLightbox } fsLightbox
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference, isSourceDownEventTarget} } swipingProps
 *
 */
export function SlideSwipingUpActions(fsLightbox, swipingProps) {
    const {
        setters: {
            setState
        },
        core: {
            stageSources: {
                getAllStageIndexes
            },
        }
    } = fsLightbox;
    this.swipingTransitioner = new SwipingTransitioner(fsLightbox);
    this.swipingSlideChanger = new SwipingSlideChanger(fsLightbox, this);
    this.transformMethodCreator = new SlideSwipingUpActionsTransformMethodCreator(fsLightbox, this, swipingProps);

    let transformSourceHolders;

    this.setUpMethodsAccordingToNumberOfSlides = () => {
        transformSourceHolders = this.transformMethodCreator.getTransformSourceHolders();
    };

    this.runActions = () => {
        const stageSourcesIndexes = getAllStageIndexes();
        this.swipingTransitioner.setStageSourcesIndexes(stageSourcesIndexes);
        this.swipingSlideChanger.setStageSourcesIndexes(stageSourcesIndexes);

        transformSourceHolders();

        swipingProps.isAfterSwipeAnimationRunning = true;
        setState({
            isSwipingSlides: false
        });
        swipingProps.swipedDifference = 0;

        setTimeout(() => {
            this.swipingTransitioner.removeAllTransitionsFromStageSources();
            swipingProps.isAfterSwipeAnimationRunning = false;
        }, 250);
    };
}
