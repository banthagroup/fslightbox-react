/**
 * @constructor
 */
export function LightboxUpdatingActions(
    {
        getters: {
            props: {
                getSlide
            }
        },
        data,
        getters: {
            getIsOpen: getIsLightboxOpen,
        },
        core: {
            lightboxCloser,
            lightboxOpener,
            slideChanger
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
            slideChanger.changeSlideTo(getSlide()) :
            data.slideOnLightboxOpen = getSlide();
    };
}
