import { BaseStageSourceHoldersTransformer } from "../../../../src/core/transforms/stage-source-holders-transformers/BaseStageSourceHoldersTransformer";
import { StageSourceHoldersTransformer } from "../../../../src/core/transforms/stage-source-holders-transformers/StageSourceHoldersTransformer";
import { FADE_IN_ANIMATION_TIME } from "../../../../src/constants/cssConstants";


const fsLightbox = {
    core: {
        sourceHoldersTransformer: {
            transformSourceHolderAtIndex: () => ({
                negative: () => {},
                zero: () => {},
                positive: () => {}
            }),
            isStageSourceHolderAtIndexValidForTransform: () => {}
        },
        stage: {
            getAllStageIndexes: () => ({})
        }
    }
};


/** @var { StageSourceHoldersTransformer }  */
let stageSourceHoldersTransformer = new StageSourceHoldersTransformer(fsLightbox);

const recreateStageSourceHoldersTransformerAndCallWithoutTimeout = () => {
    stageSourceHoldersTransformer = new StageSourceHoldersTransformer(fsLightbox);
    stageSourceHoldersTransformer.withoutTimeout();
};

const recreateStageSourceHoldersTransformerAndCallWithTimeout = () => {
    stageSourceHoldersTransformer = new StageSourceHoldersTransformer(fsLightbox);
    stageSourceHoldersTransformer.withTimeout();
    jest.runTimersToTime(FADE_IN_ANIMATION_TIME - 30)
};

describe('inheritance', () => {
    const rememberedCall = BaseStageSourceHoldersTransformer.call;

    beforeAll(() => {
        BaseStageSourceHoldersTransformer.call = jest.fn();
        // mocking two methods because they are used in StageSourceHoldersByValueTransformer
        // so it would throw errors without them
        BaseStageSourceHoldersTransformer.prototype.isPreviousSourceHolderSet = () => {};
        BaseStageSourceHoldersTransformer.prototype.isNextSourceHolderSet = () => {};
        // mocking stageSourcesIndexes object because it used in constructor
        BaseStageSourceHoldersTransformer.prototype.stageSourcesIndexes = {};
        stageSourceHoldersTransformer = new StageSourceHoldersTransformer(fsLightbox);
    });

    it('should call BaseStageSourceHolders call with instance and fsLightbox', () => {
        expect(BaseStageSourceHoldersTransformer.call)
            .toBeCalledWith(stageSourceHoldersTransformer, fsLightbox);
    });

    afterAll(() => {
        BaseStageSourceHoldersTransformer.call = rememberedCall;
    });
});

describe('transforming current stage source holder', () => {
    let zero;

    beforeAll(() => {
        zero = jest.fn();
        BaseStageSourceHoldersTransformer.call = () => {};
        BaseStageSourceHoldersTransformer.prototype.stageSourcesIndexes = {
            current: 0
        };
        fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex = jest.fn(() => ({
            zero: zero
        }));
        stageSourceHoldersTransformer = new StageSourceHoldersTransformer(fsLightbox);
    });

    it('should call transformSourceHolderAtIndex with current index', () => {
        expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).toBeCalledWith(0);
    });
});

describe('withoutTimeout', () => {
    let transformCalls = [];

    beforeEach(() => {
        transformCalls = [];
        BaseStageSourceHoldersTransformer.call = () => {};
        BaseStageSourceHoldersTransformer.prototype.stageSourcesIndexes = {
            previous: 0,
            current: 1,
            next: 2
        };
        BaseStageSourceHoldersTransformer.prototype.isPreviousSourceHolderSet = () => {};
        BaseStageSourceHoldersTransformer.prototype.isNextSourceHolderSet = () => {};
        fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex = jest.fn((index) => {
            transformCalls[index] = {
                negative: jest.fn(),
                zero: () => {},
                positive: jest.fn()
            };
            return transformCalls[index];
        });
    });

    describe('negative transforming', () => {
        describe('previous source holders is not set', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isPreviousSourceHolderSet = () => false;
                recreateStageSourceHoldersTransformerAndCallWithoutTimeout();
            });

            it('should not call transformSourceHolderAtIndex with previous index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).not.toBeCalledWith(0);
            });
        });

        describe('previous source holder is set', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isPreviousSourceHolderSet = () => true;
                recreateStageSourceHoldersTransformerAndCallWithoutTimeout();
            });

            it('should call transformStageSourceHoldersAtIndex with previous index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).toBeCalledWith(0);
            });

            it('should call transform negative', () => {
                expect(transformCalls[0].negative).toBeCalled();
            });
        });
    });

    describe('positive transforming', () => {
        describe('previous source holders is not set', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isNextSourceHolderSet = () => false;
                recreateStageSourceHoldersTransformerAndCallWithoutTimeout();
            });

            it('should not call transformSourceHolderAtIndex with next index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).not.toBeCalledWith(2);
            });
        });

        describe('next source holder is set', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isNextSourceHolderSet = () => true;
                recreateStageSourceHoldersTransformerAndCallWithoutTimeout();
            });

            it('should call transformStageSourceHoldersAtIndex with next index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).toBeCalledWith(2);
            });

            it('should call transform positive', () => {
                expect(transformCalls[2].positive).toBeCalled();
            });
        });
    });
});

describe('with timeout', () => {
    let transformCalls = [];

    beforeEach(() => {
        jest.useFakeTimers();
        transformCalls = [];
        BaseStageSourceHoldersTransformer.call = () => {};
        BaseStageSourceHoldersTransformer.prototype.stageSourcesIndexes = {
            previous: 0,
            current: 1,
            next: 2
        };
        BaseStageSourceHoldersTransformer.prototype.isPreviousSourceHolderSet = () => {};
        BaseStageSourceHoldersTransformer.prototype.isNextSourceHolderSet = () => {};
        fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex = jest.fn((index) => {
            transformCalls[index] = {
                positive: jest.fn(),
                zero: () => {},
                negative: jest.fn()
            };
            return transformCalls[index];
        });
    });

    describe('negative transforming', () => {
        describe('previous source holders is not set', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isPreviousSourceHolderSet = () => false;
                recreateStageSourceHoldersTransformerAndCallWithoutTimeout();
            });

            it('should not call transformSourceHolderAtIndex with previous index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).not.toBeCalledWith(0);
            });
        });

        describe('previous source holder is set', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isPreviousSourceHolderSet = () => true;
                recreateStageSourceHoldersTransformerAndCallWithoutTimeout();
            });

            it('should call transformStageSourceHoldersAtIndex with previous index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).toBeCalledWith(0);
            });

            it('should call transform negative', () => {
                expect(transformCalls[0].negative).toBeCalled();
            });
        });
    });

    describe('positive transforming', () => {
        describe('previous source holders is not set', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isNextSourceHolderSet = () => false;
                recreateStageSourceHoldersTransformerAndCallWithoutTimeout();
            });

            it('should not call transformSourceHolderAtIndex with next index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).not.toBeCalledWith(2);
            });
        });

        describe('next source holder is set', () => {
            beforeEach(() => {
                BaseStageSourceHoldersTransformer.prototype.isNextSourceHolderSet = () => true;
                recreateStageSourceHoldersTransformerAndCallWithoutTimeout();
            });

            it('should call transformStageSourceHoldersAtIndex with next index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).toBeCalledWith(2);
            });

            it('should call transform positive', () => {
                expect(transformCalls[2].positive).toBeCalled();
            });
        });
    });
});