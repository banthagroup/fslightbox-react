import React from 'react';
import { mount } from "enzyme";
import Image from "../../../src/components/sources/proper-sources/Image";

/**
 * @param { FsLightbox } fsLightboxInstance
 * @return {ReactWrapper<C["props"], C["state"], React.Component> | ReactWrapper<any, any>}
 */
export const getMountedImageForFsLightboxInstance = (fsLightboxInstance) => {
    return mount(<Image
        fsLightbox={ fsLightboxInstance }
        i={ 0 }
        onFirstSourceLoad={ jest.fn }
    />);
};