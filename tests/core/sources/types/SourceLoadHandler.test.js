import { SourceLoadHandler } from "../../../../src/core/sources/SourceLoadHandler";

const sourceController = {
    setIndex: () => {},
    setSourceWidth: () => {},
    setSourceHeight: () => {},
    runNormalLoadActions: () => {},
    runInitialLoadActions: () => {},
};
const fsLightbox = {
    core: {
        sourceController: sourceController
    }
};

let sourceLoadHandler;

const setUpTestForIndex = (index) => {
    sourceController.setIndex = jest.fn();
    sourceController.setSourceWidth = jest.fn();
    sourceController.setSourceHeight = jest.fn();
    sourceController.runInitialLoadActions = jest.fn();
    sourceController.runNormalLoadActions = jest.fn();
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
        expect(sourceController.setIndex).toBeCalledWith(3);
    });

    it('should call setSourceWidth with source width', () => {
        expect(sourceController.setSourceWidth).toBeCalledWith(1600);
    });

    it('should call setSourceHeight with source height', () => {
        expect(sourceController.setSourceHeight).toBeCalledWith(800);
    });

    it('should call runInitialLoadActions', () => {
        expect(sourceController.runInitialLoadActions).toBeCalled();
    });


    describe('second call', () => {
        beforeAll(() => {
            sourceLoadHandler.handleLoad();
        });

        it('should not call runInitialLoadActions second time', () => {
            expect(sourceController.runInitialLoadActions).toBeCalledTimes(1);
        });

        it('should not call setSourceWidth second time', () => {
            expect(sourceController.setSourceWidth).toBeCalledTimes(1);
        });

        it('should not call setSourceHeight second time', () => {
            expect(sourceController.setSourceHeight).toBeCalledTimes(1);
        });

        it('should call setIndex twice with sourceIndex', () => {
            expect(sourceController.setIndex).toHaveBeenNthCalledWith(2, 3);
        });

        it('should call runNormalLoadActions', () => {
            expect(sourceController.runNormalLoadActions).toBeCalled();
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

    it('should call setSourceWidth with 3000', () => {
        expect(sourceController.setSourceWidth).toBeCalledWith(3000);
    });

    it('should call setSourceHeight with 2500', () => {
        expect(sourceController.setSourceHeight).toBeCalledWith(2500);
    });
});

describe('setUpLoadForYoutube', () => {
    beforeAll(() => {
        setUpTestForIndex(10);
        sourceLoadHandler.setUpLoadForYoutube();
        sourceLoadHandler.handleLoad();
    });

    it('should call setSourceWidth with 1920 - default value', () => {
        expect(sourceController.setSourceWidth).toBeCalledWith(1920);
    });

    it('should call setSourceHeight with 1080 - default value', () => {
        expect(sourceController.setSourceHeight).toBeCalledWith(1080);
    });
});
