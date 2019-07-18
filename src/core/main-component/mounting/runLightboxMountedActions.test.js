import { runLightboxMountedActions } from "./runLightboxMountedActions";
import * as injectStylesIfNotInDomObject from "../../styles/injectStylesIfNotInDom";
import * as getScrollbarWidthObject from "../../scrollbar/getScrollbarWidth";

const fsLightbox = {
    data: {
        scrollbarWidth: 0
    },
    getState: () => lightboxState,
    core: {
        lightboxOpeningActions: {
            runActions: () => {}
        }
    }
};

const lightboxState = {
    isOpen: false
};

test('simple actions', () => {
    injectStylesIfNotInDomObject.injectStylesIfNotInDom = jest.fn();
    fsLightbox.data.scrollbarWidth = 0;
    getScrollbarWidthObject.getScrollbarWidth = () => 15;

    runLightboxMountedActions(fsLightbox);

    expect(injectStylesIfNotInDomObject.injectStylesIfNotInDom).toBeCalled();
    expect(fsLightbox.data.scrollbarWidth).toBe(15);
});

describe('running or not opening actions', () => {
    beforeEach(() => {
        fsLightbox.core.lightboxOpeningActions.runActions = jest.fn();
    });

    test('lightbox is closed - not running actions', () => {
        lightboxState.isOpen = false;
        runLightboxMountedActions(fsLightbox);
        expect(fsLightbox.core.lightboxOpeningActions.runActions).not.toBeCalled();
    });

    test('lightbox is open - running actions', () => {
        lightboxState.isOpen = true;
        runLightboxMountedActions(fsLightbox);
        expect(fsLightbox.core.lightboxOpeningActions.runActions).toBeCalled();
    });
});
