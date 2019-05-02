import { StageSourceHoldersByValueTransformer } from "../../../../src/core/transforms/stage-source-holders-transformers/StageSourceHoldersByValueTransformer";
import { BaseStageSourceHoldersTransformer } from "../../../../src/core/transforms/stage-source-holders-transformers/BaseStageSourceHoldersTransformer";


const fsLightbox = {
    core: {
        sourceHoldersTransformer: {
            transformSourceHolderAtIndex: () => {},
            isStageSourceHolderAtIndexValidForTransform: () => {}
        },
        stage: {
            getAllStageIndexes: () => ({})
        }
    }
};


/** @var { StageSourceHoldersByValueTransformer }  */
let stageSourceHoldersByValueTransformer;

const recreateStageSourceHoldersByValueTransformerAndCAllTransformByValueWithValue = (value) => {
    stageSourceHoldersByValueTransformer = new StageSourceHoldersByValueTransformer(fsLightbox);
    stageSourceHoldersByValueTransformer.transformByValue(value);
};

describe('inheritance', () => {
    const rememberedCall = BaseStageSourceHoldersTransformer.call;

    beforeAll(() => {
        BaseStageSourceHoldersTransformer.call = jest.fn();
        // mocking two methods because they are used in StageSourceHoldersByValueTransformer
        // so it would throw errors without them
        BaseStageSourceHoldersTransformer.prototype.isPreviousSourceHolderSet = () => {};
        BaseStageSourceHoldersTransformer.prototype.isNextSourceHolderSet = () => {};
        stageSourceHoldersByValueTransformer = new StageSourceHoldersByValueTransformer(fsLightbox);
    });

    it('should call BaseStageSourceHolders call with instance and fsLightbox', () => {
        expect(BaseStageSourceHoldersTransformer.call)
            .toBeCalledWith(stageSourceHoldersByValueTransformer, fsLightbox);
    });

    afterAll(() => {
        BaseStageSourceHoldersTransformer.call = rememberedCall;
    });
});


describe('transformByValue', () => {
    let byValueCalls;
    let transformCalls;

    beforeEach(() => {
        byValueCalls = [];
        transformCalls = [];
        BaseStageSourceHoldersTransformer.call = () => {};
        BaseStageSourceHoldersTransformer.prototype.isPreviousSourceHolderSet = () => false;
        BaseStageSourceHoldersTransformer.prototype.isNextSourceHolderSet = () => false;
        BaseStageSourceHoldersTransformer.prototype.stageSourcesIndexes = {
            previous: 0,
            current: 1,
            next: 2
        };
        fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex = jest.fn((index) => {
            transformCalls[index] = {
                negative: jest.fn(),
                zero: jest.fn(),
                positive: jest.fn()
            };
            byValueCalls[index] = jest.fn(() => transformCalls[index]);
            return {
                byValue: byValueCalls[index]
            };
        });
    });

    describe('transforming current stage source holders', () => {
        beforeEach(() => {
            recreateStageSourceHoldersByValueTransformerAndCAllTransformByValueWithValue(100);
        });

        it('should call transformStageSourceHoldersAtIndex with current index', () => {
            expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).toBeCalledWith(1);
        });

        it('should call byValue with 100', () => {
            expect(byValueCalls[1]).toBeCalledWith(100);
        });

        it('should call zero', () => {
            expect(transformCalls[1].zero).toBeCalled();
        });
    });


    describe('transforming previous source holder', () => {
        describe('source holder is not set (transformSourceHolderAtIndex should not be called)', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isPreviousSourceHolderSet = () => false;
                recreateStageSourceHoldersByValueTransformerAndCAllTransformByValueWithValue();
            });

            it('should not call transformSourceHolderAtIndex with previous index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).not.toBeCalledWith(0);
            });
        });

        describe('source holder is set', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isPreviousSourceHolderSet = () => true;
                recreateStageSourceHoldersByValueTransformerAndCAllTransformByValueWithValue(200);
            });

            it('should call transformStageSourceHoldersAtIndex with previous index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).toBeCalledWith(0);
            });

            it('should call byValue with 200', () => {
                expect(byValueCalls[0]).toBeCalledWith(200);
            });

            it('should call negative', () => {
                expect(transformCalls[0].negative).toBeCalled();
            });
        });
    });

    describe('transforming next source holder', () => {
        describe('source holder is not set (transformSourceHolderAtIndex should not be called)', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isNextSourceHolderSet = () => false;
                recreateStageSourceHoldersByValueTransformerAndCAllTransformByValueWithValue();
            });

            it('should not call transformSourceHolderAtIndex with next index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).not.toBeCalledWith(2);
            });
        });

        describe('source holder is set', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isNextSourceHolderSet = () => true;
                recreateStageSourceHoldersByValueTransformerAndCAllTransformByValueWithValue(300);
            });

            it('should call transformStageSourceHoldersAtIndex with next index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).toBeCalledWith(2);
            });

            it('should call byValue with 200', () => {
                expect(byValueCalls[2]).toBeCalledWith(300);
            });

            it('should call positive', () => {
                expect(transformCalls[2].positive).toBeCalled();
            });
        });
    });
});