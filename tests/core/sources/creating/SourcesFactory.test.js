import { IMAGE_TYPE, VIDEO_TYPE } from "../../../../src/constants/coreConstants";
import { SourcesFactory } from "../../../../src/core/sources/creating/SourcesFactory";
import { SourceComponentGetter } from "../../../../src/core/sources/creating/SourceComponentGetter";
import { TEST_IMAGE_URL, TEST_VIDEO_URL } from "../../../__tests-helpers__/testVariables";
import { SourceTypeGetter } from "../../../../src/core/sources/creating/SourceTypeGetter";

let sourceTypeGetter = {
    setUrlToCheck: () => {},
    getSourceType: () => {}
};
let sourceComponentGetter = {
    setSourceIndex: () => {},
    setSourceType: () => {},
    getSourceComponent: () => {},
};
let fsLightbox = {
    data: {
        // testing two urls in all file
        urls: [TEST_IMAGE_URL, TEST_VIDEO_URL],
    },
    getters: {
        getIsOpen: () => true
    },
    componentsStates: {
        shouldSourceHolderBeUpdatedCollection: [
            {
                set: () => {},
            },
            {
                set: () => {},
            }
        ],
    },
    elements: {
        sourcesComponents: []
    },
    injector: {
        source: {
            getSourceTypeGetter: () => sourceTypeGetter,
            getSourceComponentGetter: () => sourceComponentGetter
        }
    },
};
/** @var { SourcesFactory } sourcesFactory */
let sourcesFactory;
let index = 0;

const recreateSourcesFactoryAndCallCreateSourcesAndAddThemToProperArrays = () => {
    sourcesFactory = new SourcesFactory(fsLightbox);
    sourcesFactory.createSourcesAndAddThemToSourcesComponentsArray();
};

const mockSourceFactoryComponentsCreateNewSourceFactoryAndCallAddToProperArrays = () => {
    index = 0;
    sourceTypeGetter.setUrlToCheck = jest.fn();
    // we are not testing getting source type so we will set it to be immediately calling callback
    // with e.g. image type as param
    sourceTypeGetter.getSourceType = jest.fn((callback) => {
        (index === 0) ?
            callback(IMAGE_TYPE) :
            callback(VIDEO_TYPE);
        index++;
    });
    sourceComponentGetter.setSourceIndex = jest.fn();
    sourceComponentGetter.setSourceType = jest.fn();
    sourceComponentGetter.getSourceComponent = jest.fn(() => {
        const SourceComponent = { key: index };
        index++;
        return SourceComponent;
    });
    sourcesFactory = new SourcesFactory(fsLightbox);
    sourcesFactory.createSourcesAndAddThemToSourcesComponentsArray();
};

describe('calling methods (we have set totalSlides to 2, so we will be testing methods to be called twice)', () => {
    beforeAll(() => {
        index = 0;
        mockSourceFactoryComponentsCreateNewSourceFactoryAndCallAddToProperArrays();
    });

    describe('SourceTypeGetter', () => {
        describe('setUrlToCheck', () => {
            it('should have called setUrlToCheck two times', () => {
                expect(sourceTypeGetter.setUrlToCheck).toBeCalledTimes(2);
            });

            it('should have called setUrlToCheck with TEST_IMAGE_URL', () => {
                expect(sourceTypeGetter.setUrlToCheck).toBeCalledWith(TEST_IMAGE_URL);
            });

            it(`should have called setUrlToCheck last time with TEST_VIDEO_URL
                (in SourceComponentGetter tests it will confirm 
                that SourceComponentGetter methods was called for proper source type)`, () => {
                expect(sourceTypeGetter.setUrlToCheck).toHaveBeenLastCalledWith(TEST_VIDEO_URL);
            });
        });

        describe('getSourceType', () => {
            it('should have called getSourceType twice', () => {
                expect(sourceTypeGetter.getSourceType).toBeCalledTimes(2);
            });
        });
    });


    describe('SourceComponentGetter', () => {
        describe('setSourceIndex (sources will be placed in array so we are checking array indexes)', () => {
            it('should have called setSourceIndex twice', () => {
                expect(sourceComponentGetter.setSourceIndex).toBeCalledTimes(2);
            });

            it('should have called setSourceIndex with 0', () => {
                expect(sourceComponentGetter.setSourceIndex).toBeCalledWith(0);
            });

            it(`should have called setSourceIndex last time with 1 
            (it confirms that that setSourceIndex was called for proper source type)`, () => {
                expect(sourceComponentGetter.setSourceIndex).toHaveBeenLastCalledWith(1);
            });
        });

        describe('setSourceType', () => {
            it('should have called setSourceType twice', () => {
                expect(sourceComponentGetter.setSourceType).toBeCalledTimes(2);
            });

            it('should have called setSourceType with IMAGE_TYPE', () => {
                expect(sourceComponentGetter.setSourceType).toBeCalledWith(IMAGE_TYPE);
            });

            it(`should have called setSourceType last time with VIDEO_TYPE
                (it confirms that setSourceType was called for proper source type)`, () => {
                expect(sourceComponentGetter.setSourceType).toHaveBeenLastCalledWith(VIDEO_TYPE);
            });
        });

        describe('getSourceComponent', () => {
            it('should have called getSourceComponent twice', () => {
                expect(sourceComponentGetter.getSourceComponent).toBeCalledTimes(2);
            });
        });
    });
});

