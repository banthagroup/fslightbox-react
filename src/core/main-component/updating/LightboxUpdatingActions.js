/**
 * @constructor
 */
export function LightboxUpdatingActions(
    {
        getProps,
        data,
        getters: {
            getIsOpen: getIsLightboxOpen,
        },
        core: {
            lightboxCloser,
            lightboxOpener,
            slideIndexChanger
        }
    }
) {
    this.runIsOpenUpdateActions = () => {
        (getIsLightboxOpen()) ?
            lightboxCloser.closeLightbox() :
            lightboxOpener.openLightbox();
    };

    this.runSlideUpdateActions = () => {
        (getIsLightboxOpen()) ?
            slideIndexChanger.changeToWithActions(getProps().slide - 1) :
            data.slideOnLightboxOpen = getProps().slide - 1;
    };
}
