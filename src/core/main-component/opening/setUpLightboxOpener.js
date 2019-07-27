export function setUpLightboxOpener(
    {
        setMainComponentState,
        core: {
            lightboxOpener: self,
            lightboxOpenActions
        }
    }
) {
    self.openLightbox = () => {
        setMainComponentState({
            isOpen: true,
        }, () => {
            lightboxOpenActions.runActions();
        });
    };
}
