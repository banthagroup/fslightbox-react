import { setUpSourceLoadActions } from "../../../src/core/sources/setUpSourceLoadActions";
import { SourceSizeAdjuster } from "../../../src/core/sizes/SourceSizeAdjuster";
import { SOURCES } from "../../../src/constants/elements";
import { LONG_FADE_IN_CLASS_NAME, OPACITY_0_CLASS_NAME } from "../../../src/constants/classes-names";

const fsLightbox = {
    collections: {
        sourcesSizesAdjusters: [],
        sourcesHoldersTransformers: []
    },
    core: {
        classListManager: {
            removeFromElementInArrayAtIndexClass: () => {},
            addToElementInArrayAtIndexClass: () => {}
        },
        sourceLoadActions: {}
    },
    injector: {
        injectDependency: (constructorDependency) => {
            if (constructorDependency === SourceSizeAdjuster) {
                return sourceSizeAdjuster;
            }
        }
    },
    stageIndexes: {
        previous: undefined,
        current: undefined,
        next: undefined
    }
};

const sourceLoadActions = fsLightbox.core.sourceLoadActions;

const classListManager = fsLightbox.core.classListManager;
const sourcesHoldersTransformersCollection = fsLightbox.collections.sourcesHoldersTransformers;
const sourcesSizesAdjustersCollection = fsLightbox.collections.sourcesSizesAdjusters;

const sourceSizeAdjuster = {
    setIndex: () => {},
    setDefaultDimensions: () => {},
    adjustSourceSize: () => {}
};

setUpSourceLoadActions(fsLightbox);

describe('runNormalLoadActions', () => {
    describe('removing opacity 0 class', () => {
        beforeAll(() => {
            // setting equal to checked stage index to prevent calling negative transform
            // which would throw error
            fsLightbox.stageIndexes.current = 3;

            classListManager.removeFromElementInArrayAtIndexClass = jest.fn();
            sourceLoadActions.setIndex(3);
            sourceLoadActions.runNormalLoadActions();
        });

        it('should call removeFromElementInArrayAtIndexClass with right params', () => {
            expect(classListManager.removeFromElementInArrayAtIndexClass).toBeCalledWith(
                SOURCES,
                3,
                OPACITY_0_CLASS_NAME
            );
        });
    });

    describe('transforming negative if source is not current', () => {
        beforeAll(() => {
            sourcesHoldersTransformersCollection[2] = {
                negative: jest.fn()
            };
            sourceLoadActions.setIndex(2);
        });

        describe('source is current', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 2;
                sourceLoadActions.runNormalLoadActions();
            });

            it('should not call transform negative', () => {
                expect(sourcesHoldersTransformersCollection[2].negative).not.toBeCalled();
            });
        });

        describe('sources is not current', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 3;
                sourceLoadActions.runNormalLoadActions();
            });

            it('should call transform negative', () => {
                expect(sourcesHoldersTransformersCollection[2].negative).toBeCalled();
            });
        });
    });
});

describe('runInitialLoadActions', () => {
    describe('calling runNormalLoadActions', () => {
        beforeAll(() => {
            sourceLoadActions.runNormalLoadActions = jest.fn();
            sourceLoadActions.runInitialLoadActions();
        });

        it('should call runNormalLoadActions', () => {
            expect(sourceLoadActions.runNormalLoadActions).toBeCalled();
        });
    });

    describe('setting up SourceSizeAdjuster and adjusting sources size', () => {
        beforeAll(() => {
            // mocking runInitialLoadActions to prevent calling negative transform
            // which would throw error
            sourceLoadActions.runNormalLoadActions = () => {};

            sourceSizeAdjuster.setIndex = jest.fn();
            sourceSizeAdjuster.setDefaultDimensions = jest.fn();
            sourceSizeAdjuster.adjustSourceSize = jest.fn();

            sourceLoadActions.setIndex(0);
            sourceLoadActions.setDefaultDimensions(250, 750);
            sourceLoadActions.runInitialLoadActions();
        });

        it('should call setIndex with right index', () => {
            expect(sourceSizeAdjuster.setIndex).toBeCalledWith(0);
        });

        it('should call setDefaultDimensions with right dimensions', () => {
            expect(sourceSizeAdjuster.setDefaultDimensions).toBeCalledWith(250, 750);
        });

        it('should adjust source size', () => {
            expect(sourceSizeAdjuster.adjustSourceSize).toBeCalled();
        });

        it('should add SourceSizeAdjuster to collection', () => {
            expect(sourcesSizesAdjustersCollection[0]).toEqual(sourceSizeAdjuster);
        });
    });

    describe('adding long fade in class if loaded source is current', () => {
        beforeAll(() => {
            // mocking runInitialLoadActions to prevent calling negative transform
            // which would throw error
            sourceLoadActions.runNormalLoadActions = () => {};

            sourceLoadActions.setIndex(4);
            classListManager.addToElementInArrayAtIndexClass = jest.fn();
        });

        describe('source is not current', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 3;
                sourceLoadActions.runInitialLoadActions();
            });

            it('should not call addToElementInArrayAtIndexClass', () => {
                expect(classListManager.addToElementInArrayAtIndexClass).not.toBeCalled();
            });
        });

        describe('source is current ', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 4;
                sourceLoadActions.runInitialLoadActions();
            });

            it('should call addToElementInArrayAtIndexClass with right params', () => {
                expect(classListManager.addToElementInArrayAtIndexClass).toBeCalledWith(
                    SOURCES,
                    4,
                    LONG_FADE_IN_CLASS_NAME
                );
            });
        });
    });
});
