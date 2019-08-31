import { setUpWindowResizeActions } from "./setUpWindowResizeActions";

const fsLightbox = {
    collections: {
        sourcesOutersTransformers: [],
        sourcesStylers: []
    },
    core: {
        windowResizeActions: {}
    },
    data: {
        maxSourceWidth: undefined,
        maxSourceHeight: undefined,
        sourcesCount: undefined
    },
    stageIndexes: {
        current: undefined,
    }
};

const sourcesHoldersTransformersCollection = fsLightbox.collections.sourcesOutersTransformers;
const sourcesSizesAdjustersCollection = fsLightbox.collections.sourcesStylers;

const windowResizeActions = fsLightbox.core.windowResizeActions;
setUpWindowResizeActions(fsLightbox);


describe('setting up max source dimensions to data object', () => {
    describe('window.innerWidth < 1000', () => {
        beforeAll(() => {
            window.innerWidth = 900;
            window.innerHeight = 1500;
            windowResizeActions.runActions();
        });

        it('should set correct dimensions', () => {
            expect(fsLightbox.data.maxSourceWidth).toBe(window.innerWidth);
            expect(fsLightbox.data.maxSourceHeight).toBe(0.9 * window.innerHeight);
        });
    });

    describe('window.innerWidth >= 1000', () => {
        beforeAll(() => {
            window.innerWidth = 1000;
            window.innerHeight = 500;
            windowResizeActions.runActions();
        });

        it('should set correct dimensions', () => {
            expect(fsLightbox.data.maxSourceWidth).toBe(0.9 * window.innerWidth);
            expect(fsLightbox.data.maxSourceHeight).toBe(0.9 * window.innerHeight);
        });
    });
});

describe('transforming stage source holders which are not in stage negatively', () => {
    beforeAll(() => {
        fsLightbox.data.sourcesCount = 4;
        fsLightbox.stageIndexes.current = 2;
        for (let i = 0; i < 4; i++) {
            sourcesHoldersTransformersCollection[i] = {
                negative: jest.fn()
            };
        }
        windowResizeActions.runActions();
    });

    it('should call sources transform negative for all source holders despite of current', () => {
        expect(sourcesHoldersTransformersCollection[0].negative).toBeCalled();
        expect(sourcesHoldersTransformersCollection[1].negative).toBeCalled();
        expect(sourcesHoldersTransformersCollection[2].negative).not.toBeCalled();
        expect(sourcesHoldersTransformersCollection[3].negative).toBeCalled();
    });
});

describe('adjusting sources sizes', () => {
    beforeAll(() => {
        fsLightbox.data.sourcesCount = 5;

        for (let i = 0; i < 5; i++) {
            sourcesSizesAdjustersCollection[i] = {
                adjustSourceSize: jest.fn()
            };
        }

        // lets make one of sourcesStylers undefined - this may happen due to sourcesStylers
        // are assigned in runtime
        sourcesSizesAdjustersCollection[1] = undefined;

        // mocking sourcesHoldersTransformersCollection due they are not checked to exist
        // they are not assigned in runtime
        for (let i = 0; i < 5; i++) {
            sourcesHoldersTransformersCollection[i] = {
                negative: () => {}
            }
        }

        setUpWindowResizeActions(fsLightbox);
        windowResizeActions.runActions();
    });

    it('should call adjustSourceSize at sourcesStylers', () => {
        expect(sourcesSizesAdjustersCollection[0].adjustSourceSize).toBeCalled();
        expect(sourcesSizesAdjustersCollection[2].adjustSourceSize).toBeCalled();
        expect(sourcesSizesAdjustersCollection[3].adjustSourceSize).toBeCalled();
        expect(sourcesSizesAdjustersCollection[4].adjustSourceSize).toBeCalled();
    });
});
