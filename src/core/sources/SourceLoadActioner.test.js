import { SourceLoadActioner } from "./SourceLoadActioner";
import { SourceSizer } from "./SourceSizer";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../constants/classes-names";

const fsLightbox = {
    collections: { sourceSizers: [] },
    componentsServices: { isSourceLoadedCollection: [null, { set: jest.fn() }] },
    elements: {
        sources: [null, { current: { classList: { add: jest.fn() } } }],
        sourceAnimationWrappers: [null, { current: { classList: { add: jest.fn(), remove: jest.fn() } } }]
    },
    resolve: (constructorDependency, params) => {
        if (constructorDependency === SourceSizer) {
            expect(params).toEqual([1, 1000, 1500]);
            return sourceSizer;
        } else {
            throw new Error('Invalid dependency')
        }
    }
};
const sourceSizer = 'source-styler';
const sourceLoadActioner = new SourceLoadActioner(fsLightbox, 1, 1000, 1500);

test('runNormalLoadActions', () => {
    fsLightbox.collections.sourceSizers[1] = { adjustSize: jest.fn() };
    sourceLoadActioner.runNormalLoadActions();
    expect(fsLightbox.elements.sources[1].current.classList.add).toBeCalledWith(OPACITY_1_CLASS_NAME);
    expect(fsLightbox.elements.sourceAnimationWrappers[1].current.classList.add).toBeCalledWith(FADE_IN_STRONG_CLASS_NAME);
    expect(fsLightbox.componentsServices.isSourceLoadedCollection[1].set).toBeCalledWith(true);
    expect(fsLightbox.collections.sourceSizers[1].adjustSize).toBeCalled();
});

test('runInitialLoadActions', () => {
    sourceLoadActioner.runNormalLoadActions = jest.fn();
    sourceLoadActioner.runInitialLoadActions();
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalled();
    expect(fsLightbox.collections.sourceSizers[1]).toBe('source-styler');
});
