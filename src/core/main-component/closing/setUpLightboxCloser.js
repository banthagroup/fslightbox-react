export function setUpLightboxCloser({ core: { lightboxCloser: self, lightboxCloseActioner } }) {
    self.closeLightbox = () => {
        if (!lightboxCloseActioner.isLightboxFadingOut) {
            lightboxCloseActioner.runActions();
        }
    };
}
