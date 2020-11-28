export function runLightboxUnmountActions(
    {
        collections: { xhrs },
        componentsServices: { isLightboxOpenManager },
        core: {
            globalEventsController
        }
    }
) {
    for (let i = 0; i < xhrs.length; i++) {
        xhrs[i].abort();
    }

    /**
     *  When lightbox will be remounted when open need only to remove listeners, services like fullscreen or scrollbar recompense
     *  stays untouched
     */
    if (isLightboxOpenManager.get()) {
        globalEventsController.removeListeners();
    }
}
