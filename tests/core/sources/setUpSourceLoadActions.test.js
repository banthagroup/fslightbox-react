import { setUpSourceLoadActions } from "../../../src/core/sources/setUpSourceLoadActions";
import { SourceSizeAdjuster } from "../../../src/core/sizes/SourceSizeAdjuster";
import { SOURCES } from "../../../src/constants/elements";
import { LONG_FADE_IN_CLASS_NAME, OPACITY_0_CLASS_NAME } from "../../../src/constants/classes-names";

const fsLightbox = {
    collections: {
        sourcesSizesAdjusters: []
    },
    core: {
        classListManager: {
            manageArrayElementAtIndex: () => ({
                add: () => {},
                remove: () => {}
            }),
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
const sourcesSizesAdjusters = fsLightbox.collections.sourcesSizesAdjusters;

const sourceSizeAdjuster = {
    setIndex: () => {},
    setDefaultDimensions: () => {},
    adjustSourceSize: () => {}
};

setUpSourceLoadActions(fsLightbox);

describe('runNormalLoadActions', () => {
    let removeClass;

    beforeAll(() => {
        removeClass = jest.fn();
        classListManager.manageArrayElementAtIndex = (elementsArrayName, index) => {
            if (elementsArrayName === SOURCES && index === 3) {
                return {
                    remove: removeClass
                }
            }
        };

        sourceLoadActions.setIndex(3);
        sourceLoadActions.runNormalLoadActions();
    });

    it('should remove opacity 0 class', () => {
        expect(removeClass).toBeCalledWith(OPACITY_0_CLASS_NAME);
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

    describe('setting up SourceSizeAdjuster and adjusting source size', () => {
        beforeAll(() => {
            // mocking runNormalLoadActions to prevent throwing error
            // when trying to call undefined transform
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

        it('should call adjustSourceSize', () => {
            expect(sourceSizeAdjuster.adjustSourceSize).toBeCalled();
        });

        it('should add SourceSizeAdjuster to collection', () => {
            expect(sourcesSizesAdjusters[0]).toEqual(sourceSizeAdjuster);
        });
    });

    describe('adding long fade in class if loaded source is current', () => {
        let addClass;

        beforeAll(() => {
            addClass = jest.fn();
            classListManager.manageArrayElementAtIndex = (elementsArrayName, index) => {
                if (elementsArrayName === SOURCES && index === 4) {
                    return {
                        remove: () => {},
                        add: addClass
                    };
                }
            };

            setUpSourceLoadActions(fsLightbox);
            sourceLoadActions.setIndex(4);
        });

        describe('source is not current', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 3;
                sourceLoadActions.runInitialLoadActions();
            });

            it('should not call add', () => {
                expect(addClass).not.toBeCalled();
            });
        });

        describe('source is current', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 4;
                sourceLoadActions.runInitialLoadActions();
            });

            it('should call addToElementInArrayAtIndexClass with right params', () => {
                expect(addClass).toBeCalledWith(LONG_FADE_IN_CLASS_NAME);
            });
        });
    });
});
