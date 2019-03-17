import { CONTAINER_FADE_OUT_TIME } from "../constants/CoreConstants";

/**
 * @param fsLightbox { FsLightbox }
 * @class
 */
export function CloseOpenLightbox(fsLightbox) {
    const documentClassList = document.documentElement.classList;
    let fadingOut = false;

    this.openLightbox = () => {
        fsLightbox.setState({
            isOpen: true,
        }, () => {
            componentMountedAfterOpen();
            this.addOpeningClassToDocument();
        });
    };

    this.addOpeningClassToDocument = () => {
        documentClassList.add('fslightbox-open');
    };

    this.closeLightbox = () => {
        if (fadingOut) return;
        fadingOut = true;
        fsLightbox.elements.container.current.classList.add('fslightbox-fade-out-complete');
        setTimeout(() => {
            this.afterFadeOut();
        }, CONTAINER_FADE_OUT_TIME);
    };

    this.afterFadeOut = () => {
        fsLightbox.elements.container.current.classList.remove('fslightbox-fade-out-complete');
        fadingOut = false;
        documentClassList.remove('fslightbox-open');
        fsLightbox.setState({
            isOpen: false
        });
        componentMountedAfterClose();
    };

    const componentMountedAfterOpen = () => {
        if (!fsLightbox.data.isInitialized) {
            fsLightbox.initialize();
            return;
        }
        fsLightbox.core.onResize.attachListener();
        fsLightbox.core.onResize.adjustMediaHolderSize();
        fsLightbox.core.sourceHoldersTransformer.transformStageSources().withoutTimeout();
    };

    const componentMountedAfterClose = () => {
        fsLightbox.core.onResize.removeListener();
    }
}