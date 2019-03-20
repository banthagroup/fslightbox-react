import { testUrls, testYoutubeURL } from "../../schemas/testVariables";
import React from 'react';
import SourceHolder from "../../../src/components/sources/SourceHolder";
import { FsLightboxEnzymeMock } from "../../__mocks__/components/fsLightboxEnzymeMock";
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";

describe('SourceHolder', () => {
    const fsLightboxMock = new FsLightboxEnzymeMock();
    const fsLightbox = fsLightboxMock.getWrapper();
    const fsLightboxInstance = fsLightboxMock.getInstance();

    it('should render number of source holders equivalent to number of urls', () => {
        const mediaHolder = fsLightbox.find('.fslightbox-media-holder');
        const sourceHolders = fsLightboxInstance.elements.sourceHolders;
        for (let i = 0; i < sourceHolders.length; i++) {
            expect(sourceHolders[i].current.classList.contains('fslightbox-source-holder'))
                .toBeTruthy();
        }
        expect(mediaHolder.children().length).toEqual(testUrls.length);
    });

    describe('creating sources after reopen due to lightbox close during request', () => {
        const fsLightboxMock = new FsLightboxMock();
        const fsLightbox = fsLightboxMock.instantiateFsLightbox().getFsLightbox();
        const numberOfUrls = testUrls.length;

        const checkingCreatingSourceAtCorrectTimeDueToClosingLightbox = (i) => {
            it('should not call createSource after received source type due to component not mounted', () => {
                const sourceHolder = new SourceHolder({
                    _: fsLightbox,
                    i: i
                });
                sourceHolder.source.current = {
                    createSource: jest.fn()
                };
                sourceHolder.processReceivedSourceType();
                expect(sourceHolder.source.current.createSource).not.toBeCalled();
            });

            it('should call create source on component mount (this is is needed if user will close lightbox during request)', () => {
                const sourceHolder = new SourceHolder({
                    _: fsLightbox,
                    i: i
                });
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

