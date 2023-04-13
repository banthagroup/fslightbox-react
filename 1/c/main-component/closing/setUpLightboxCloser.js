export function setUpLightboxCloser({
  core: { lightboxCloser: self, lightboxCloseActioner },
  componentsServices: {
    toolbarButtons: { fullscreen: isFullscreenOpenState },
  },
	fs
}) {
  self.closeLightbox = () => {
    if (!lightboxCloseActioner.isLightboxFadingOut) {
      lightboxCloseActioner.runActions()
    }
  }
}
