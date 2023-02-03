import { injectStylesIfNotInDom } from "../../styles/injectStylesIfNotInDom";
import { getScrollbarWidth } from "../../scrollbar/getScrollbarWidth";

export function runLightboxMountedActions(fsLightbox) {
    const {
        data,
	i,
        props: { openOnMount }
    } = fsLightbox;

    injectStylesIfNotInDom();
    data.scrollbarWidth = getScrollbarWidth(fsLightbox);

    if (openOnMount) {
        i();
    }
}
