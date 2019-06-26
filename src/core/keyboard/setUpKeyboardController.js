import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from "../../constants/keyboardConstants";

export function setUpKeyboardController(
    {
        core: {
            keyboardController: self,
            lightboxCloser,
            slideChangeFacade
        }
    }
) {
    self.handleKeyDown = ({ keyCode }) => {
        switch (keyCode) {
            case ESCAPE:
                lightboxCloser.closeLightbox();
                break;
            case LEFT_ARROW:
                slideChangeFacade.changeToPrevious();
                break;
            case RIGHT_ARROW:
                slideChangeFacade.changeToNext();
                break;
        }
    };
}