describe('adding sources components to sourcesComponents array in fsLightbox object', () => {
    // we can't use use real fsLightbox because we are testing equality and real lightbox is changing at runtime
    // so it would throw unwanted errors
    let imageComponent = { key: 'testReactComponent' };

    beforeAll(() => {
        // we set getSourceType to be instantly resolved (we are not testing it)
        sourceTypeGetter.getSourceType = (callback) => callback();
        // we set getSourceComponent to receive constant component
        // (we are not testing if it creates proper component - we are just testing adding it to proper arrays)
        sourceComponentGetter.getSourceComponent = () => imageComponent;
        sourcesFactory = new SourcesFactory(fsLightbox);
        sourcesFactory.createSourcesAndAddThemToSourcesComponentsArray();
    });

    test('sourcesComponents should contain to Image components', () => {
        expect(fsLightbox.elements.sourcesComponents).toEqual([
            imageComponent, imageComponent
        ]);
    });
});

describe('updating source holder if lightbox is open', () => {
    let firstShouldSourceHolderBeUpdatedState;
    let secondShouldSourceHolderBeUpdatedState;

    beforeEach(() => {
        firstShouldSourceHolderBeUpdatedState = {
            set: jest.fn()
        };
        secondShouldSourceHolderBeUpdatedState = {
            set: jest.fn()
        };
        fsLightbox.componentsStates.shouldSourceHolderBeUpdatedCollection = [
            firstShouldSourceHolderBeUpdatedState,
            secondShouldSourceHolderBeUpdatedState
        ];
        // we set getSourceType to be instantly resolved (we are not testing it)
        sourceTypeGetter.getSourceType = (callback) => callback();
    });

    describe(`lightbox is closed - set methods on shouldSourceHolderBeUpdatedStateCollection 
            should not be called`, () => {
        beforeEach(() => {
            fsLightbox.getters.getIsOpen = () => false;
            recreateSourcesFactoryAndCallCreateSourcesAndAddThemToProperArrays();
        });

        it('should not call set methods', () => {
            expect(firstShouldSourceHolderBeUpdatedState.set).not.toBeCalled();
            expect(secondShouldSourceHolderBeUpdatedState.set).not.toBeCalled();
        });
    });

    describe(`lightbox is open - set method on  shouldSourceHolderBeUpdatedStateCollection
            should be called with true`, () => {
        beforeEach(() => {
            fsLightbox.getters.getIsOpen = () => true;
            recreateSourcesFactoryAndCallCreateSourcesAndAddThemToProperArrays();
        });

        it('should call method with true', () => {
            expect(firstShouldSourceHolderBeUpdatedState.set).toBeCalledWith(true);
            expect(secondShouldSourceHolderBeUpdatedState.set).toBeCalledWith(true);
        });
    });
});


