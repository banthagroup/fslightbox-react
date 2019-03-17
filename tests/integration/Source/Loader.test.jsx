import React from 'react';
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";
import Source from "../../../src/components/sources/Source";
import { mount } from "enzyme";

describe('Loader', () => {
    const mock = new FsLightboxMock();
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();
    const source = fsLightbox.find('Source').at(0);

    it('should render loader on opening lightbox for first time', () => {
        expect(source.exists('Loader')).toBeTruthy();
    });

    it('should hide loader after source create', () => {
        const mockSource = mount(<Source
            _={ fsLightboxInstance }
            i={ 0 }
        />);
        expect(mockSource.exists('Loader')).toBeTruthy();
        mockSource.instance().createSource();
        mockSource.update();
        expect(mockSource.exists('Loader')).toBeFalsy();
    });

    it('should hide loader after source create on construct', () => {
        // source is created on construct so loader should be hidden after component update
        // which is called in componentDidMount
        fsLightboxInstance.sourcesData.sourcesToCreateOnConstruct[0] = true;
        const mockSource = mount(<Source
            _={ fsLightboxInstance }
            i={ 0 }
        />);
        expect(mockSource.exists('Loader')).toBeFalsy();
    });
});