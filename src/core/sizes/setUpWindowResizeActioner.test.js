import { setUpWindowResizeActioner } from "./setUpWindowResizeActioner";
import * as removeFromElementClassIfContainsObject from "../../helpers/elements/removeFromElementClassIfContains";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../constants/classes-names";

const fsLightbox = {
    collections: {
        sourceMainWrapperTransformers: [{ negative: jest.fn() }, { negative: jest.fn() }],
        sourceSizers: [undefined, { adjustSize: jest.fn() }]
    },
    core: { windowResizeActioner: {} },
    data: {
        maxSourceHeight: null,
        maxSourceWidth: null,
    },
    elements: {
        sourceMainWrappers: ['first-source-outer', 'second-source-outer'],
        sources: [{ current: null }, { current: document.createElement('div') }]
    },
    stageIndexes: { current: 0 }
};
innerWidth = 991;
innerHeight = 1000;
const windowResizeActioner = fsLightbox.core.windowResizeActioner;
setUpWindowResizeActioner(fsLightbox);
removeFromElementClassIfContainsObject.removeFromElementClassIfContains = jest.fn();

test('runActions', () => {
    windowResizeActioner.runActions();
    expect(fsLightbox.data.maxSourceWidth).toBe(991);
    expect(fsLightbox.data.maxSourceHeight).toBe(900);
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        'first-source-outer', TRANSFORM_TRANSITION_CLASS_NAME
    );
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        'second-source-outer', TRANSFORM_TRANSITION_CLASS_NAME
    );
    expect(fsLightbox.collections.sourceMainWrapperTransformers[0].negative).not.toBeCalled();
    expect(fsLightbox.collections.sourceMainWrapperTransformers[1].negative).toBeCalled();
    expect(fsLightbox.collections.sourceSizers[1].adjustSize).toBeCalled();

    innerWidth = 992;
    windowResizeActioner.runActions();
    expect(fsLightbox.data.maxSourceWidth).toBe(0.9 * 992);
    expect(fsLightbox.data.maxSourceHeight).toBe(900);
});
