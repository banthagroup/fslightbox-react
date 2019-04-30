import { setUpSourceHoldersTransformer } from "../../../src/core/transforms/setUpSourceHoldersTransformer";
import * as getInitialStageSourceHoldersByValueTransformerObject
    from "../../../src/core/transforms/getInitialStageSourceHoldersByValueTransformer";

const sourceHoldersTransformer = {};
let stageSourceHoldersByValueTransformer = {
    transformByValue: () => {},
    stageSourcesIndexes: {}
};
let sourceHolderTransformer = {
    setSourceHolder: () => {}
};
let slide;
const fsLightbox = {
    componentsStates: {
        slide: {
            get: () => slide
        }
    },
    elements: {
        sourceHolders: [{ current: {} }, { current: {} }]
    },
    injector: {
        transforms: {
            getStageSourceHoldersByValueTransformer: () => stageSourceHoldersByValueTransformer,
            getSourceHolderTransformer: () => sourceHolderTransformer,
        }
    },
    core: {
        sourceHoldersTransformer: sourceHoldersTransformer
    }
};

setUpSourceHoldersTransformer(fsLightbox);

describe('transformStageSourceHoldersByValue', () => {
    let initialStageSourceHoldersByValueTransformer;

    // we are using destructuring in SourceHoldersTransformer so we need to recreate it every call to apply the changes
    const createNewSourceHoldersInstanceAndCallTransform = () => {
        setUpSourceHoldersTransformer(fsLightbox);
        sourceHoldersTransformer.transformStageSourceHoldersByValue(100);
    };

    beforeEach(() => {
        initialStageSourceHoldersByValueTransformer = { stageSourcesIndexes: {} };
        getInitialStageSourceHoldersByValueTransformerObject.getInitialStageSourceHoldersByValueTransformer
            = () => initialStageSourceHoldersByValueTransformer;
        fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer =
            jest.fn(() => stageSourceHoldersByValueTransformer);
        stageSourceHoldersByValueTransformer.transformByValue = jest.fn();
    });

    describe('creating new instance, on first call transformStageSourceHoldersByValue', () => {
        beforeEach(() => {
            createNewSourceHoldersInstanceAndCallTransform();
        });

        it('should create new StageSourceHoldersByValueTransformer instance', () => {
            expect(fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer.mock.calls).toHaveLength(1);
        });

        it('should call transform on instance with correct value', () => {
            expect(stageSourceHoldersByValueTransformer.transformByValue).toBeCalledWith(100);
        });
    });

    describe('using existing instance (stageSourcesIndexes.current === fsLightbox.state.slide - 1)', () => {
        beforeEach(() => {
            // to test if we are not creating an instance we need to mock initial creating of
            // StageSourceHoldersByValueTransformer and set current index on it's stageSourcesIndexes property to equals
            // array index of slide
            initialStageSourceHoldersByValueTransformer.stageSourcesIndexes.current = 0;
            initialStageSourceHoldersByValueTransformer.transformByValue = jest.fn();
            slide = 1;
            fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer = jest.fn();
            createNewSourceHoldersInstanceAndCallTransform();
        });

        it('should not create new StageSourceHoldersByValueTransformer instance', () => {
            expect(fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer).not.toBeCalled();
        });

        it('should call transform on instance with correct value', () => {
            expect(initialStageSourceHoldersByValueTransformer.transformByValue).toBeCalledWith(100);
        });
    });

    describe(`creating new instance after first call transform 
            (stageSourcesIndexes.current !== fslightbox.state.slide - 1)`, () => {
        beforeEach(() => {
            // to test if we are creating an instance we need to mock initial creating of
            // to not equals array index of slide
            // StageSourceHoldersByValueTransformer and set current index on it's stageSourcesIndexes property
            slide = 2;
            initialStageSourceHoldersByValueTransformer.stageSourcesIndexes.current = 0;
            // calling transform for first time
            createNewSourceHoldersInstanceAndCallTransform();
            // calling transform for second time
            sourceHoldersTransformer.transformStageSourceHoldersByValue(200);
        });

        it('should create new StageSourceHoldersByValueTransformer instance twice', () => {
            expect(fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer.mock.calls)
                .toHaveLength(2);
        });

        it('should call transform on instance with correct value twice with correct values', () => {
            expect(stageSourceHoldersByValueTransformer.transformByValue).toBeCalledWith(100);
            expect(stageSourceHoldersByValueTransformer.transformByValue).toBeCalledWith(200);
        });
    });
});


describe('transform single stage sources holder at index', () => {
    beforeAll(() => {
        sourceHolderTransformer.setSourceHolder = jest.fn();
        setUpSourceHoldersTransformer(fsLightbox);
    });

    it('should call set sources holder at correct index', () => {
        sourceHoldersTransformer.transformStageSourceHolderAtIndex(0);
        expect(sourceHolderTransformer.setSourceHolder).toBeCalledWith(fsLightbox.elements.sourceHolders[0]);
    });

    it('should return sources holder transformer', () => {
        expect(sourceHoldersTransformer.transformStageSourceHolderAtIndex(0)).toEqual(sourceHolderTransformer);
    });
});


describe('checking if stage sources holder is valid for transform', () => {
    beforeAll(() => {
        setUpSourceHoldersTransformer(fsLightbox);
    });

    describe('stage sources holder is not valid for transform', () => {
        it('should return false due to index is undefined', () => {
            expect(sourceHoldersTransformer.isStageSourceHolderAtIndexValidForTransform(undefined)).toBeFalsy();
        });

        it(`should false due to source holder at index is current source holder
        (current source holder is transformed on construct cause it always set)`, () => {
            slide = 1;
            expect(sourceHoldersTransformer.isStageSourceHolderAtIndexValidForTransform(0)).toBeFalsy();
        });
    });

    describe('stage sources holder is valid for transform', () => {
        it('should return true due to sources holder is defined and its not current', () => {
            slide = 2;
            expect(sourceHoldersTransformer.isStageSourceHolderAtIndexValidForTransform(0)).toBeTruthy();
        });
    });
});