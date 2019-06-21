import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from "../../constants/keyboardConstants";

export function setUpKeyboardController(
    {
        stageIndexes,
        core: {
            slideIndexChanger,
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
                slideIndexChanger.changeToWithActions(stageIndexes.previous);
                break;
            case RIGHT_ARROW:
                slideIndexChanger.changeToWithActions(stageIndexes.next);
                break;
        }
    };
}
