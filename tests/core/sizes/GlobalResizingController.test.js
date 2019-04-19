import React from 'react';
import { GlobalResizingController } from "../../../src/core/sizes/GlobalResizingController";
import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../../src/constants/responsiveConstants";

const sourceSizeAdjusterIterator = {};
const sourcesWrapper = document.createElement('div');
const fsLightbox = {
    sourcesData: {
        maxSourceWidth: 0,
        maxSourceHeight: 0
    },
    elements: {
        sourcesHoldersWrapper: {
            current: sourcesWrapper
        }
    },
    core: {
        sourceHoldersTransformer: {
            transformStageSourceHolders: () => {}
        }
    },
    injector: {
        sizes: {
            getSourceSizeAdjusterIterator: () => sourceSizeAdjusterIterator
        }
    }
};

let globalResizingController;

describe('saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize', () => {
    beforeAll(() => {
        globalResizingController = new GlobalResizingController(fsLightbox);
    });

    describe('saveMaxSourcesDimensions', () => {
        describe('maxSourceWidth', () => {
            describe('window.innerWidth < SOURCE_DIMENSIONS_BREAK', () => {
                beforeAll(() => {
                    window.innerWidth = SOURCE_DIMENSIONS_BREAK - 50;
                    globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize();
                });

                it('should set maxSourceWidth to window.innerWidth, due to screen is small', () => {
                    expect(fsLightbox.sourcesData.maxSourceWidth).toEqual(window.innerWidth);
                });
            });

            describe('window.innerWidth > SOURCE_DIMENSIONS_BREAK', () => {
                beforeAll(() => {
                    window.innerWidth = SOURCE_DIMENSIONS_BREAK + 50;
                    globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize();
                });

                it(`should set maxSourceWidth to window.innerWidth decreased by responsive value, 
                    due to screen is wide`, () => {
                    expect(fsLightbox.sourcesData.maxSourceWidth)
                        .toEqual(window.innerWidth - (window.innerWidth * SOURCE_DIMENSIONS_DECREASE_VALUE));
                });
            });
        });

        describe('maxSourceHeight', () => {
            beforeAll(() => {
                window.innerHeight = 100;
                globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize();
            });

            it(`should set maxSourceHeight to window.innerHeight decreased by responsive value, 
                due to decreased height always look better`, () => {
                expect(fsLightbox.sourcesData.maxSourceHeight)
                    .toEqual(window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE));
            });
        });
    });


    describe('adjustSourcesWrapperSize', () => {
        beforeAll(() => {
            sourcesWrapper.style.height = '0px';
            sourcesWrapper.style.width = '0px';
            window.innerWidth = 500;
            window.innerHeight = 400;
            globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize();
        });

        it('should set sourcesHoldersWrapper width to maxSourceWidth value + px', () => {
            expect(sourcesWrapper.style.width).toBe(fsLightbox.sourcesData.maxSourceWidth + 'px');
        });

        it('should set sourcesHoldersWrapper width to maxSourceHeight value + px', () => {
            expect(sourcesWrapper.style.width).toBe(fsLightbox.sourcesData.maxSourceWidth + 'px');
        });
    });
});

describe('runAllResizingActions', () => {
    let sourceSizeAdjusterIterator;
    let withoutTimeout;

    beforeAll(() => {
        sourceSizeAdjusterIterator = {
            adjustAllSourcesSizes: jest.fn()
        };
        withoutTimeout = jest.fn();
        fsLightbox.injector.sizes.getSourceSizeAdjusterIterator = jest.fn(() => sourceSizeAdjusterIterator);
        fsLightbox.core.sourceHoldersTransformer = {
            transformStageSourceHolders: jest.fn(() => ({
                withoutTimeout: withoutTimeout
            }))
        };

        globalResizingController = new GlobalResizingController(fsLightbox);
        globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize = jest.fn();
        globalResizingController.runAllResizingActions();
    });

    it('should call saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize', () => {
        expect(globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize).toBeCalled();
    });

    it('should call adjustAllSourcesSize from sourceSizeAdjusterIterator', () => {
        expect(sourceSizeAdjusterIterator.adjustAllSourcesSizes).toBeCalled();
    });

    it('should call transformStageSourceHolders from sourceHoldersTransformer', () => {
        expect(fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders).toBeCalled();
    });

    it('should call withoutTimeout from object received from transformStageSourceHolders', () => {
        expect(withoutTimeout).toBeCalled();
    });
});