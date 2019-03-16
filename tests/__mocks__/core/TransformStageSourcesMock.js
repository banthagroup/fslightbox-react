export class TransformStageSourcesMock {
    /**
     * @param _ { FsLightbox }
     * @return {{withoutTimeout: jest.Mock<{}> | jest.Mock<any> | any, withTimeout: jest.Mock<{}> | jest.Mock<any> | any}|*}
     */
    constructor(_) {
        this.mockObject = {
            withoutTimeout: jest.fn(),
            withTimeout: jest.fn()
        };
        _.core.sourceHoldersTransformer.transformStageSources = () => {
            return this.mockObject;
        };

        return this.mockObject;
    }
}