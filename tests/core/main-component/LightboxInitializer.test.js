import { LightboxInitializer } from "../../../src/core/main-component/LightboxInitializer";

const withoutTimeout = jest.fn();
const fsLightbox = {
    core: {
        globalResizingController: {
            saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize: jest.fn()
        },
        eventsControllers: {
            window: {
                resize: {
                    attachListener: jest.fn()
                },
                swiping: {
                    attachListeners: jest.fn()
                }
            }
        },
        sourceHoldersTransformer: {
            transformStageSourceHolders: jest.fn(() => ({
                withoutTimeout: withoutTimeout
            }))
        },
        lightboxOpener: {
            addOpenClassToDocumentElement: jest.fn()
        },
        sourcesFactory: {
            createSourcesAndAddThemToSourcesComponentsArray: jest.fn()
        }
    }
};

const lightboxInitializer = new LightboxInitializer(fsLightbox);

describe('calling right methods', () => {
    beforeAll(() => {
        lightboxInitializer.initialize();
    });

    it('should call saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize', () => {
        expect(fsLightbox.core.globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize).toBeCalled();
    });

    it('should call attaching resize listener', () => {
        expect(fsLightbox.core.eventsControllers.window.resize.attachListener).toBeCalled();
    });

    it('should call attaching swiping listeners', () => {
        expect(fsLightbox.core.eventsControllers.window.swiping.attachListeners).toBeCalled();
    });

    it('should call addOpenClassToDocumentElement', () => {
        expect(fsLightbox.core.lightboxOpener.addOpenClassToDocumentElement).toBeCalled();
    });

    it('should call createSourcesAndAddThemToSourcesComponentsArray', () => {
        expect(fsLightbox.core.sourcesFactory.createSourcesAndAddThemToSourcesComponentsArray).toBeCalled();
    });
});