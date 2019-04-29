import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from "../../constants/keyboardConstants";

/**
 * @constructor
 */
export function KeyboardController(
    {
        core: {
            stage,
            slideChanger,
            lightboxCloser,
        }
    }
) {
    this.handleKeyDown = ({ keyCode }) => {
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