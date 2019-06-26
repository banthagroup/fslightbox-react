import { LightboxCloseActions } from "./LightboxCloseActions";

export function setUpLightboxCloser(
    {
        injector: {
            injectDependency
        },
        core: {
            lightboxCloser: self
        }
    }
) {
    const lightboxClosingActions = injectDependency(LightboxCloseActions);

    self.closeLightbox = () => {
        if (!lightboxClosingActions.isLightboxFadingOut)
            lightboxClosingActions.runActions();
    };
}
