import { SourceHoldersTransformer } from "../../../../src/core/Transforms/SourceHoldersTransformer";
import { FsLightboxEnzymeMock } from "../../../__mocks__/components/fsLightboxEnzymeMock";
import { StageSourceHoldersTransformer } from "../../../../src/core/Transforms/StageSourceHoldersTransformers/StageSourceHoldersTransformer";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

describe('SourceHoldersTransformer', () => {
    const mock = new FsLightboxEnzymeMock();
    const fsLightboxInstance = mock.getInstance();
    const sourceHoldersTransformer = fsLightboxInstance.core.sourceHoldersTransformer;
    window.innerWidth = 1000;
    window.innerHeight = 1000;

    it('should return StageSourceHoldersTransformer with correct props', () => {
        expect(sourceHoldersTransformer.transformStageSourceHolders()).toBeInstanceOf(StageSourceHoldersTransformer);
    });

    it('should transform source to negative value', () => {
        sourceHoldersTransformer.transformStageSourceHolderAtIndex(0).negative();
        expect(fsLightboxInstance.elements.sourceHolders[0].current.style.transform).toEqual('translate(-1300px,0)');
    });

    it('should transform source to 0 value', () => {
        sourceHoldersTransformer.transformStageSourceHolderAtIndex(0).zero();
        expect(fsLightboxInstance.elements.sourceHolders[0].current.style.transform).toEqual('translate(0px,0)');
    });

    it('should transform source to positive value', () => {
        sourceHoldersTransformer.transformStageSourceHolderAtIndex(0).positive();
        expect(fsLightboxInstance.elements.sourceHolders[0].current.style.transform).toEqual('translate(1300px,0)');
    });

});


describe('transformStageSourceHolders', () => {
    const fsLightboxMock = new FsLightboxMock();
    const fsLightbox = fsLightboxMock.getFsLightbox();
    const sourceHoldersTransformer = fsLightbox.core.sourceHoldersTransformer;
    let transformStageSourceHolderMock;

    beforeEach(() => {
        sourceHoldersTransformer.transformStageSourceHolderAtIndex = jest.fn(() => ({
            negative: jest.fn(),
            zero: jest.fn(),
            positive: jest.fn()
        }));
    });

    const callTransformStageSourceHoldersWithoutTransform = () => {
        sourceHoldersTransformer.transformStageSourceHolders().withoutTimeout();
        transformStageSourceHolderMock = sourceHoldersTransformer.transformStageSourceHolderAtIndex.mock;
    };

    describe('calling all transforms, due to there are more or', () => {
        beforeEach(() => {
            fsLightbox.state.slide = 1;
            fsLightbox.data.totalSlides = 3;
            callTransformStageSourceHoldersWithoutTransform();
        });

        it('should called transformStageSourceHolders 3 times', () => {
            expect(transformStageSourceHolderMock.calls.length).toEqual(3);
        });

        it('should have called transform negative at 2 index, because this is previous slide', () => {
            transformStageSourceHolderMock.calls.forEach((parameters, index) => {
                if (parameters[0] === 2) {
                    expect(transformStageSourceHolderMock.results[index].value.negative).toBeCalled();
                }
            });
        });

        it('should have called transform zero at 0 index. because this is current slide', () => {
            transformStageSourceHolderMock.calls.forEach((parameters, index) => {
                if (parameters[0] === 0) {
                    expect(transformStageSourceHolderMock.results[index].value.zero).toBeCalled();
                }
            });
        });

        it('should have called transform positive at 1 index. because this is next slide', () => {
            transformStageSourceHolderMock.calls.forEach((parameters, index) => {
                if (parameters[0] === 1) {
                    expect(transformStageSourceHolderMock.results[index].value.positive).toBeCalled();
                }
            });
        });
    });

    describe('calling only zero and positive transform, due to there are only 2 slides', () => {
        beforeEach(() => {
            fsLightbox.state.slide = 2;
            fsLightbox.data.totalSlides = 2;
            callTransformStageSourceHoldersWithoutTransform();
        });

        it('should called transformStageSourceHolders 2 times', () => {
            expect(transformStageSourceHolderMock.calls.length).toEqual(2);
        });

        it('should have called transform zero at 1 index. because this is current slide', () => {
            transformStageSourceHolderMock.calls.forEach((parameters, index) => {
                if (parameters[0] === 1) {
                    expect(transformStageSourceHolderMock.results[index].value.zero).toBeCalled();
                }
            });
        });

        it('should have called transform positive at 0 index. because this is next slide', () => {
            transformStageSourceHolderMock.calls.forEach((parameters, index) => {
                if (parameters[0] === 0) {
                    expect(transformStageSourceHolderMock.results[index].value.positive).toBeCalled();
                }
            });
        });
    });


    describe('calling only zero transform, due to there is only one slide', () => {
        beforeEach(() => {
            fsLightbox.state.slide = 1;
            fsLightbox.data.totalSlides = 1;
            callTransformStageSourceHoldersWithoutTransform();
        });

        it('should called transformStageSourceHolders 1 time', () => {
            expect(transformStageSourceHolderMock.calls.length).toEqual(1);
        });

        it('should should have called transform zero at 0 index, because this is current slide', () => {
            transformStageSourceHolderMock.calls.forEach((parameters, index) => {
                if (parameters[0] === 0) {
                    expect(transformStageSourceHolderMock.results[index].value.zero).toBeCalled();
                }
            });
        });
    });
});


