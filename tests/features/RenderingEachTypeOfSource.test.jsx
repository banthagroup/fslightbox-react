import React from 'react';
import { mount } from "enzyme";
import FsLightbox from "../../src/FsLightbox";
import { testTypes, testSources } from "../__tests-stores__/testVariables";

it('should render each type of source without error', () => {
    let fsLightboxWrapper;

    const mountLightboxWithEachTypeOfSource = () => {
        fsLightboxWrapper = mount(<FsLightbox
            toggler={ true }
            urls={ testSources }
            types={ testTypes }
        />);
    };

    expect(mountLightboxWithEachTypeOfSource).not.toThrowError();
    expect(fsLightboxWrapper.find('Image')).toHaveLength(1);
    expect(fsLightboxWrapper.find('Video')).toHaveLength(1);
    expect(fsLightboxWrapper.find('Youtube')).toHaveLength(1);
    expect(fsLightboxWrapper.find('Invalid')).toHaveLength(1);
});
