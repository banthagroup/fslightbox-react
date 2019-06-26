import * as injectStylesIfNotInDomObject from "../../../../src/core/styles/injectStylesIfNotInDom";
import { runLightboxMountedActions } from "../../../../src/core/main-component/mounting/runLightboxMountedActions";
import * as getScrollbarWidthObject from "../../../../src/core/scrollbar/getScrollbarWidth";

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

describe('injecting styles if not in dom', () => {
    beforeAll(() => {
        injectStylesIfNotInDomObject.injectStylesIfNotInDom = jest.fn();
        runLightboxMountedActions(fsLightbox);
    });

    it('should call injectStylesIfNotInDom', () => {
        expect(injectStylesIfNotInDomObject.injectStylesIfNotInDom).toBeCalled();
    });
});

describe('setting scrollbarWidth', () => {
    beforeAll(() => {
        fsLightbox.data.scrollbarWidth = 0;
        getScrollbarWidthObject.getScrollbarWidth = () => 15;
        runLightboxMountedActions(fsLightbox);
    });

    it('should set scrollbarWidth to value retrieved from getScrollbarWidth', () => {
        expect(fsLightbox.data.scrollbarWidth).toBe(15);
    });
});


describe('running or not opening actions', () => {
    describe('lightbox is closed', () => {
        beforeAll(() => {
            fsLightbox.core.lightboxOpeningActions.runActions = jest.fn();
            lightboxState.isOpen = false;
            runLightboxMountedActions(fsLightbox);
        });

        it('should not call runActionsForEvent', () => {
            expect(fsLightbox.core.lightboxOpeningActions.runActions).not.toBeCalled();
        });
    });

    describe('lightbox is open', () => {
        beforeAll(() => {
            fsLightbox.core.lightboxOpeningActions.runActionsForEvent = jest.fn();
            lightboxState.isOpen = true;
            runLightboxMountedActions(fsLightbox);
        });

        it('should call runActionsForSourceTypeAndIndex', () => {
            expect(fsLightbox.core.lightboxOpeningActions.runActions).toBeCalled();
        });
    });
});
