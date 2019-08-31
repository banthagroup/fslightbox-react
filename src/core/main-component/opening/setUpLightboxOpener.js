export function setUpLightboxOpener(
    {
        setMainComponentState,
        core: { lightboxOpener: self, lightboxOpenActioner }
    }
) {
    self.openLightbox = () => {
        setMainComponentState({
            isOpen: true,
        }, lightboxOpenActioner.runActions);
    };
}
