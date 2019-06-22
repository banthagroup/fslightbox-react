import { SourceLoadHandler } from "../../../src/core/sources/SourceLoadHandler";

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

    it('should call setIndex with source index', () => {
        expect(sourceLoadActions.setIndex).toBeCalledWith(3);
    });

    it('should call setDefaultDimensions with right dimensions', () => {
        expect(sourceLoadActions.setDefaultDimensions).toBeCalledWith(1600, 800);
    });

    it('should call runInitialLoadActions', () => {
        expect(sourceLoadActions.runInitialLoadActions).toBeCalled();
    });


    describe('second call', () => {
        beforeAll(() => {
            sourceLoadHandler.handleLoad();
        });

        it('should not call runInitialLoadActions second time', () => {
            expect(sourceLoadActions.runInitialLoadActions).toBeCalledTimes(1);
        });

        it('should not call setDefaultDimensions second time', () => {
            expect(sourceLoadActions.setDefaultDimensions).toBeCalledTimes(1);
        });

        it('should call setIndex twice with sourceIndex', () => {
            expect(sourceLoadActions.setIndex).toHaveBeenNthCalledWith(2, 3);
        });

        it('should call runNormalLoadActions', () => {
            expect(sourceLoadActions.runNormalLoadActions).toBeCalled();
        });
    });
});


describe('setUpLoadForVideo', () => {
    beforeAll(() => {
        setUpTestForIndex(1);
        sourceLoadHandler.setUpLoadForVideo();
        sourceLoadHandler.handleLoad({
            target: {
                videoWidth: 3000,
                videoHeight: 2500
            }
        });
    });

    it('should call setDefaultDimensions with right dimensions', () => {
        expect(sourceLoadActions.setDefaultDimensions).toBeCalledWith(3000, 2500);
    });
});

describe('setUpLoadForYoutube', () => {
    beforeAll(() => {
        setUpTestForIndex(10);
        sourceLoadHandler.setUpLoadForYoutube();
        sourceLoadHandler.handleLoad();
    });

    it('should call setDefaultDimensions with default YouTube dimensions', () => {
        expect(sourceLoadActions.setDefaultDimensions).toBeCalledWith(1920, 1080);
    });
});
