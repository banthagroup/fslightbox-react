export function setUpLightboxOpener(
    {
        setMainComponentState,
        core: {
            lightboxOpener: self,
            lightboxOpeningActions
        }
    }
) {
    self.openLightbox = () => {
        setMainComponentState({
            isOpen: true,
        }, () => {
            lightboxOpeningActions.runActions();
        });
    };
}
