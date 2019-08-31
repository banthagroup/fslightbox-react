import { setUpWindowResizeActioner } from "./setUpWindowResizeActioner";

const fsLightbox = {
    collections: {
        sourcesOutersTransformers: [{ negative: jest.fn() }, { negative: jest.fn() }],
        sourcesStylers: [undefined, { styleSize: jest.fn() }]
    },
    core: { windowResizeActioner: {} },
    data: { sourcesCount: 2 },
    stageIndexes: { current: 0 }
};
innerWidth = 1199;
innerHeight = 1000;
const windowResizeActioner = fsLightbox.core.windowResizeActioner;
setUpWindowResizeActioner(fsLightbox);

test('runActions', () => {
    windowResizeActioner.runActions();
    expect(fsLightbox.data.maxSourceWidth).toBe(1199);
    expect(fsLightbox.data.maxSourceHeight).toBe(900);
    expect(fsLightbox.collections.sourcesOutersTransformers[0].negative).not.toBeCalled();
    expect(fsLightbox.collections.sourcesOutersTransformers[1].negative).toBeCalled();
    expect(fsLightbox.collections.sourcesStylers[1].styleSize).toBeCalled();

    innerWidth = 1200;
    windowResizeActioner.runActions();
    expect(fsLightbox.data.maxSourceWidth).toBe(1080);
    expect(fsLightbox.data.maxSourceHeight).toBe(900);
});
