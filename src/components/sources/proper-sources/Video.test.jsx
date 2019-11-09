import React from 'react';
import { shallow } from "enzyme";
import Video from "./Video";

const fsLightbox = {
    props: { sources: [] },
    elements: { sources: [null, React.createRef()] },
    collections: {
        sourcesLoadsHandlers: [null, {
            handleVideoLoad: jest.fn(),
            handleNotMetaDatedVideoLoad: jest.fn()
        }]
    }
};
jest.useFakeTimers();
const video = shallow(<Video fsLightbox={ fsLightbox } i={ 1 }/>);

test('sources ref', () => {
    expect(video.getElement().ref).toBe(fsLightbox.elements.sources[1]);
});

test('on load', () => {
    video.simulate('loadedMetadata', 'e');
    expect(fsLightbox.collections.sourcesLoadsHandlers[1].handleVideoLoad).toBeCalledWith('e');

    expect(fsLightbox.collections.sourcesLoadsHandlers[1].handleNotMetaDatedVideoLoad).not.toBeCalled();
    jest.runTimersToTime(3000);
    expect(fsLightbox.collections.sourcesLoadsHandlers[1].handleNotMetaDatedVideoLoad).toBeCalled();
});
