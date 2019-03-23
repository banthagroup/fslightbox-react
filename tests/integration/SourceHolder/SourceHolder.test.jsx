import { testUrls } from "../../schemas/testVariables";
import React from 'react';
import SourceHolder from "../../../src/components/Sources/SourceHolder";
import { FsLightboxEnzymeMock } from "../../__mocks__/components/fsLightboxEnzymeMock";
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";
import { SourceHolderMock } from "../../__mocks__/components/Sources/sourceHolderMock";

describe('SourceHolder', () => {
    const fsLightboxMock = new FsLightboxEnzymeMock();
    const fsLightbox = fsLightboxMock.getWrapper();
    const fsLightboxInstance = fsLightboxMock.getInstance();

    it('should render number of source Holders equivalent to number of urls', () => {
        const mediaHolder = fsLightbox.find('.fslightbox-media-holder');
        const sourceHolders = fsLightboxInstance.elements.sourceHolders;
        for (let i = 0; i < sourceHolders.length; i++) {
            expect(sourceHolders[i].current.classList.contains('fslightbox-source-holder'))
                .toBeTruthy();
        }
        expect(mediaHolder.children().length).toEqual(testUrls.length);
    });

    describe('creating Sources after reopen due to lightbox close during request', () => {
        const fsLightboxMock = new FsLightboxMock();
        const fsLightbox = fsLightboxMock.getFsLightbox();
        const numberOfUrls = testUrls.length;
        // this mock is only to make test work, we are using transform negative in component did mount so we need to mock
        // it or there will be throw error, because we don't have source Holders rendered
        fsLightbox.core.sourceHoldersTransformer.transformNegative = jest.fn();

        const checkingCreatingSourceAtCorrectTimeDueToClosingLightbox = (i) => {
            it('should not call createSource after received source type due to component not mounted', () => {
                const sourceHolderMock = new SourceHolderMock(fsLightbox);
                sourceHolderMock.setIndex(i);
                const sourceHolder = sourceHolderMock.getSourceHolder();
                sourceHolder.source.current = {
                    createSource: jest.fn()
                };
                sourceHolder.processReceivedSourceType();
                expect(sourceHolder.source.current.createSource).not.toBeCalled();
            });

            it('should call create source on component mount (this is is needed if user will close lightbox during request)', () => {
                const sourceHolderMock = new SourceHolderMock(fsLightbox);
                sourceHolderMock.setIndex(i);
                const sourceHolder = sourceHolderMock.getSourceHolder();

                // this is needed cause if we for e.g. type is youtube and normal request will finish and set sourceType so
                // initRequest won't be  called on construct and processReceivedSourceType will throw error cause sourceType
                // won't be set
                sourceHolder.sourceTypeChecker = {
                    sourceType: 'fix'
                };
                sourceHolder.source.current = {
                    createSource: jest.fn()
                };
                sourceHolder.processReceivedSourceType();
                sourceHolder.componentDidMount();
                expect(sourceHolder.source.current.createSource).toBeCalled();
            });
        };

        for (let i = 0; i < parseInt(numberOfUrls); i++) {
            checkingCreatingSourceAtCorrectTimeDueToClosingLightbox(i);
        }
    });
});


describe(`componentDidMount - transforming source that is not in stage to negative value
     (there would be problems with z-index if we wouldn't do that`, () => {
    const fsLightboxMock = new FsLightboxMock();
    const fsLightbox = fsLightboxMock.getFsLightbox();
    fsLightboxMock.setAllSourceHoldersToDivs();
    const sourceHolderMock = new SourceHolderMock(fsLightbox);
    sourceHolderMock.setIndex(0);
    const sourceHolder = sourceHolderMock.getSourceHolder();
    fsLightbox.core.sourceHoldersTransformer.transformNegative = jest.fn();
    // this only to make test work we are calling createSource on componentDidMount
    // so we need to mock it or test would throw error
    sourceHolder.source.current = { createSource: jest.fn() };

    it('should not call transform negative due to source is in stage', () => {
        fsLightbox.state.slide = 1;
        fsLightbox.data.totalSlides = 3;
        sourceHolder.componentDidMount();
        expect(fsLightbox.core.sourceHoldersTransformer.transformNegative).not.toBeCalled();
    });

    it('should call transform negative due to source is not in stage', () => {
        fsLightbox.state.slide = 50;
        fsLightbox.data.totalSlides = 90;
        sourceHolder.componentDidMount();
        expect(fsLightbox.core.sourceHoldersTransformer.transformNegative).toBeCalledWith(0);
    });
});

