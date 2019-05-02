import { setUpLightboxOpeningActions } from "../../../../src/core/main-component/opening/setUpLightboxOpeningActions";
import * as addOpenClassToDocumentElementObject
    from "../../../../src/helpers/dom/document/addOpenClassToDocumentElement";
import { ON_INIT, ON_OPEN, ON_SHOW } from "../../../../src/constants/eventsConstants";

const lightboxOpeningActions = {};
const fsLightbox = {
    data: {
        isInitialized: false
    },
    eventsDispatcher: {
        dispatch: () => {},
    },
    core: {
        lightboxOpeningActions: lightboxOpeningActions,
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
            },
            document: {
                keyDown: {
                    attachListener: () => {}
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

const resetUpLightboxOpeningActionsAndCallRunActions =() => {
    setUpLightboxOpeningActions(fsLightbox);
    lightboxOpeningActions.runActions();
};

describe('calling actions depending on isInitialized', () => {
    describe('lightbox is already initialized', () => {
        beforeAll(() => {
            fsLightbox.core.lightboxInitializer.initialize = jest.fn();
            fsLightbox.data.isInitialized = true;
            fsLightbox.eventsDispatcher.dispatch = jest.fn();
            resetUpLightboxOpeningActionsAndCallRunActions();
        });

        it('should not call initialize', () => {
            expect(fsLightbox.core.lightboxInitializer.initialize).not.toBeCalled();
        });

        it('should call onShow', () => {
            expect(fsLightbox.eventsDispatcher.dispatch).toBeCalledWith(ON_SHOW);
        });
    });

    describe('lightbox is not initialized', () => {
        beforeAll(() => {
            fsLightbox.core.lightboxInitializer.initialize = jest.fn();
            fsLightbox.data.isInitialized = false;
            fsLightbox.eventsDispatcher.dispatch = jest.fn();
            resetUpLightboxOpeningActionsAndCallRunActions();
        });

        it('should call initialize', () => {
            expect(fsLightbox.core.lightboxInitializer.initialize).toBeCalled();
        });

        it('should not call onShow', () => {
            expect(fsLightbox.eventsDispatcher.dispatch).not.toBeCalledWith(ON_SHOW);
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
        fsLightbox.core.eventsControllers.document.keyDown.attachListener = jest.fn();
        fsLightbox.core.globalResizingController.runAllResizingActions = jest.fn();
        fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders = jest.fn(() => ({
            withoutTimeout: withoutTimeout
        }));
        fsLightbox.eventsDispatcher.dispatch = jest.fn();
        resetUpLightboxOpeningActionsAndCallRunActions();
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

    describe('attaching document key down event controller', () => {
        it('should attachListener', () => {
            expect(fsLightbox.core.eventsControllers.document.keyDown.attachListener).toBeCalled();
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

    describe('dispatching onOpen event', () => {
        it('should call dispatch with onOpen', () => {
            expect(fsLightbox.eventsDispatcher.dispatch).toBeCalledWith(ON_OPEN);
        });
    });
});
