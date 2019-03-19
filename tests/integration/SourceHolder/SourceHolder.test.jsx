import { mount } from "enzyme";
import { testImageURL, testUrls } from "../../schemas/testVariables";
import React from 'react';
import SourceHolder from "../../../src/components/sources/SourceHolder";
import { reopenFsLightbox } from "../../__mocks__/helpers/reopenFsLightbox";
import Source from "../../../src/components/sources/Source";
import { FsLightboxEnzymeMock } from "../../__mocks__/components/fsLightboxEnzymeMock";
import { IMAGE_TYPE } from "../../../src/constants/CoreConstants";
import FsLightbox from "../../../src";


describe('SourceHolder', () => {
    const mock = new FsLightboxEnzymeMock();
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();
    it('should render number of source holders equivalent to number of urls', () => {
        const mediaHolder = fsLightbox.find('.fslightbox-media-holder');
        const sourceHolders = fsLightboxInstance.elements.sourceHolders;
        for (let i = 0; i < sourceHolders.length; i++) {
            expect(sourceHolders[i].current.classList.contains('fslightbox-source-holder'))
                .toBeTruthy();
        }
        expect(mediaHolder.children().length).toEqual(testUrls.length);
    });

    it('should set sourceType after detecting it by SourceTypeChecker', () => {
        const fsLightbox = mount(<FsLightbox
            isOpen={ true }
            urls={ [testImageURL] }
        />);
        const sourceHolder = fsLightbox.find('SourceHolder').at(0);
    });


    describe('creating source after asynchronous type check because child was mounted', () => {
        const mock = new FsLightboxEnzymeMock();
        const fsLightbox = mock.getWrapper();
        const sourceHolderInstance = fsLightbox.find('SourceHolder').at(0).instance();
        sourceHolderInstance.source.current.createSource = jest.fn();

        it('should create source after type check', () => {
            sourceHolderInstance.processReceivedSourceType();
            expect(sourceHolderInstance.source.current.createSource).toBeCalledTimes(1);
        });

        it('should not create source after mount', () => {
            sourceHolderInstance.componentDidMount();
            expect(sourceHolderInstance.source.current.createSource).toBeCalledTimes(1);
        })
    });

    describe('not creating source after asynchronous type check because child was not yet mounted', () => {
        const mock = new FsLightboxEnzymeMock();
        const fsLightbox = mock.getWrapper();
        const sourceHolderInstance = fsLightbox.find('SourceHolder').at(0).instance();
        sourceHolderInstance.source.current.createSource = jest.fn();

        it('should not create source after type check because child was no yet mounted', () => {
            sourceHolderInstance._isMounted = false;
            expect(sourceHolderInstance._isTypeChecked).toBeFalsy();
            sourceHolderInstance.processReceivedSourceType();
            expect(sourceHolderInstance.source.current.createSource).not.toBeCalled();
        });

        it('should create source after mount', () => {
            expect(sourceHolderInstance._isTypeChecked).toBeTruthy();
            sourceHolderInstance.componentDidMount();
            expect(sourceHolderInstance.source.current.createSource).toBeCalled();
        })
    });


    describe('creating source after component mount due to closing lightbox during request', () => {
        const fsLightboxMock = new FsLightboxEnzymeMock();
        const fsLightbox = fsLightboxMock.getWrapper();
        const fsLightboxInstance = fsLightboxMock.getInstance();
        const sourceHolderInstance = fsLightbox.find('SourceHolder').at(0).instance();
        sourceHolderInstance.source.current.createSource = jest.fn();

        beforeEach(() => {
            sourceHolderInstance.source.current = null;
            sourceHolderInstance.processReceivedSourceType();
        });

        it('should add true at correct _index to FsLightbox sourcesToCreateOnConstruct array', () => {
            expect(fsLightboxInstance.sourcesData.sourcesToCreateOnConstruct[0]).toBeTruthy();
            expect(fsLightboxInstance.elements.sourcesJSXComponents[0]).toBeNull();
        });

        it('should call createSource on construct after reopening', () => {
            reopenFsLightbox(fsLightbox).then((reopenedLightbox) => {
                expect(reopenedLightbox.instance().elements.sourcesJSXComponents[0]).not.toBeNull();
            });
        });

        it('should call sourceWasCreated after creating source', () => {
            fsLightboxMock.setSourcesTypes([IMAGE_TYPE]);
            /** @type {Source} */
            const sourceInstance = mount(<Source
                _={ fsLightboxInstance }
                i={ 0 }
            />).instance();
            sourceInstance.sourceWasCreated = jest.fn();
            sourceInstance.callUpdateAfterMount = false;
            sourceInstance.createSource();
            expect(sourceInstance.sourceWasCreated).toBeCalled();
        });

        it('should not call sourceWasCreated after creating source', () => {
            fsLightboxMock.setSourcesTypes([IMAGE_TYPE]);
            /** @type {Source} */
            const sourceInstance = mount(<Source
                _={ fsLightboxInstance }
                i={ 0 }
            />).instance();
            sourceInstance.sourceWasCreated = jest.fn();
            sourceInstance.callUpdateAfterMount = true;
            sourceInstance.createSource();
            expect(sourceInstance.sourceWasCreated).not.toBeCalled();
        });
    });
});