export function setUpSlideNumberUpdater(fsLightbox) {
    const {
        data: {
            sourcesCount
        },
        core: {
            slideNumberUpdater: self
        }
    } = fsLightbox;

    if (sourcesCount === 1) {
        self.updateSlideNumber = () => {};
        return;
    }

    const slideNumberUpdaterState = fsLightbox.componentsStates.slideNumberUpdater;
    self.updateSlideNumber = () => {
        slideNumberUpdaterState.set(!slideNumberUpdaterState.get());
    };
}
