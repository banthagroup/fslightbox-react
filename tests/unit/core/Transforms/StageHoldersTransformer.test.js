import { StageHoldersTransformer } from "../../../../src/core/Transforms/StageHoldersTransformer";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";


const mock = new FsLightboxMock();
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