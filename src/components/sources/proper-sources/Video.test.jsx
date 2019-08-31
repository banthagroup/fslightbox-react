import React from 'react';
import { shallow } from "enzyme";
import Video from "./Video";

const fsLightbox = {
    props: { sources: [] },
    elements: { sources: [React.createRef()] },
    collections: { sourcesLoadsHandlers: [{ handleLoad: jest.fn() }] }
};

const video = shallow(<Video fsLightbox={ fsLightbox } i={ 0 }/>);

test('sources ref', () => {
    expect(video.getElement().ref).toBe(fsLightbox.elements.sources[0]);
});

test('on load', () => {
    video.simulate('loadedMetadata', 'e');
    expect(fsLightbox.collections.sourcesLoadsHandlers[0].handleLoad).toBeCalledWith('e');
});
