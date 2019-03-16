/** @class */
export function FullscreenToggler({ info: info }) {
    this.turnOnFullscreen = () => {
        info.isFullscreenOpen = true;
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
        info.isFullscreenOpen = false;
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
