import { LightboxCloseActioner } from "./LightboxCloseActioner";

export function setUpLightboxCloser(
    {
        core: { lightboxCloser: self },
        injector: { resolve }
    }
) {
    const lightboxClosingActions = resolve(LightboxCloseActioner);

    self.closeLightbox = () => {
        if (!lightboxClosingActions.isLightboxFadingOut) {
            lightboxClosingActions.runActions();
        }
    };
}
