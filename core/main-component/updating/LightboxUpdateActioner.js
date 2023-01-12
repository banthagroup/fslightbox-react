export function LightboxUpdateActioner(
    {
        componentsServices: {
            isLightboxOpenManager
        },
        core: {
            lightboxCloser,
            lightboxOpener,
            slideIndexChanger
        },
        data,
        stageIndexes
    }
) {
    this.runTogglerUpdateActions = () => {
        if (isLightboxOpenManager.get()) {
            lightboxCloser.closeLightbox();
        } else if (data.isInitialized) {
            lightboxOpener.openLightbox();
        } else {
            lightboxOpener.initializeAndOpenLightbox();
        }
    };

    this.runCurrentStageIndexUpdateActionsFor = (newSlideSourceIndex) => {
        if (newSlideSourceIndex === stageIndexes.current) {
            return;
        }

        (isLightboxOpenManager.get()) ?
            slideIndexChanger.jumpTo(newSlideSourceIndex) :
            stageIndexes.current = newSlideSourceIndex;
    };
}
