import { ma } from "./ma";
import { fr } from "../h/fr";

export function M({ p, sl }) {
    var frf = fr();

    (sl === 1) ?
        this.a = function () {
            p.swipedX = 1
        } :
        this.a = function (e) {
            if (p.isSwiping && frf())
                ma(o, e)
        }
}
