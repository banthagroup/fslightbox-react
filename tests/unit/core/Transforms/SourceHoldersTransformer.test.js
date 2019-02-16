import { SourceHoldersTransformer } from "../../../../src/core/Transforms/SourceHoldersTransformer";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

describe('SourceHoldersTransformer', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.getInstance();
    const sourceHoldersTransformer = fsLightboxInstance.sourceHoldersTransformer;
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
            fsLightboxInstance.sourceHoldersTransformer.transformNegative = jest.fn();
            fsLightboxInstance.sourceHoldersTransformer.transformZero = jest.fn();
            fsLightboxInstance.sourceHoldersTransformer.transformPositive = jest.fn();
        });

        it('should call all transforms', () => {
            fsLightboxInstance.slide = 1;
            fsLightboxInstance.totalSlides = 3;
            fsLightboxInstance.sourceHoldersTransformer.transformStageSources().withoutTimeout();
            expect(fsLightboxInstance.sourceHoldersTransformer.transformNegative).toBeCalledWith(2);
            expect(fsLightboxInstance.sourceHoldersTransformer.transformZero).toBeCalledWith(0);
        });

        it('should call only zero and positive transform', () => {
            fsLightboxInstance.slide = 2;
            fsLightboxInstance.totalSlides = 2;
            fsLightboxInstance.sourceHoldersTransformer.transformStageSources().withoutTimeout();
            expect(fsLightboxInstance.sourceHoldersTransformer.transformNegative).not.toBeCalled();
            expect(fsLightboxInstance.sourceHoldersTransformer.transformZero).toBeCalledWith(1);
            expect(fsLightboxInstance.sourceHoldersTransformer.transformPositive).toBeCalledWith(0);
        });

        it('should call only zero transform', () => {
            fsLightboxInstance.slide = 1;
            fsLightboxInstance.totalSlides = 1;
            fsLightboxInstance.sourceHoldersTransformer.transformStageSources().withoutTimeout();
            expect(fsLightboxInstance.sourceHoldersTransformer.transformNegative).not.toBeCalled();
            expect(fsLightboxInstance.sourceHoldersTransformer.transformZero).toBeCalledWith(0);
            expect(fsLightboxInstance.sourceHoldersTransformer.transformPositive).not.toBeCalled();
        });
    });
});