const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
/** @var { SourceHoldersTransformer } */
let sourceHoldersTransformer;

describe('transformStageSourceHoldersByValue', () => {
    let transformByValueMock;

    // we are using destructuring in SourceHoldersTransformer so we need to recreate it every call to apply the changes
    const createNewSourceHoldersInstanceAndCallTransform = () => {
        sourceHoldersTransformer = new SourceHoldersTransformer(fsLightbox);
        sourceHoldersTransformer.transformStageSourceHoldersByValue(100);
    };

    beforeEach(() => {
        transformByValueMock = jest.fn();
    });

    describe('creating new instance, on first call transformStageSourceHoldersByValue', () => {
        beforeEach(() => {
            fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer = jest.fn(() => ({
                transformByValue: transformByValueMock
            }));
            createNewSourceHoldersInstanceAndCallTransform();
        });

        it('should create new StageSourceHoldersByValueTransformer instance', () => {
            expect(fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer.mock.calls.length)
                .toEqual(1);
        });

        it('should call transform on instance with correct value', () => {
            expect(transformByValueMock).toBeCalledWith(100);
        });
    });

    describe('using existing instance (stageSourcesIndexes.current === fsLightbox.state.slide - 1)', () => {
        beforeEach(() => {
            // to test if we are not creating an instance we need to mock initial creating of
            // StageSourceHoldersByValueTransformer and set current index on it's stageSourcesIndexes property to equals
            // array index of slide
            fsLightbox.injector.transforms.getInitialStageSourceHoldersByValueTransformer = jest.fn(() => ({
                stageSourcesIndexes: {
                    current: 0
                },
                transformByValue: transformByValueMock
            }));
            fsLightbox.state.slide = 1;
            fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer = jest.fn();
            createNewSourceHoldersInstanceAndCallTransform();
        });

        it('should not create new StageSourceHoldersByValueTransformer instance', () => {
            expect(fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer).not.toBeCalled();
        });

        it('should call transform on instance with correct value', () => {
            expect(transformByValueMock).toBeCalledWith(100);
        });
    });

    describe(`creating new instance after first call transform 
            (stageSourcesIndexes.current !== fslightbox.state.slide - 1)`, () => {
        beforeEach(() => {
            // calling transform for first time
            createNewSourceHoldersInstanceAndCallTransform();

            // to test if we are creating an instance we need to mock initial creating of
            // StageSourceHoldersByValueTransformer and set current index on it's stageSourcesIndexes property
            // to not equals array index of slide
            fsLightbox.injector.transforms.getInitialStageSourceHoldersByValueTransformer = jest.fn(() => ({
                stageSourcesIndexes: {
                    current: 0
                },
                transformByValue: transformByValueMock
            }));
            fsLightbox.state.slide = 2;
            fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer = jest.fn();
            createNewSourceHoldersInstanceAndCallTransform();
        });

        it('should create new StageSourceHoldersByValueTransformer instance', () => {
            expect(fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer).toBeCalled();
        });

        it('should call transform on instance with correct value', () => {
            expect(transformByValueMock).toBeCalledWith(100);
        });
    });
});


describe('transform single stage source holder at index', () => {
    let mockSourceHolderTransformer;

    beforeEach(() => {
        fsLightboxMock.setAllSourceHoldersToDivs();
        mockSourceHolderTransformer = {
            setSourceHolder: jest.fn()
        };
        fsLightbox.injector.transforms.getSourceHolderTransformer = () => mockSourceHolderTransformer;
        sourceHoldersTransformer = new SourceHoldersTransformer(fsLightbox);
    });

    it('should call set source holder at correct index', () => {
        sourceHoldersTransformer.transformStageSourceHolderAtIndex(0);
        expect(mockSourceHolderTransformer.setSourceHolder).toBeCalledWith(fsLightbox.elements.sourceHolders[0]);
    });

    it('should return source holder transformer', () => {
        expect(sourceHoldersTransformer.transformStageSourceHolderAtIndex(0)).toEqual(mockSourceHolderTransformer);
    });
});


describe('checking if stage source holder is valid for transform', () => {
    sourceHoldersTransformer = new SourceHoldersTransformer(fsLightbox);

    describe('stage source holder is not valid for transform', () => {
        it('should return false due to index is undefined', () => {
            expect(sourceHoldersTransformer.isStageSourceHolderAtIndexValidForTransform(undefined)).toBeFalsy();
        });

        it(`should false due to source holder at index is current source holder
        (current source holder is transformed on construct cause it always set)`, () => {
            fsLightbox.state.slide = 1;
            expect(sourceHoldersTransformer.isStageSourceHolderAtIndexValidForTransform(0)).toBeFalsy();
        });
    });

    describe('stage source holder is valid for transform', () => {
        it('should return true due to source holder is defined and its not current', () => {
            fsLightbox.state.slide = 2;
            expect(sourceHoldersTransformer.isStageSourceHolderAtIndexValidForTransform(0)).toBeTruthy();
        });
    });
});