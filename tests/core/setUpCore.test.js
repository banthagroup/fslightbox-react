import { setUpCore } from "../../src/core/setUpCore";

let functionKey = 0;
const getKeyedFunction = () => {
    functionKey++;
    let key = functionKey;
    return () => ({
        key: key
    });
};

let objectKey = 0;
const getKeyedObject = () => {
    objectKey++;
    return {
        key: objectKey
    }
};

const fsLightbox = {
    injector: {
        core: {
            eventsControllers: {
                document: {
                    getKeyDown: getKeyedFunction(),
                },
                window: {
                    getResize: getKeyedFunction(),
                    getSwiping: getKeyedFunction()
                }
            },
            getFullscreenToggler: getKeyedFunction(),
            getGlobalResizingController: getKeyedFunction(),
            getKeyboardController: getKeyedFunction(),
            getLightboxCloser: getKeyedFunction(),
            getLightboxInitializer: getKeyedFunction(),
            getLightboxOpener: getKeyedFunction(),
            getLightboxOpeningActions: getKeyedFunction(),
            getScrollbarRecompensor: getKeyedFunction(),
            getSlideChanger: getKeyedFunction(),
            slideSwiping: {
                getDownForSwipingProps: getKeyedFunction(),
                getMoveForSwipingProps: getKeyedFunction(),
                getUpForSwipingProps: getKeyedFunction()
            },
            getSourceAnimator: getKeyedFunction(),
            getSourceController: getKeyedFunction(),
            getSourceHoldersTransformer: getKeyedFunction(),
            getSourcesFactory: getKeyedFunction(),
            getStage: getKeyedFunction()
        }
    },
    core: {
        eventsControllers: {
            document: {
                keyDown: getKeyedObject()
            },
            window: {
                resize: getKeyedObject(),
                swiping: getKeyedObject(),
            }
        },
        fullscreenToggler: getKeyedObject(),
        globalResizingController: getKeyedObject(),
        keyboardController: getKeyedObject(),
        lightboxCloser: getKeyedObject(),
        lightboxInitializer: getKeyedObject(),
        lightboxOpener: getKeyedObject(),
        lightboxOpeningActions: getKeyedObject(),
        scrollbarRecompensor: getKeyedObject(),
        slideChanger: getKeyedObject(),
        slideSwiping: {
            down: getKeyedObject(),
            move: getKeyedObject(),
            up: getKeyedObject()
        },
        sourceAnimator: getKeyedObject(),
        sourceController: getKeyedObject(),
        sourceHoldersTransformer: getKeyedObject(),
        sourcesFactory: getKeyedObject(),
        stage: getKeyedObject()             
    }
};

beforeAll(() => {
    Object.assign = jest.fn();
    setUpCore(fsLightbox);
});

describe('calling Object assign with correct object from core and correct constructor from injector', () => {
    describe('eventsControllers', () => {
        
    });
    
    it('should call Object.assign for FullscreenToggler', () => {
        expect(Object.assign)
            .toBeCalledWith(fsLightbox.core.fullscreenToggler, fsLightbox.injector.core.getFullscreenToggler());
    });
});
