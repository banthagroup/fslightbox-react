import React from 'react';
import { mount } from "enzyme";
import Image from "../../../src/components/sources/properSources/Image";

export const getMountedImageForFsLightboxInstance = (instance) => {
    return mount(<Image
        fsLightbox={ instance }
        index={ 0 }
        onFirstSourceLoad={ jest.fn() }
    />);
};