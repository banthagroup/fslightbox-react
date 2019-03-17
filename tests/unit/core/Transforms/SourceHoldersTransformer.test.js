import { SourceHoldersTransformer } from "../../../../src/core/Transforms/SourceHoldersTransformer";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

describe('SourceHoldersTransformer', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.getInstance();
    const sourceHoldersTransformer = fsLightboxInstance.core.sourceHoldersTransformer;
    global.window.innerWidth = 1000;
    global.window.innerHeight = 1000;

    it('should transform source to negative value', () => {
        sourceHoldersTransformer.transformNegative(0);
        expect(fsLightboxInstance.elements.sourceHolders[0].current.style.transform).toEqual('translate(-1300px,0)');
    });

    it('should transform source to 0 value', () => {
        sourceHoldersTransformer.transformZero(0);
        expect(fsLightboxInstance.elements.sourceHolders[0].current.style.transform).toEqual('translate(0,0)');
    });

    it('should transform source to positive value', () => {
        sourceHoldersTransformer.transformPositive(0);
        expect(fsLightboxInstance.elements.sourceHolders[0].current.style.transform).toEqual('translate(1300px,0)');
    });


    describe('transformStageSources', () => {
        beforeEach(() => {
            fsLightboxInstance.core.sourceHoldersTransformer.transformNegative = jest.fn();
            fsLightboxInstance.core.sourceHoldersTransformer.transformZero = jest.fn();
            fsLightboxInstance.core.sourceHoldersTransformer.transformPositive = jest.fn();
        });

        it('should call all transforms', () => {
            fsLightboxInstance.state.slide = 1;
            fsLightboxInstance.data.totalSlides = 3;
            fsLightboxInstance.core.sourceHoldersTransformer.transformStageSources().withoutTimeout();
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformNegative).toBeCalledWith(2);
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformZero).toBeCalledWith(0);
        });

        it('should call only zero and positive transform', () => {
            fsLightboxInstance.state.slide = 2;
            fsLightboxInstance.data.totalSlides = 2;
            fsLightboxInstance.core.sourceHoldersTransformer.transformStageSources().withoutTimeout();
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformNegative).not.toBeCalled();
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformZero).toBeCalledWith(1);
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformPositive).toBeCalledWith(0);
        });

        it('should call only zero transform', () => {
            fsLightboxInstance.state.slide = 1;
            fsLightboxInstance.data.totalSlides = 1;
            fsLightboxInstance.core.sourceHoldersTransformer.transformStageSources().withoutTimeout();
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformNegative).not.toBeCalled();
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformZero).toBeCalledWith(0);
            expect(fsLightboxInstance.core.sourceHoldersTransformer.transformPositive).not.toBeCalled();
        });
    });
});