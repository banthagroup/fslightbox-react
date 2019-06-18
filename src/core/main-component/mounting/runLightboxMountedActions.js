import { injectStylesIfNotInDom } from "../../styles/injectStylesIfNotInDom";
import { getScrollbarWidth } from "../../scrollbar/getScrollbarWidth";

export function runLightboxMountedActions(
    {
        data,
        getState,
        core: {
            lightboxOpeningActions: {
                runActions: runLightboxOpeningActions
            },
            stageManager
        }
    }
) {
    injectStylesIfNotInDom();
    stageManager.updateStageIndexes();
    data.scrollbarWidth = getScrollbarWidth();
    if (getState().isOpen) {
        runLightboxOpeningActions();
    }
}
