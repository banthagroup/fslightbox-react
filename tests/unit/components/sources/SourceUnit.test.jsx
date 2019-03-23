import React from 'react';
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { SourceMock } from "../../../__mocks__/components/Sources/sourceMock";
import { SourceSizeAdjuster } from "../../../../src/core/Source/SourceSizeAdjuster";
import { FADE_IN_CLASS_NAME, FADE_IN_COMPLETE_CLASS_NAME } from "../../../../src/constants/CssConstants";
import { IMAGE_TYPE } from "../../../../src/constants/CoreConstants";

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
    describe('adjusting source size', () => {
        const testSourceSizeAdjuster = new SourceSizeAdjuster(fsLightbox);
        testSourceSizeAdjuster.adjustSourceSize = jest.fn();
        fsLightbox.collections.sourceSizeAdjusters[0] = testSourceSizeAdjuster;
        source.onSourceLoad();

        it('should not adjust source size', () => {
            expect(testSourceSizeAdjuster.adjustSourceSize).toBeCalled();
        });
    });

    describe('fading in source', () => {
        it('should not fade in source due to its not in stage', () => {
            // we need to set both state slide and props slide because props slide not depends on state because
            // we don't use enzyme
            fsLightbox.state.slide = 100;
            source.props.slide = 100;
            source.onSourceLoad();
            expect(fsLightbox.elements.sources[0].current.classList.contains(FADE_IN_CLASS_NAME)).toBeFalsy();
            expect(fsLightbox.elements.sources[0].current.classList.contains(FADE_IN_COMPLETE_CLASS_NAME)).toBeFalsy();
        });

        it('should add complete fade in due to source is in current slide', () => {
            // we need to set both state slide and props slide because props slide not depends on state because
            // we don't use enzyme
            fsLightbox.state.slide = 1;
            source.props.slide = 1;
            source.onSourceLoad();
            expect(fsLightbox.elements.sources[0].current.classList.contains(FADE_IN_COMPLETE_CLASS_NAME)).toBeTruthy();
        });

        it('should add normal fade in due to source is not current slide, but its in stage', () => {
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
        // setting source type (creating source without type is impossible)
        fsLightbox.sourcesData.sourcesTypes[0] = IMAGE_TYPE;
    });

    describe('source should be updated after its mount (it is needed when request succeeded when lightbox was closed)', () => {
        beforeEach(() => {
            fsLightbox.sourcesData.sourcesToCreateOnConstruct[0] = true;
            // creating new source ( to call constructor)
            source = sourceMock.getSource();
            source.sourceWasCreated = jest.fn();
        });

        it('should not call sourceWasCreated on creating source', () => {
            source.createSource();
            expect(source.sourceWasCreated).not.toBeCalled();
        });

        it('should call sourceWasCreated on componentDidMount', () => {
            source.componentDidMount();
            expect(source.sourceWasCreated).toBeCalled();
        });
    });


    describe('source should be updated after it is created (normal situation)', () => {
        beforeEach(() => {
            fsLightbox.sourcesData.sourcesToCreateOnConstruct[0] = false;
            // creating new source ( to call constructor )
            source = sourceMock.getSource();
            source.sourceWasCreated = jest.fn();
        });

        it('should not call sourceWasCreated on componentDidMount', () => {
            source.componentDidMount();
            expect(source.sourceWasCreated).not.toBeCalled();
        });

        it('should call sourceWasCreated on creating source', () => {
            source.createSource();
            expect(source.sourceWasCreated).toBeCalled();
        });
    });
});