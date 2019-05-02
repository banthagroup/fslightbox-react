import { LightboxClosingActions } from "./LightboxClosingActions";

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
    const lightboxClosingActions = injectDependency(LightboxClosingActions);

    self.closeLightbox = () => {
        if (!lightboxClosingActions.isLightboxFadingOut)
            lightboxClosingActions.runActions();
    };
}
