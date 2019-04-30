export function setUpLightboxOpener(
    {
        setters: { setState },
        core: {
            lightboxOpeningActions,
            lightboxOpener: self
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