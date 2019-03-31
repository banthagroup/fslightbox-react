import { SourceHoldersTransformer } from "../../../../src/core/Transforms/SourceHoldersTransformer";
import { FsLightboxEnzymeMock } from "../../../__mocks__/components/fsLightboxEnzymeMock";
import { StageSourceHoldersTransformer } from "../../../../src/core/Transforms/StageSourceHoldersTransformers/StageSourceHoldersTransformer";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { StageSourceHoldersByValueTransformer } from "../../../../src/core/Transforms/StageSourceHoldersTransformers/StageSourceHoldersByValueTransformer";
const sinon = require('sinon');

describe('SourceHoldersTransformer', () => {
    const mock = new FsLightboxEnzymeMock();
    const fsLightboxInstance = mock.getInstance();
    const sourceHoldersTransformer = fsLightboxInstance.core.sourceHoldersTransformer;
    global.window.innerWidth = 1000;
    global.window.innerHeight = 1000;

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


describe('transformStageSources', () => {
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


describe('transformStageSourceHoldersByValue', () => {
    const transformByValueMock = jest.fn();
    const fsLightboxMock = new FsLightboxMock();
    const fsLightbox = fsLightboxMock.getFsLightbox();

    it('should ', () => {

    });
});