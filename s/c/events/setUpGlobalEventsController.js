import { k } from "../k";
import { M } from "../M";
import { u } from "../u";
import { middleware } from "../../m/middleware";

export function setUpGlobalEventsController(o) {
    var {
		core: {
			globalEventsController: self,
			windowResizeActioner
		},
		fs,
	        r
	} = o, mv = r(M), kf, uf;

    self.attachListeners = () => {
        document.addEventListener('pointermove', mv.a);
        uf=function(e){u(o,e)};document.addEventListener('pointerup', uf);
        addEventListener('resize', windowResizeActioner.runActions);
	kf=function(e){k(o,e)};
        document.addEventListener('keydown', kf);
	fs.l()
    };

    self.removeListeners = () => {
        document.removeEventListener('pointermove', mv.a);
        document.removeEventListener('pointerup', uf);
        removeEventListener('resize', windowResizeActioner.runActions);
        document.removeEventListener('keydown', kf);
	fs.q()
    }
}
