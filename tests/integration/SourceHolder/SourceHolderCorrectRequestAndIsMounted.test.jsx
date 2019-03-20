import { IMAGE_TYPE } from "../../../src/constants/CoreConstants";
import { mount } from "enzyme";
import React from "react";
import Source from "../../../src/components/sources/Source";
import { FsLightboxEnzymeMock } from "../../__mocks__/components/fsLightboxEnzymeMock";

describe('checking correct request and component mounted', () => {
    const fsLightboxMock = new FsLightboxEnzymeMock();
    const fsLightboxWrapper = fsLightboxMock.getWrapper();
    const fsLightboxInstance = fsLightboxMock.getInstance();
    const sourceHolderInstance = fsLightboxWrapper.find('SourceHolder').at(0).instance();
    sourceHolderInstance.source.current.createSource = jest.fn();

    beforeEach(() => {
        sourceHolderInstance.source.current = null;
        sourceHolderInstance.processReceivedSourceType();
    });

    it('should add true at correct _index to FsLightbox sourcesToCreateOnConstruct array', () => {
        expect(fsLightboxInstance.sourcesData.sourcesToCreateOnConstruct[0]).toBeTruthy();
        expect(fsLightboxInstance.elements.sourcesJSXComponents[0]).toBeNull();
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