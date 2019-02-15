import { SourceComponentsCreator } from "../../../../src/core/Source/SourceComponentsCreator";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { SourceTransformer } from "../../../../src/core/Transforms/SourceTransformer";
import { SourceSizeAdjuster } from "../../../../src/core/Source/SourceSizeAdjuster";
import { testSourceDimensions } from "../../../schemas/testVariables";

describe('SourceComponentsCreator', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.getInstance();
    const sourceComponentsCreator = new SourceComponentsCreator(fsLightboxInstance);
    sourceComponentsCreator.setIndex(0);

    it('should create SourceTransformer', () => {
        sourceComponentsCreator.createSourceTransformer();
        expect(fsLightboxInstance.sourceTransformers[0]).toBeInstanceOf(SourceTransformer);
    });

    it('should create SourceSizeAdjuster', () => {
        fsLightboxInstance.sourceDimensions[0] = testSourceDimensions;
        sourceComponentsCreator.createSourceSizeAdjuster();
        expect(fsLightboxInstance.sourceSizeAdjusters[0]).toBeInstanceOf(SourceSizeAdjuster);
    });
});