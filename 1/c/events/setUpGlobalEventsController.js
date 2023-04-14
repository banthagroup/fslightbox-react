import { k } from "../k";
import { M } from "../M";
import { U } from "../U";
import { middleware } from "../../m/middleware";

export function setUpGlobalEventsController(o) {
    var {
		core: {
			globalEventsController: self,
			windowResizeActioner
		},
		fs,
	        r
	} = o, mv = r(M), u = r(U), kf;

    self.attachListeners = () => {
        document.addEventListener('pointermove', mv.a);
        document.addEventListener('pointerup', u.a);
        addEventListener('resize', windowResizeActioner.runActions);
	kf=function(e){k(o,e)};
        document.addEventListener('keydown', kf);
	fs.l()
    };

    self.removeListeners = () => {
        document.removeEventListener('pointermove', mv.a);
        document.removeEventListener('pointerup', u.a);
        removeEventListener('resize', windowResizeActioner.runActions);
        document.removeEventListener('keydown', kf);
	fs.q()
    }
}
