import { k } from "../k";
import { SlideSwipingMove } from "../slide/swiping/move/SlideSwipingMove";
import { SlideSwipingUp } from "../slide/swiping/up/SlideSwipingUp";
import { middleware } from "../../m/middleware";

export function setUpGlobalEventsController(o) {
    var {
		core: {
			globalEventsController: self,
			windowResizeActioner
		},
		fs,
	        r
	} = o, mv = r(M), slideSwipingUp = r(SlideSwipingUp), kf;

    self.attachListeners = () => {
        document.addEventListener('pointermove', mv.a);

        document.addEventListener('mouseup', slideSwipingUp.listener);
        document.addEventListener('touchend', slideSwipingUp.listener, { passive: true });

        addEventListener('resize', windowResizeActioner.runActions);

	var kf=function(e){k(o,e)};
        document.addEventListener('keydown', kf);

	fs.l()
    };

    self.removeListeners = () => {
        document.removeEventListener('pointermove', mv.a);

        document.removeEventListener('mouseup', slideSwipingUp.listener);
        document.removeEventListener('touchend', slideSwipingUp.listener);

        removeEventListener('resize', windowResizeActioner.runActions);

        document.removeEventListener('keydown', kf);

	fs.q()
    }
}
