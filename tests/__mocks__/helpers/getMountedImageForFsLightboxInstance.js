import React from 'react';
import { mount } from "enzyme";
import Image from "../../../src/components/sources/properSources/Image";

export const getMountedImageForFsLightboxInstance = (instance) => {
    return mount(<Image
        _={ instance }
        i={ 0 }
        onFirstSourceLoad={ jest.fn() }
    />);
};