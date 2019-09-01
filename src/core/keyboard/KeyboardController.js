export function KeyboardController({ core: { lightboxCloser, slideChangeFacade } }) {
    this.listener = ({ keyCode }) => {
        switch (keyCode) {
            case 27:
                lightboxCloser.closeLightbox();
                break;
            case 37:
                slideChangeFacade.changeToPrevious();
                break;
            case 39:
                slideChangeFacade.changeToNext();
                break;
        }
    };
}
