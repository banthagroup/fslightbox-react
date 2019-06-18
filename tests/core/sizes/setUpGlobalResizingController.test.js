import React from 'react';
import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../../src/constants/responsiveConstants";
import { setUpGlobalResizingController } from "../../../src/core/sizes/setUpGlobalResizingController";
import { SourceSizeAdjusterIterator } from "../../../src/core/sizes/SourceSizeAdjusterIterator";

let globalResizingController = {};
const sourceSizeAdjusterIterator = {};
const sourcesWrapper = document.createElement('div');
const fsLightbox = {
    data: {
        maxSourceWidth: 0,
        maxSourceHeight: 0
    },
    elements: {
        sourcesHoldersWrapper: {
            current: sourcesWrapper
        }
    },
    injector: {
        injectDependency: () => sourceSizeAdjusterIterator
    },
    core: {
        stage: {
            isSourceInStage: () => {}
        },
        sourcesHoldersTransformer: {
            transform: () => {}
        },
        globalResizingController: globalResizingController
    }
};

describe('injecting SourceSizeAdjusterIterator', () => {
    beforeAll(() => {
        fsLightbox.injector.injectDependency = jest.fn(() => ({}));
        setUpGlobalResizingController(fsLightbox);
    });

    it('should call injectDependency with SourceSizeAdjusterIterator', () => {
        expect(fsLightbox.injector.injectDependency).toBeCalledWith(SourceSizeAdjusterIterator);
    });
});


describe('saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize', () => {
    beforeAll(() => {
        setUpGlobalResizingController(fsLightbox);
    });
    describe('saveMaxSourcesDimensions', () => {
        describe('maxSourceWidth', () => {
            describe('window.innerWidth < SOURCE_DIMENSIONS_BREAK', () => {
                beforeAll(() => {
                    window.innerWidth = SOURCE_DIMENSIONS_BREAK - 50;
                    globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize();
                });

                it('should set maxSourceWidth to window.innerWidth, due to screen is small', () => {
                    expect(fsLightbox.data.maxSourceWidth).toEqual(window.innerWidth);
                });
            });

            describe('window.innerWidth > SOURCE_DIMENSIONS_BREAK', () => {
                beforeAll(() => {
                    window.innerWidth = SOURCE_DIMENSIONS_BREAK + 50;
                    globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize();
                });

                it(`should set maxSourceWidth to window.innerWidth decreased by responsive value, 
                    due to screen is wide`, () => {
                    expect(fsLightbox.data.maxSourceWidth)
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
                expect(fsLightbox.data.maxSourceHeight)
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
            expect(sourcesWrapper.style.width).toBe(fsLightbox.data.maxSourceWidth + 'px');
        });

        it('should set sourcesHoldersWrapper width to maxSourceHeight value + px', () => {
            expect(sourcesWrapper.style.width).toBe(fsLightbox.data.maxSourceWidth + 'px');
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
        fsLightbox.injector.injectDependency = () => sourceSizeAdjusterIterator;
        fsLightbox.core.sourcesHoldersTransformer = {
            transform: jest.fn(() => ({
                withoutTimeout: withoutTimeout
            }))
        };

        setUpGlobalResizingController(fsLightbox);
        globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize = jest.fn();
        globalResizingController.runAllResizingActions();
    });

    it('should call saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize', () => {
        expect(globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize).toBeCalled();
    });

    it('should call adjustAllSourcesSize from sourceSizeAdjusterIterator', () => {
        expect(sourceSizeAdjusterIterator.adjustAllSourcesSizes).toBeCalled();
    });

    it('should call transform from sourcesHoldersTransformer', () => {
        expect(fsLightbox.core.sourcesHoldersTransformer.transform).toBeCalled();
    });

    it('should call withoutTimeout from object received from transform', () => {
        expect(withoutTimeout).toBeCalled();
    });

    describe('transforming all source holders which are not in stage negative', () => {
        let isSourceInStageCall = 0;
        let transformCalls = [];

        beforeAll(() => {
            fsLightbox.data.sourcesCount = 4;
            fsLightbox.core.stage.isSourceInStage = jest.fn(() => {
                isSourceInStageCall++;
                return isSourceInStageCall === 0 || isSourceInStageCall === 2;
            });
            fsLightbox.core.sourcesHoldersTransformer.transformSourceHolderAtIndex = jest.fn((index) => {
                transformCalls[index] = {
                    negative: jest.fn()
                };
                return transformCalls[index];
            });
            setUpGlobalResizingController(fsLightbox);
            globalResizingController.runAllResizingActions();
        });

        it('should call isSourceInStage 4 times (data.sourcesCount)', () => {
            expect(fsLightbox.core.stage.isSourceInStage).toHaveBeenCalledTimes(4);
        });

        it('should have called transformSourceHolderAtIndex with 2 (mocked isSourceInStage return value)', () => {
            expect(fsLightbox.core.sourcesHoldersTransformer.transformSourceHolderAtIndex).toBeCalledWith(2);
        });

        it('should have called negative at transform object on 2 position in array', () => {
            expect(transformCalls[2].negative).toBeCalled();
        });

        it('should have called transformSourceHolderAtIndex with 0 (mocked isSourceInStage return value)', () => {
            expect(fsLightbox.core.sourcesHoldersTransformer.transformSourceHolderAtIndex).toBeCalledWith(0);
        });

        it('should have called negative at transform object on 0 position in array', () => {
            expect(transformCalls[0].negative).toBeCalled();
        });
    });
});
