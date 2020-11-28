import { injectStylesIfNotInDom } from "../../styles/injectStylesIfNotInDom";
import { getScrollbarWidth } from "../../scrollbar/getScrollbarWidth";

export function runLightboxMountedActions(
    {
        core: { lightboxOpener },
        data,
        props: { openOnMount }
    }
) {
    injectStylesIfNotInDom();
    data.scrollbarWidth = getScrollbarWidth();

    if (openOnMount) {
        lightboxOpener.initializeAndOpenLightbox();
    }
}
