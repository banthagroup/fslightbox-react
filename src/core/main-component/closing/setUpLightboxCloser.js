import { LightboxCloseActions } from "./LightboxCloseActions";

export function setUpLightboxCloser(
    {
        injector: {
            resolve
        },
        core: {
            lightboxCloser: self
        }
    }
) {
    const lightboxClosingActions = resolve(LightboxCloseActions);

    self.closeLightbox = () => {
        if (!lightboxClosingActions.isLightboxFadingOut)
            lightboxClosingActions.runActions();
    };
}
