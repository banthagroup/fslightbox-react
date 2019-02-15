import { SourceTransformer } from "../../../../src/core/Transforms/SourceTransformer";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { ImageMock } from "../../../__mocks__/components/imageMock";

describe('SourceTransformer', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.getInstance();
    const sourceTransfomer = new SourceTransformer(fsLightboxInstance);
    sourceTransfomer.setIndex(0);
    const imageMock = new ImageMock(fsLightboxInstance);
    imageMock.createImageMock();
    global.window.innerWidth = 1000;
    global.window.innerHeight = 1000;

    it('should set index', () => {
        sourceTransfomer.setIndex(0);
        expect(sourceTransfomer.i).toEqual(0);
    });

    it('should transform source to negative value', () => {
        sourceTransfomer.transformNegative();
        expect(fsLightboxInstance.elements.sources[0].current.style.transform).toEqual('translate(-1300px,0)');
    });

    it('should transform source to 0 value', () => {
        sourceTransfomer.transformZero();
        expect(fsLightboxInstance.elements.sources[0].current.style.transform).toEqual('translate(0,0)');
    });

    it('should transform source to positive value', () => {
        sourceTransfomer.transformPositive();
        expect(fsLightboxInstance.elements.sources[0].current.style.transform).toEqual('translate(1300px,0)');
    });


    describe('Calling correct transform depending on index and slide', () => {

    });
});