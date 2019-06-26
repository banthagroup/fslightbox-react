/**
 * @constructor
 */
export function LightboxUpdateActions(
    {
        core: {
            lightboxCloser,
            lightboxOpener,
            slideIndexChanger
        },
        getState,
        stageIndexes
    }
) {
    this.runTogglerUpdateActions = () => {
        callActionDependingOnIsOpenState(
            lightboxCloser.closeLightbox,
            lightboxOpener.openLightbox
        );
    };

    this.runCurrentStageIndexUpdateActionsFor = (newSlideSourceIndex) => {
        if (newSlideSourceIndex === stageIndexes.current) {
            return;
        }
        callActionDependingOnIsOpenState(
            () => {
                slideIndexChanger.changeToWithActions(newSlideSourceIndex)
            },
            () => {
                stageIndexes.current = newSlideSourceIndex;
            }
        )
    };

    const callActionDependingOnIsOpenState = (isOpenTrueCallback, isOpenFalseCallback) => {
        (getState().isOpen) ?
            isOpenTrueCallback() :
            isOpenFalseCallback();
    };
}
