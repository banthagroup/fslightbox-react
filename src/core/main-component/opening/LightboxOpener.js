/**
 * @constructor
 * @param { FsLightbox.setters.setState | function(Object, function)} setState
 * @param { FsLightbox.core.lightboxOpeningActions | LightboxOpeningActions } lightboxOpeningActions
 */
export function LightboxOpener(
    {
        setters: { setState },
        core: { lightboxOpeningActions }
    }
) {
    this.openLightbox = () => {
        setState({
            isOpen: true,
        }, () => {
            lightboxOpeningActions.runActions();
        });
    };
}