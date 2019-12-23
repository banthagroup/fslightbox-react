export function runLightboxUnmountActions({ collections: { xhrs }, core: { lightboxCloseActioner }, getState }) {
    for (let i = 0; i < xhrs.length; i++) {
        xhrs[i].abort();
    }

    if(getState().isOpen) {
        lightboxCloseActioner.runActions();
    }
}
