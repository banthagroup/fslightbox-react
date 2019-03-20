import React from 'react';
import { mount } from "enzyme";
import Image from "../../../src/components/sources/properSources/Image";

/**
 * @param { FsLightbox } fsLightboxInstance
 * @return {ReactWrapper<C["props"], C["state"], React.Component> | ReactWrapper<any, any>}
 */
export const getMountedImageForFsLightboxInstance = (fsLightboxInstance) => {
    return mount(<Image
        urls={ fsLightboxInstance.data.urls }
        sourcesData={ fsLightboxInstance.sourcesData }
        sources={ fsLightboxInstance.elements.sources }
        i={ 0 }
        onFirstSourceLoad={ jest.fn }
    />);
};