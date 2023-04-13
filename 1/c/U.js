import { Ua } from "./Ua";

export function U({ p,r }) {
    var a = r(Ua);

    this.a = function () {
        if (p.isSwiping) {
            (p.swipedX) ?
                a.s() :
                a.n();
        }
    }
}
