/**
 * @class
 * @param { FsLightbox.componentsStates.isSwipingSlides | { set: function(boolean), get: function(): boolean } } isFullscreenOpenState
 */
export function FullscreenToggler(
    {
        componentsStates: {
            isFullscreenOpen: isFullscreenOpenState
        }
    }
) {
    this.turnOnFullscreen = () => {
        isFullscreenOpenState.set(true);
        const documentElement = document.documentElement;
        if (documentElement.requestFullscreen) {
            documentElement.requestFullscreen();
        } else if (documentElement.mozRequestFullScreen) {
            documentElement.mozRequestFullScreen();
        } else if (documentElement.webkitRequestFullscreen) {
            documentElement.webkitRequestFullscreen();
        } else if (documentElement.msRequestFullscreen) {
            documentElement.msRequestFullscreen();
        }
    };

    this.turnOffFullscreen = () => {
        isFullscreenOpenState.set(false);
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
