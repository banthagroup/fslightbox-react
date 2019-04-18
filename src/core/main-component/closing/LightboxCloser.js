/**
 * @class
 * @param { FsLightbox.injector.mainComponent.getClosingActions | function(): LightboxClosingActions} getClosingActions
 */
export function LightboxCloser(
    {
        injector: {
            mainComponent: {
                getClosingActions
            }
        }
    }
) {
    const lightboxClosingActions = getClosingActions();

    this.closeLightbox = () => {
        if (!lightboxClosingActions.isLightboxFadingOut)
            lightboxClosingActions.runActions();
    };
}