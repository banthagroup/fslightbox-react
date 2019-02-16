import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { SlideChanger } from "../../../../src/core/Slide/SlideChanger";

const mock = new FsLightboxMock();
const fsLightboxInstance = mock.getInstance();
const slideChanger = new SlideChanger(fsLightboxInstance);
fsLightboxInstance.sourceHoldersTransformer.transformStageSources = jest.fn();
fsLightboxInstance.slide = 1;
slideChanger.changeSlide(2);

it('should change slide', () => {
    expect(fsLightboxInstance.slide).toEqual(2);
});

it('should call transformStageSources', () => {
    expect(fsLightboxInstance.sourceHoldersTransformer.transformStageSources)
        .toBeCalled();
});
