import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { StageSourceHoldersByValueTransformer } from "../../../../src/core/transforms/stage-source-holders-transformers/StageSourceHoldersByValueTransformer";
import { SetUpSourceHoldersTransformer } from "../../../../src/core/transforms/setUpSourceHoldersTransformer";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
fsLightboxMock.setAllSourceHoldersToDivs();
/** @var { StageSourceHoldersByValueTransformer }  */
let stageSourceHoldersByValueTransformer;
let sourceHolderTransformerMock;
fsLightbox.state.slide = 1;

beforeEach(() => {
    sourceHolderTransformerMock = {
        setSourceHolder: jest.fn(),
        byValue: jest.fn().mockReturnThis(),
        negative: jest.fn(),
        zero: jest.fn(),
        positive: jest.fn(),
    };
    // we are mocking DI of sourceHolder due to we will be testing if StageSourceHoldersByValueTransformer
    // is calling correct methods from there
    fsLightbox.injector.transforms.getSourceHolderTransformer = () => sourceHolderTransformerMock;
    // recreating SourceHoldersTransformer because we are using transformStageSourceHolderAtIndex method from there
    // in which we call getSourceHolderTransformer which is destructured so it cannot be overwritten
    fsLightbox.core.sourceHoldersTransformer = new SetUpSourceHoldersTransformer(fsLightbox);
});

describe('transforming all three stage sources holders, because there are three slides', () => {
    beforeEach(() => {
        fsLightbox.data.totalSlides = 3;
        stageSourceHoldersByValueTransformer = new StageSourceHoldersByValueTransformer(fsLightbox);
        stageSourceHoldersByValueTransformer.transformByValue(100);
    });

    it('should call byValue 3 times with 100 as param', () => {
        expect(sourceHolderTransformerMock.byValue).toHaveBeenNthCalledWith(3, 100);
    });

    describe('previous sources holder', () => {
        it('should call setSourceHolder with 2 because this is index of previous sourceHolder', () => {
            expect(sourceHolderTransformerMock.setSourceHolder).toBeCalledWith(fsLightbox.elements.sourceHolders[2]);
        });

        it('should call transform zero', () => {
            expect(sourceHolderTransformerMock.negative).toBeCalled();
        });
    });

    describe('current sources holder', () => {
        it('should call setSourceHolder with current sourceHolder', () => {
            expect(sourceHolderTransformerMock.setSourceHolder).toBeCalledWith(fsLightbox.elements.sourceHolders[0]);
        });

        it('should call transform zero', () => {
            expect(sourceHolderTransformerMock.zero).toBeCalled();
        });
    });

    describe('next sources holder', () => {
        it('should call setSourceHolder with 1 because this is index of next sourceHolder', () => {
            expect(sourceHolderTransformerMock.setSourceHolder).toBeCalledWith(fsLightbox.elements.sourceHolders[1]);
        });

        it('should call transform zero', () => {
            expect(sourceHolderTransformerMock.positive).toBeCalled();
        });
    });
});


describe('transforming only current and next stage sources holder, because there are only 2 slides', () => {
    beforeEach(() => {
        fsLightbox.data.totalSlides = 2;
        stageSourceHoldersByValueTransformer = new StageSourceHoldersByValueTransformer(fsLightbox);
        stageSourceHoldersByValueTransformer.transformByValue(100);
    });

    it('should call byValue 2 times with 100 as param', () => {
        expect(sourceHolderTransformerMock.byValue).toHaveBeenNthCalledWith(2,  100);
    });

    describe('previous sources holder', () => {
        it('should not call setSourceHolder with previous sources holder', () => {
            expect(sourceHolderTransformerMock.setSourceHolder).not.toBeCalledWith(fsLightbox.elements.sourceHolders[2]);
        });

        it('should not call transform negative', () => {
            expect(sourceHolderTransformerMock.negative).not.toBeCalled();
        });
    });

    describe('current sources holder', () => {
        it('should call setSourceHolder with 0 because this is index of current sourceHolder', () => {
            expect(sourceHolderTransformerMock.setSourceHolder).toBeCalledWith(fsLightbox.elements.sourceHolders[0]);
        });

        it('should call transform zero', () => {
            expect(sourceHolderTransformerMock.zero).toBeCalled();
        });
    });

    describe('next sources holder', () => {
        it('should call setSourceHolder with 1 because this is index of next sourceHolder', () => {
            expect(sourceHolderTransformerMock.setSourceHolder).toBeCalledWith(fsLightbox.elements.sourceHolders[1]);
        });

        it('should call transform positive', () => {
            expect(sourceHolderTransformerMock.positive).toBeCalled();
        })
    });
});


describe('transforming only current stage sources holder, because there is only 1 slide', () => {
    beforeEach(() => {
        fsLightbox.data.totalSlides = 1;
        stageSourceHoldersByValueTransformer = new StageSourceHoldersByValueTransformer(fsLightbox);
        stageSourceHoldersByValueTransformer.transformByValue(100);
    });

    it('should call byValue 1 time with 100 as param', () => {
        expect(sourceHolderTransformerMock.byValue).toHaveBeenNthCalledWith(1, 100);
    });

    describe('previous sources holder', () => {
        it('should not call setSourceHolder with previous sources holder', () => {
            expect(sourceHolderTransformerMock.setSourceHolder).not.toBeCalledWith(fsLightbox.elements.sourceHolders[2]);
        });

        it('should call transform zero', () => {
            expect(sourceHolderTransformerMock.negative).not.toBeCalled();
        });
    });

    describe('current sources holder', () => {
        it('should call setSourceHolder with current sources holder', () => {
            expect(sourceHolderTransformerMock.setSourceHolder).toBeCalledWith(fsLightbox.elements.sourceHolders[0]);
        });

        it('should call transform zero', () => {
            expect(sourceHolderTransformerMock.zero).toBeCalled();
        });
    });

    describe('next sources holder', () => {
        it('should not call setSourceHolder with next sources holder', () => {
            expect(sourceHolderTransformerMock.setSourceHolder).not.toBeCalledWith(fsLightbox.elements.sourceHolders[1]);
        });

        it('should call transform zero', () => {
            expect(sourceHolderTransformerMock.positive).not.toBeCalled();
        })
    });
});