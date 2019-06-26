import { injectStylesIfNotInDom } from "../../styles/injectStylesIfNotInDom";
import { getScrollbarWidth } from "../../scrollbar/getScrollbarWidth";

export function runLightboxMountedActions(
    {
        data,
        getState,
        core: {
            lightboxOpeningActions: {
                runActions: runLightboxOpeningActions
            }
        }
    }
) {
    injectStylesIfNotInDom();
    data.scrollbarWidth = getScrollbarWidth();
    if (getState().isOpen) {
        runLightboxOpeningActions();
    }
}
