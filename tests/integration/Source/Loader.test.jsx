import React from 'react';
import { FsLightboxEnzymeMock } from "../../__mocks__/components/fsLightboxEnzymeMock";
import Source from "../../../src/components/sources/Source";
import { IMAGE_TYPE } from "../../../src/constants/CoreConstants";
import { SourceEnzymeMock } from "../../__mocks__/components/sources/sourceEnzymeMock";

describe('Loader', () => {
    const fsLightboxMock = new FsLightboxEnzymeMock();
    const fsLightbox = fsLightboxMock.getWrapper();
    const fsLightboxInstance = fsLightboxMock.getInstance();
    const source = fsLightbox.find('Source').at(0);

    it('should render loader on opening lightbox for first time', () => {
        expect(source.exists('Loader')).toBeTruthy();
    });

    it('should hide loader after source create', () => {
        fsLightboxMock.setSourcesTypes([
            IMAGE_TYPE
        ]);
        const sourceEnzymeMock = new SourceEnzymeMock(fsLightboxInstance);
        sourceEnzymeMock.instantiateSource();
        const sourceWrapper = sourceEnzymeMock.getWrapper();
        expect(sourceWrapper.exists('Loader')).toBeTruthy();
        sourceWrapper.instance().createSource();
        sourceWrapper.update();
        expect(sourceWrapper.exists('Loader')).toBeFalsy();
    });

    it('should hide loader after source create on construct', () => {
        // source is created on construct so loader should be hidden after component update
        // which is called in componentDidMount
        fsLightboxInstance.sourcesData.sourcesToCreateOnConstruct[0] = true;
        const sourceEnzymeMock = new SourceEnzymeMock(fsLightboxInstance);
        sourceEnzymeMock.instantiateSource();
        const sourceWrapper = sourceEnzymeMock.getWrapper()
        expect(sourceWrapper.exists('Loader')).toBeFalsy();
    });
});