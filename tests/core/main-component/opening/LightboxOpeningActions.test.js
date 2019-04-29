import { runLightboxOpeningActions } from "../../../../src/core/main-component/opening/LightboxOpeningActions";
import * as addOpenClassToDocumentElementObject
    from "../../../../src/helpers/dom/document/addOpenClassToDocumentElement";

const fsLightbox = {
    data: {
        isInitialized: false
    },
    core: {
        scrollbarRecompensor: {
            addRecompense: () => {}
        },
        globalResizingController: {
            runAllResizingActions: () => {}
        },
        eventsControllers: {
            window: {
                resize: {
                    attachListener: () => {}
                },
                swiping: {
                    attachListeners: () => {}
                }
            }
        },
        sourceHoldersTransformer: {
            transformStageSourceHolders: () => ({
                withoutTimeout: () => {}
            })
        },
        lightboxInitializer: {
            initialize: () => {}
        }
    }
};

/** @var { LightboxOpeningActions } lightboxOpeningActions */
let lightboxOpeningActions;

const recreateLightboxOpeningActionsAndCallRunActions = () => {
    lightboxOpeningActions = new runLightboxOpeningActions(fsLightbox);
    lightboxOpeningActions.runActions();
};

describe('initializing or not lightbox', () => {
    describe('lightbox is already initialized', () => {
        beforeAll(() => {
            fsLightbox.core.lightboxInitializer.initialize = jest.fn();
            fsLightbox.data.isInitialized = true;
            recreateLightboxOpeningActionsAndCallRunActions();
        });

        it('should not call initialize', () => {
            expect(fsLightbox.core.lightboxInitializer.initialize).not.toBeCalled();
        });
    });

    describe('lightbox is not initialized', () => {
        beforeAll(() => {
            fsLightbox.core.lightboxInitializer.initialize = jest.fn();
            fsLightbox.data.isInitialized = false;
            recreateLightboxOpeningActionsAndCallRunActions();
        });

        it('should call initialize', () => {
            expect(fsLightbox.core.lightboxInitializer.initialize).toBeCalled();
        });
    });
});

describe('calling methods', () => {
    let withoutTimeout;

    beforeAll(() => {
        withoutTimeout = jest.fn();
        fsLightbox.core.scrollbarRecompensor.addRecompense = jest.fn();
        addOpenClassToDocumentElementObject.addOpenClassToDocumentElement = jest.fn();
        fsLightbox.core.eventsControllers.window.resize.attachListener = jest.fn();
        fsLightbox.core.eventsControllers.window.swiping.attachListeners = jest.fn();
        fsLightbox.core.globalResizingController.runAllResizingActions = jest.fn();
        fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders = jest.fn(() => ({
            withoutTimeout: withoutTimeout
        }));
        recreateLightboxOpeningActionsAndCallRunActions();
    });

    describe('adding scrollbar recompense', () => {
        it('should call addRecompense', () => {
            expect(fsLightbox.core.scrollbarRecompensor.addRecompense).toBeCalled();
        });
    });

    describe('adding open class to document', () => {
        it('should call addOpenClassToDocument', () => {
            expect(addOpenClassToDocumentElementObject.addOpenClassToDocumentElement).toBeCalled();
        });
    });

    describe('attaching window resize listener', () => {
        it('should call attachListener', () => {
            expect(fsLightbox.core.eventsControllers.window.resize.attachListener).toBeCalled();
        });
    });

    describe('attaching swiping listeners', () => {
        it('should call attachListeners', () => {
            expect(fsLightbox.core.eventsControllers.window.swiping.attachListeners).toBeCalled();
        });
    });

    describe('running all resizing actions', () => {
        it('should call runAllResizingActions', () => {
            expect(fsLightbox.core.globalResizingController.runAllResizingActions).toBeCalled();
        });
    });

    describe('transforming stage source holders without timeout', () => {
        it('should call transformStageSourceHolders', () => {
            expect(fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders).toBeCalled();
        });

        it('should call withoutTimeout', () => {
            expect(withoutTimeout).toBeCalled();
        });
    });
});
