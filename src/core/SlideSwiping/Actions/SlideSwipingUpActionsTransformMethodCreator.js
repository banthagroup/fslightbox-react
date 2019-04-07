/**
 * @class
 */
export function SlideSwipingUpActionsTransformMethodCreator(
    {
        data,
        getters: {
            getSlide
        },
        core: {
            sourceHoldersTransformer: {
                transformStageSourceHolderAtIndex,
                transformStageSourceHolders
            },
        }
    }, {
        swipingTransitioner,
        swipingSlideChanger
    },
    swipingProps
) {
    let transformSourceHolders;
    let transformSourceHoldersBackward;
    let transformSourceHoldersForward;

    this.getTransformSourceHolders = () => {
        setUpMethodsAccordingToNumberOfSlides();
        return transformSourceHolders;
    };

    const setUpMethodsAccordingToNumberOfSlides = () => {
        if (data.totalSlides === 1) {
            transformSourceHolders = () => {
                swipingTransitioner.addTransitionToCurrent();
                transformStageSourceHolderAtIndex(0).zero();
            };
            return;
        }
        setUpTransformSourceHoldersBackward();
        setUpTransformSourceHoldersForward();
        transformSourceHolders = () => {
            (swipingProps.swipedDifference < 0) ?
                transformSourceHoldersForward() :
                transformSourceHoldersBackward();
        }
    };

    const setUpTransformSourceHoldersBackward = () => {
        (areThereMoreThanTwoSlides()) ?
            transformSourceHoldersBackward = () => swipingSlideChanger.changeSlideToPrevious() :
            transformSourceHoldersBackward = transformSourceHoldersBackwardIfThereAreTwoSlides;
    };

    const transformSourceHoldersBackwardIfThereAreTwoSlides = () => {
        (isSlideEqualsOne()) ?
            addTransitionToCurrentAndTransformStageSourceHolders() :
            swipingSlideChanger.changeSlideToPrevious();
    };


    const setUpTransformSourceHoldersForward = () => {
        (areThereMoreThanTwoSlides()) ?
            transformSourceHoldersForward = () => swipingSlideChanger.changeSlideToNext() :
            transformSourceHoldersForward = transformSourceHoldersForwardIfThereAreTwoSlides;
    };

    const transformSourceHoldersForwardIfThereAreTwoSlides = () => {
        (isSlideEqualsOne()) ?
            swipingSlideChanger.changeSlideToNext() :
            addTransitionToCurrentAndTransformStageSourceHolders();
    };

    const areThereMoreThanTwoSlides = () => {
        return data.totalSlides > 2;
    };

    const isSlideEqualsOne = () => {
        return getSlide() === 1;
    };

    const addTransitionToCurrentAndTransformStageSourceHolders = () => {
        swipingTransitioner.addTransitionToCurrent();
        transformStageSourceHolders();
    };
}