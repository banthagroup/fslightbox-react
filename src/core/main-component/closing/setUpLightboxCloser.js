import { LightboxCloseActions } from "./LightboxCloseActions";

export function setUpLightboxCloser(
    {
        core: { lightboxCloser: self },
        injector: { resolve }
    }
) {
    const lightboxClosingActions = resolve(LightboxCloseActions);

    self.closeLightbox = () => {
        if (!lightboxClosingActions.isLightboxFadingOut)
            lightboxClosingActions.runActions();
    };
}
