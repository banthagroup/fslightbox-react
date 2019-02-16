import { SourceHoldersTransformer } from "../../../../src/core/Transforms/SourceHoldersTransformer";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

describe('SourceHoldersTransformer', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.getInstance();
    const sourceHoldersTransformer = new SourceHoldersTransformer(fsLightboxInstance);
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


    describe('init', () => {
        beforeEach(() => {
            sourceHoldersTransformer.transformNegative = jest.fn();
            sourceHoldersTransformer.transformZero = jest.fn();
            sourceHoldersTransformer.transformPositive = jest.fn();
        });

        it('should call all transforms', () => {
            fsLightboxInstance.slide = 1;
            fsLightboxInstance.totalSlides = 3;
            sourceHoldersTransformer.init();
            expect(sourceHoldersTransformer.transformNegative).toBeCalledWith(2);
            expect(sourceHoldersTransformer.transformZero).toBeCalledWith(0);
            expect(sourceHoldersTransformer.transformPositive).toBeCalledWith(1);
        });

        it('should call only zero and positive transform', () => {
            fsLightboxInstance.slide = 2;
            fsLightboxInstance.totalSlides = 2;
            sourceHoldersTransformer.init();
            expect(sourceHoldersTransformer.transformNegative).not.toBeCalled();
            expect(sourceHoldersTransformer.transformZero).toBeCalledWith(1);
            expect(sourceHoldersTransformer.transformPositive).toBeCalledWith(0);
        });

        it('should call only zero transform', () => {
            fsLightboxInstance.slide = 1;
            fsLightboxInstance.totalSlides = 1;
            sourceHoldersTransformer.init();
            expect(sourceHoldersTransformer.transformNegative).not.toBeCalled();
            expect(sourceHoldersTransformer.transformZero).toBeCalledWith(0);
            expect(sourceHoldersTransformer.transformPositive).not.toBeCalled();
        })
    });
});