export function setUpLightboxCloser(
    {
        injector: {
            mainComponent: {
                getClosingActions
            }
        },
        core: {
            lightboxCloser: self
        }
    }
) {
    const lightboxClosingActions = getClosingActions();

    self.closeLightbox = () => {
        if (!lightboxClosingActions.isLightboxFadingOut)
            lightboxClosingActions.runActions();
    };
}
