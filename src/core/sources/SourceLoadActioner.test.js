import { SourceLoadActioner } from "./SourceLoadActioner";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../constants/classes-names";

const fsLightbox = {
    collections: {
        sourceSizers: []
    },
    componentsServices: {
        hideSourceLoaderCollection: [null, jest.fn()],
    },
    elements: {
        sourceAnimationWrappers: [null, { current: { classList: { add: jest.fn() } } }],
        sources: [null, { current: { classList: { add: jest.fn() } } }]
    },
    resolve: (constructor, params) => {
        expect(params).toEqual(expectedSourceSizerParameters);
        return sourceSizer;
    }
};
let expectedSourceSizerParameters = [1, 100, 200];
const sourceSizer = { adjustSize: jest.fn() };

const sourceLoadActioner = new SourceLoadActioner(fsLightbox, 1);

test('runActions', () => {
    sourceLoadActioner.runActions(100, 200);
    expect(fsLightbox.elements.sources[1].current.classList.add).toBeCalledWith(OPACITY_1_CLASS_NAME);
    expect(fsLightbox.elements.sourceAnimationWrappers[1].current.classList.add).toBeCalledWith(FADE_IN_STRONG_CLASS_NAME);
    expect(fsLightbox.componentsServices.hideSourceLoaderCollection[1]).toBeCalled();
    expect(fsLightbox.collections.sourceSizers[1]).toEqual(sourceSizer);
    expect(sourceSizer.adjustSize).toBeCalled();

    expectedSourceSizerParameters = [1, 300, 400];
    sourceLoadActioner.runActions(300, 400);
    expect(fsLightbox.elements.sources[1].current.classList.add).toBeCalledTimes(1);
    expect(fsLightbox.elements.sourceAnimationWrappers[1].current.classList.add).toBeCalledTimes(1);
    expect(fsLightbox.componentsServices.hideSourceLoaderCollection[1]).toBeCalledTimes(1);
    expect(sourceSizer.adjustSize).toBeCalledTimes(2);
});