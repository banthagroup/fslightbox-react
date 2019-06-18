/**
 * @param { FsLightbox } fsLightboxInstance
 * @return {{withoutTimeout: jest.Mock<{}> | jest.Mock<any> | any, withTimeout: jest.Mock<{}> | jest.Mock<any> | any}|*}
 * @class
 */
export function TransformStageSourcesMock(fsLightboxInstance) {
    this.mockObject = {
        withoutTimeout: jest.fn(),
        withTimeout: jest.fn()
    };

    fsLightboxInstance.core.sourcesHoldersTransformer.transform = () => {
        return this.mockObject;
    };

    return this.mockObject;
}
