import React from 'react';
import { mount } from "enzyme";
import Invalid from "./Invalid";

const fsLightbox = {
    componentsStates: { isSourceLoadedCollection: [{ set: jest.fn() }] },
    data: { initialAnimation: 'example-animation' },
    elements: { sourcesOuters: [{ current: { classList: { add: jest.fn() } } }] }
};

test('useEffect', () => {
    mount(<Invalid fsLightbox={ fsLightbox } i={ 0 } />);
    expect(fsLightbox.componentsStates.isSourceLoadedCollection[0].set).toBeCalledWith(true);
    expect(fsLightbox.elements.sourcesOuters[0].current.classList.add).toBeCalledWith('example-animation');
});
