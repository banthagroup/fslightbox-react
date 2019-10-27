import React from 'react';
import { mount } from "enzyme";
import Invalid from "./Invalid";
import { FADE_IN_STRONG_CLASS_NAME } from "../../../constants/classes-names";

const fsLightbox = {
    componentsServices: { isSourceLoadedCollection: [{ set: jest.fn() }] },
    elements: { sourcesOuters: [{ current: { classList: { add: jest.fn() } } }] }
};

test('useEffect', () => {
    mount(<Invalid fsLightbox={ fsLightbox } i={ 0 }/>);
    expect(fsLightbox.componentsServices.isSourceLoadedCollection[0].set).toBeCalledWith(true);
    expect(fsLightbox.elements.sourcesOuters[0].current.classList.add).toBeCalledWith(FADE_IN_STRONG_CLASS_NAME);
});
