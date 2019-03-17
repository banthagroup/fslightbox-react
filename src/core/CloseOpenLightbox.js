import { CONTAINER_FADE_OUT_TIME } from "../constants/CoreConstants";
import { FADE_OUT_COMPLETE_CLASS_NAME, FSLIGHTBOX_OPEN_CLASS_NAME } from "../constants/CssConstants";

/**
 * @param { FsLightbox } fsLightbox
 * @param { FsLightbox.setters } fsLightbox.setters
 * @param { { current } } container
 * @param { OnResize } onResize
 * @param { SourceHoldersTransformer } sourceHoldersTransformer
 * @param { FsLightbox.data } data
 * @param { Function } setState
 * @param { FsLightbox.initialize } initialize
 * @class
 */
export function CloseOpenLightbox(
    {
        elements: { container },
        core: { onResize, sourceHoldersTransformer },
        data,
        setters: { setState },
        getters: { initialize },
    }
) {
    const documentClassList = document.documentElement.classList;
    let fadingOut = false;

    this.openLightbox = () => {
        setState({
            isOpen: true,
        }, () => {
            componentMountedAfterOpen();
            this.addOpeningClassToDocument();
        });
    };

    this.addOpeningClassToDocument = () => {
        documentClassList.add(FSLIGHTBOX_OPEN_CLASS_NAME);
    };

    this.closeLightbox = () => {
        if (fadingOut) return;
        fadingOut = true;
        container.current.classList.add(FADE_OUT_COMPLETE_CLASS_NAME);
        setTimeout(() => {
            this.afterFadeOut();
        }, CONTAINER_FADE_OUT_TIME);
    };

    this.afterFadeOut = () => {
        container.current.classList.remove(FADE_OUT_COMPLETE_CLASS_NAME);
        fadingOut = false;
        documentClassList.remove(FSLIGHTBOX_OPEN_CLASS_NAME);
        setState({
            isOpen: false
        });
        componentMountedAfterClose();
    };

    const componentMountedAfterOpen = () => {
        if (!data.isInitialized) {
            initialize();
            return;
        }
        onResize.attachListener();
        onResize.adjustMediaHolderSize();
        sourceHoldersTransformer.transformStageSources().withoutTimeout();
    };

    const componentMountedAfterClose = () => {
        onResize.removeListener();
    }
}