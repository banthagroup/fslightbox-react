import React from 'react';
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { SourceMock } from "../../../__mocks__/components/Sources/sourceMock";
import { SourceSizeAdjuster } from "../../../../src/core/sizes/SourceSizeAdjuster";
import { FADE_IN_CLASS_NAME, LONG_FADE_IN_CLASS_NAME } from "../../../../src/constants/cssConstants";
import { IMAGE_TYPE } from "../../../../src/constants/coreConstants";

const fsLightboxMock = new FsLightboxMock();
fsLightboxMock.instantiateNewFsLightbox();
fsLightboxMock.setAllSourcesToDivs();
const fsLightbox = fsLightboxMock.getFsLightbox();

let sourceMock = new SourceMock(fsLightbox);
sourceMock.setIndex(0);
let source = sourceMock.getSource();

beforeEach(() => {
    fsLightboxMock.setAllSourcesToDivs();
});

describe('onSourceLoad', () => {
    describe('adjusting sources size', () => {
        const testSourceSizeAdjuster = new SourceSizeAdjuster(fsLightbox);
        testSourceSizeAdjuster.adjustSourceSize = jest.fn();
        fsLightbox.collections.sourceSizeAdjusters[0] = testSourceSizeAdjuster;
        source.onSourceLoad();

        it('should not adjust sources size', () => {
            expect(testSourceSizeAdjuster.adjustSourceSize).toBeCalled();
        });
    });

    describe('fading in sources', () => {
        it('should not fade in sources due to its not in stage', () => {
            // we need to set both state slide and props slide because props slide not depends on state because
            // we don't use enzyme
            fsLightbox.state.slide = 100;
            source.props.slide = 100;
            source.onSourceLoad();
            expect(fsLightbox.elements.sources[0].current.classList.contains(FADE_IN_CLASS_NAME)).toBeFalsy();
            expect(fsLightbox.elements.sources[0].current.classList.contains(LONG_FADE_IN_CLASS_NAME)).toBeFalsy();
        });

        it('should add complete fade in due to sources is in current slide', () => {
            // we need to set both state slide and props slide because props slide not depends on state because
            // we don't use enzyme
            fsLightbox.state.slide = 1;
            source.props.slide = 1;
            source.onSourceLoad();
            expect(fsLightbox.elements.sources[0].current.classList.contains(LONG_FADE_IN_CLASS_NAME)).toBeTruthy();
        });

        it('should add normal fade in due to sources is not current slide, but its in stage', () => {
            // we need to set both state slide and props slide because props slide not depends on state because
            // we don't use enzyme
            fsLightbox.state.slide = 2;
            source.props.slide = 2;
            source.onSourceLoad();
            expect(fsLightbox.elements.sources[0].current.classList.contains(FADE_IN_CLASS_NAME)).toBeTruthy();
        });
    });
});


describe('sourceWasCreated', () => {
    source.forceUpdate = jest.fn();
    source.sourceWasCreated();

    it('should call forceUpdate', () => {
        expect(source.forceUpdate).toBeCalled();
    });
});


describe('calling sourceWasCreated at correct time', () => {
    beforeEach(() => {
        sourceMock = new SourceMock(fsLightbox);
        // setting sources type (creating sources without type is impossible)
        fsLightbox.sourcesData.sourcesTypes[0] = IMAGE_TYPE;
    });

    describe('sources should be updated after its mount (it is needed when request succeeded when lightbox was closed)', () => {
        beforeEach(() => {
            fsLightbox.sourcesData.sourcesToCreateOnConstruct[0] = true;
            // creating new sources ( to call constructor)
            source = sourceMock.getSource();
            source.sourceWasCreated = jest.fn();
        });

        it('should not call sourceWasCreated on creating sources', () => {
            source.createSource();
            expect(source.sourceWasCreated).not.toBeCalled();
        });

        it('should call sourceWasCreated on componentDidMount', () => {
            source.componentDidMount();
            expect(source.sourceWasCreated).toBeCalled();
        });
    });


    describe('sources should be updated after it is created (normal situation)', () => {
        beforeEach(() => {
            fsLightbox.sourcesData.sourcesToCreateOnConstruct[0] = false;
            // creating new sources ( to call constructor )
            source = sourceMock.getSource();
            source.sourceWasCreated = jest.fn();
        });

        it('should not call sourceWasCreated on componentDidMount', () => {
            source.componentDidMount();
            expect(source.sourceWasCreated).not.toBeCalled();
        });

        it('should call sourceWasCreated on creating sources', () => {
            source.createSource();
            expect(source.sourceWasCreated).toBeCalled();
        });
    });
});