export function setUpLightboxOpener(
    {
        setters: { setState },
        core: {
            lightboxOpener: self,
            lightboxOpeningActions
        }
    }
) {
    self.openLightbox = () => {
        setState({
            isOpen: true,
        }, () => {
            lightboxOpeningActions.runActions();
        });
    };
}
