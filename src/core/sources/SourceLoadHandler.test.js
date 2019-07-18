import { SourceLoadHandler } from "./SourceLoadHandler";

const sourceLoadActions = {
    setIndex: () => {},
    setDefaultDimensions: () => {},
    runNormalLoadActions: () => {},
    runInitialLoadActions: () => {},
};
const fsLightbox = {
    core: {
        sourceLoadActions: sourceLoadActions
    }
};

let sourceLoadHandler;

const setUpTestForIndex = (index) => {
    sourceLoadActions.setIndex = jest.fn();
    sourceLoadActions.setDefaultDimensions = jest.fn();
    sourceLoadActions.runInitialLoadActions = jest.fn();
    sourceLoadActions.runNormalLoadActions = jest.fn();
    sourceLoadHandler = new SourceLoadHandler(fsLightbox);
    sourceLoadHandler.setIndex(index);
};

describe('handle load', () => {
    beforeAll(() => {
        setUpTestForIndex(3);
        sourceLoadHandler.setUpLoadForImage();

        // first call
        sourceLoadHandler.handleLoad({
            target: {
                width: 1600,
                height: 800
            }
        });
    });

    test('first call', () => {
        expect(sourceLoadActions.setIndex).toBeCalledWith(3);
        expect(sourceLoadActions.setDefaultDimensions).toBeCalledWith(1600, 800);
        expect(sourceLoadActions.runInitialLoadActions).toBeCalled();
    });

    test('second call', () => {
        sourceLoadHandler.handleLoad();
        expect(sourceLoadActions.runInitialLoadActions).toBeCalledTimes(1);
        expect(sourceLoadActions.setDefaultDimensions).toBeCalledTimes(1);
        expect(sourceLoadActions.setIndex).toHaveBeenNthCalledWith(2, 3);
        expect(sourceLoadActions.runNormalLoadActions).toBeCalled();
    });
});


test('setUpLoadForVideo', () => {
    setUpTestForIndex(1);
    sourceLoadHandler.setUpLoadForVideo();
    sourceLoadHandler.handleLoad({
        target: {
            videoWidth: 3000,
            videoHeight: 2500
        }
    });

    expect(sourceLoadActions.setDefaultDimensions).toBeCalledWith(3000, 2500);
});

test('setUpLoadForYoutube', () => {
    setUpTestForIndex(10);
    sourceLoadHandler.setUpLoadForYoutube();
    sourceLoadHandler.handleLoad();

    expect(sourceLoadActions.setDefaultDimensions).toBeCalledWith(1920, 1080);
});
