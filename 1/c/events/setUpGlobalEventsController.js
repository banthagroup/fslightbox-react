import { k } from "../k";
import { SlideSwipingMove } from "../slide/swiping/move/SlideSwipingMove";
import { SlideSwipingUp } from "../slide/swiping/up/SlideSwipingUp";
import { middleware } from "../../m/middleware";
import { oneOrZeroTouches } from "../../m/oneOrZeroTouches";

export function setUpGlobalEventsController(o) {
    var {
		core: {
			globalEventsController: self,
			windowResizeActioner
		},
		fs,
	        resolve
	} = o, slideSwipingMove = resolve(SlideSwipingMove), slideSwipingUp = resolve(SlideSwipingUp), touchmoveListener, kf;

    self.attachListeners = () => {
        touchmoveListener = middleware(slideSwipingMove.listener, oneOrZeroTouches);

        document.addEventListener('mousemove', slideSwipingMove.listener);
        document.addEventListener('touchmove', touchmoveListener, { passive: true });

        document.addEventListener('mouseup', slideSwipingUp.listener);
        document.addEventListener('touchend', slideSwipingUp.listener, { passive: true });

        addEventListener('resize', windowResizeActioner.runActions);

	var kf=function(e){k(o,e)};
        document.addEventListener('keydown', kf);

	fs.l()
    };

    self.removeListeners = () => {
        document.removeEventListener('mousemove', slideSwipingMove.listener);
        document.removeEventListener('touchmove', touchmoveListener);

        document.removeEventListener('mouseup', slideSwipingUp.listener);
        document.removeEventListener('touchend', slideSwipingUp.listener);

        removeEventListener('resize', windowResizeActioner.runActions);

        document.removeEventListener('keydown', kf);

	fs.q()
    }
}
