import { injectStylesIfNotInDom } from "../../styles/injectStylesIfNotInDom";
import{gsw}from"../../scrollbar/gsw";

export function runLightboxMountedActions({i,props:{openOnMount}}) {
    injectStylesIfNotInDom();
    data.scrollbarWidth = gsw();

    if (openOnMount) {
        i();
    }
}
