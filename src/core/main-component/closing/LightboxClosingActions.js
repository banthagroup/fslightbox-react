import {
    FSLIGHTBOX_OPEN_CLASS_NAME,
    LONG_FADE_OUT_CLASS_NAME
} from "../../../constants/cssConstants";
import { CONTAINER_FADE_OUT_TIME } from "../../../constants/coreConstants";
import { documentElementClassList } from "../../../helpers/dom/documentElementClassList";

/**
 * @class
 * @param { FsLightbox.setters.setState | Function } setState
 * @param { FsLightbox.componentsStates.isFullscreenOpen | { get: Function } } isFullscreenOpenState
 * @param { FsLightbox.elements.container | { current: { classList: DOMTokenList} } } lightboxContainer
 * @param { FsLightbox.core.fullscreenToggler.turnOffFullscreen | Function } turnOffFullscreen
 * @param { FsLightbox.core.eventsControllers.window.resize.removeListener | Function } removeResizeListener
 * @param { FsLightbox.core.eventsControllers.window.swiping.removeListeners | Function } removeSwipingListeners
 */
export function LightboxClosingActions(
    {
        setters: { setState },
        componentsStates: {
            isFullscreenOpen: isFullscreenOpenState
        },
        elements: {
            container: lightboxContainer
        },
        core: {
            fullscreenToggler: { turnOffFullscreen },
            eventsControllers: {
                window: {
                    resize: {
                        removeListener: removeResizeListener,
                    },
                    swiping: {
                        removeListeners: removeSwipingListeners,
                    }
                }
            }
        },
    }
) {
    this.isLightboxFadingOut = false;

    this.runActions = () => {
        this.isLightboxFadingOut = true;
        getLightboxContainerClassList().add(LONG_FADE_OUT_CLASS_NAME);
        removeSwipingListeners();
        ifFullscreenIsOpenCloseIt();
        setTimeout(() => {
            afterFadeOut();
        }, CONTAINER_FADE_OUT_TIME);
    };

    const ifFullscreenIsOpenCloseIt = () => {
        if (isFullscreenOpenState.get()) {
            turnOffFullscreen();
        }
    };

    const afterFadeOut = () => {
        getLightboxContainerClassList().remove(LONG_FADE_OUT_CLASS_NAME);
        documentElementClassList.remove(FSLIGHTBOX_OPEN_CLASS_NAME);
        setState({
            isOpen: false
        });
        removeResizeListener();
        this.isLightboxFadingOut = false;
    };

    /** @return { DOMTokenList } */
    const getLightboxContainerClassList = () => {
        return lightboxContainer.current.classList;
    };
}