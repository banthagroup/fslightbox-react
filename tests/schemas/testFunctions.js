import React from 'react';
import { SOURCE_DIMENSIONS_DECREASE_VALUE } from "../../src/constants/ResponsiveConstants";
import { mount } from "enzyme";
import Image from "../../src/components/sources/properSources/Image";

export const getDescreasedDimensionValue = (value) => {
    return (value - (value * SOURCE_DIMENSIONS_DECREASE_VALUE));
};

export const mountImageForFsLightboxInstance = (instance) => {
    return mount(<Image
        fsLightbox={ instance }
        index={ 0 }
        onNormalSourceLoad={ jest.fn() }
        onFirstSourceLoad={ jest.fn() }
    />);
};