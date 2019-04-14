import React from 'react';
import { IMAGE_TYPE, VIDEO_TYPE } from "../../../../../src/Constants/CoreConstants";
import { SourcesFactory } from "../../../../../src/Core/Sources/Creating/SourcesFactory";
import Image from "../../../../../src/Components/Sources/ProperSources/Image";
import { SourceComponentGetter } from "../../../../../src/Core/Sources/Creating/SourceComponentGetter";
import { TEST_IMAGE_URL, TEST_VIDEO_URL } from "../../../../schemas/testVariables";
import { SourceTypeGetter } from "../../../../../src/Core/Sources/Creating/SourceTypeGetter";

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
        urls: [TEST_IMAGE_URL, TEST_VIDEO_URL],
        totalSlides: 2
    },
    componentsStates: {
        sourcesComponents: {}
    },
    elements: {
        createdButNotRenderedSourcesComponents: []
    },
    injector: {
        source: {
            getSourceTypeGetter: () => sourceTypeGetter,
            getSourceComponentGetter: () => sourceComponentGetter
        }
    }
};
let sourcesFactory;
let index;

const mockSourceFactoryComponentsCreateNewSourceFactoryAndCallAddToProperArrays = () => {
    index = 0;
    sourceTypeGetter.setUrlToCheck = jest.fn();
    // we will be testing image components
    sourceTypeGetter.getSourceType = jest.fn(() => new Promise((resolve => {
        (index === 0) ?
            resolve(IMAGE_TYPE) :
            resolve(VIDEO_TYPE);
        index++;
    })));
    sourceComponentGetter.setSourceIndex = jest.fn();
    sourceComponentGetter.setSourceType = jest.fn();
    sourceComponentGetter.getSourceComponent = jest.fn(() => {
        const SourceComponent = <Image fsLightbox={ fsLightbox } index={ index }/>;
        index++;
        return SourceComponent;
    });
    sourcesFactory = new SourcesFactory(fsLightbox);
    sourcesFactory.createSourcesAndAddThemToProperArrays();
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

describe('adding source components to proper arrays', () => {
    let sourcesComponentsState;
    // we can't use use real fsLightbox because we are testing equality and real lightbox is changing at runtime
    // so it would throw unwanted errors
    let fsLightboxForProps = {};
    let imageComponent = <Image fsLightbox={ fsLightboxForProps } index={ 0 }/>;

    beforeAll(() => {
        // we set getSourceType to be instantly resolved (we are not testing it)
        sourceTypeGetter.getSourceType = () => new Promise(resolve => resolve('random source type'));
        // we set getSourceComponent to receive constant component
        // (we are not testing if it creates proper component - we are just testing adding it to proper arrays)
        sourceComponentGetter.getSourceComponent = () => imageComponent;
    });

    describe('SourceComponents state is not set', () => {
        beforeEach(() => {
            sourcesComponentsState = {};
            fsLightbox.componentsStates.sourcesComponents = sourcesComponentsState;
            sourcesFactory = new SourcesFactory(fsLightbox);
            sourcesFactory.createSourcesAndAddThemToProperArrays();
        });

        it(`should add two Image components to createdButNotRenderedSourcesComponents array 
            in fsLightbox object`, () => {
            expect(fsLightbox.elements.createdButNotRenderedSourcesComponents)
                .toEqual([imageComponent, imageComponent]);
        });
    });

    describe('SourceComponents state is set', () => {
        let sourceComponents = [];

        beforeEach(() => {
            sourcesComponentsState = {
                get: () => sourceComponents,
                set: (array) => {
                    sourceComponents = array
                }
            };
            fsLightbox.componentsStates.sourcesComponents = sourcesComponentsState;
            sourcesFactory = new SourcesFactory(fsLightbox);
            sourcesFactory.createSourcesAndAddThemToProperArrays();
        });

        it(`should add two Image components to createdButNotRenderedSourcesComponents array 
            in fsLightbox object`, () => {
            expect(sourceComponents).toEqual([
                imageComponent, imageComponent
            ]);
        });
    });
});
