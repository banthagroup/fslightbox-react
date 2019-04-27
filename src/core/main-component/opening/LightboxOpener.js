/**
 * @constructor
 * @param { FsLightbox.injector.mainComponent.getOpeningActions| function(): LightboxOpeningActions } getOpeningActions
 */
export function LightboxOpener(
    {
        setters: { setState },
        injector: {
            mainComponent: {
                getOpeningActions
            }
        }
    }
) {
    const lightboxOpeningActions = getOpeningActions();

    this.openLightbox = () => {
        setState({
            isOpen: true,
        }, () => {
            lightboxOpeningActions.runActions();
        });
    }
}