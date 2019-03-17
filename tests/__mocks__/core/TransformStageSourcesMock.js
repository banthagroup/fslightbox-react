/**
 * @class
 * @param fsLightboxInstance { FsLightbox }
 * @return {{withoutTimeout: jest.Mock<{}> | jest.Mock<any> | any, withTimeout: jest.Mock<{}> | jest.Mock<any> | any}|*}
 */
export function TransformStageSourcesMock(fsLightboxInstance) {
    this.mockObject = {
        withoutTimeout: jest.fn(),
        withTimeout: jest.fn()
    };
    fsLightboxInstance.core.sourceHoldersTransformer.transformStageSources = () => {
        return this.mockObject;
    };

    return this.mockObject;
}