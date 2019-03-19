import { StageHoldersTransformer } from "../../../../src/core/Transforms/StageHoldersTransformer";
import { FsLightboxEnzymeMock } from "../../../__mocks__/components/fsLightboxEnzymeMock";


const mock = new FsLightboxEnzymeMock();
const fsLightboxInstance = mock.getInstance();
const stageHolderTransformer = new StageHoldersTransformer(fsLightboxInstance);

beforeEach(() => {
    stageHolderTransformer.transformNegative = jest.fn();
    stageHolderTransformer.transformPositive = jest.fn();
});


test('withoutTimeout should call transform positive and negative', () => {
    stageHolderTransformer.withoutTimeout();
    expect(stageHolderTransformer.transformNegative).toBeCalled();
    expect(stageHolderTransformer.transformPositive).toBeCalled();
});

test('withTimeout should call transform positive and negative after timeout', () => {
    jest.useFakeTimers();
    stageHolderTransformer.withTimeout();
    jest.runAllTimers();
    expect(stageHolderTransformer.transformNegative).toBeCalled();
    expect(stageHolderTransformer.transformPositive).toBeCalled();
});


describe('Transforms', () => {
    describe('correct call of transforms from SourceHoldersTransformer', () => {
        const mock = new FsLightboxEnzymeMock();
        const fsLightboxInstance = mock.getInstance();
        const stageHolderTransformer = new StageHoldersTransformer(fsLightboxInstance);

        stageHolderTransformer.stageSourcesIndexes = {
            previous: 2,
            next: 4,
        };
        fsLightboxInstance.core.sourceHoldersTransformer.transformNegative = jest.fn();
        fsLightboxInstance.core.sourceHoldersTransformer.transformPositive = jest.fn();
        fsLightboxInstance.slide = 123123123;
        stageHolderTransformer.transformNegative();
        stageHolderTransformer.transformPositive();

        it('should call transform negative from sourceHoldersTransformer with previous slide index', () => {
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformNegative).toBeCalledWith(2);
        });
        it('should call transform positive from sourceHoldersTransformer with next slide index', () => {
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformPositive).toBeCalledWith(4);
        });
    });


    describe('not calling transforms from SourceHoldersTransformer due to undefined indexes', () => {
        stageHolderTransformer.stageSourcesIndexes = {
            current: 0,
        };
        fsLightboxInstance.core.sourceHoldersTransformer.transformNegative = jest.fn();
        fsLightboxInstance.core.sourceHoldersTransformer.transformPositive = jest.fn();
        stageHolderTransformer.transformNegative();
        stageHolderTransformer.transformPositive();

        it('should not call transform negative due to undefined previous index', () => {
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformNegative).not.toBeCalled();
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformPositive).not.toBeCalled();
        });
    });


    // it can happen when user is changing slides too fast and gives setTimeouts no time to finish
    describe('not calling transforms, due slide index === transforming stage source', () => {
        stageHolderTransformer.stageSourcesIndexes = {
            previous: 1,
            current: 2,
            next: 3,
        };
        fsLightboxInstance.core.sourceHoldersTransformer.transformNegative = jest.fn();
        fsLightboxInstance.core.sourceHoldersTransformer.transformPositive = jest.fn();

        it('should not call transform negative from sourceHoldersTransformer', () => {
            fsLightboxInstance.slide = 2;
            stageHolderTransformer.transformNegative();
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformNegative).not.toBeCalled();
        });

        it('should not call transform negative from sourceHoldersTransformer', () => {
            fsLightboxInstance.slide = 4;
            stageHolderTransformer.transformPositive();
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformPositive).not.toBeCalled();
        });
    });
});