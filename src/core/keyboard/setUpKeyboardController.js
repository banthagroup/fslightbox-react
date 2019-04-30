import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from "../../constants/keyboardConstants";

export function setUpKeyboardController(
    {
        core: {
            stage,
            slideChanger,
            lightboxCloser,
            keyboardController: self
        }
    }
) {
    self.handleKeyDown = ({ keyCode }) => {
        switch (keyCode) {
            case ESCAPE:
                lightboxCloser.closeLightbox();
                break;
            case LEFT_ARROW:
                slideChanger.changeSlideTo(stage.getPreviousSlideNumber());
                break;
            case RIGHT_ARROW:
                slideChanger.changeSlideTo(stage.getNextSlideNumber());
                break;
        }
    };
}