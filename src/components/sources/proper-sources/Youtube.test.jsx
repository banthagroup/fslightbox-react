import React from 'react';
import { mount } from "enzyme";
import Youtube from "./Youtube";
import * as getYoutubeVideoIdFromUrlObject from "../../../helpers/source/getYoutubeVideoIdFromUrl";

getYoutubeVideoIdFromUrlObject.getYoutubeVideoIdFromUrl = (source) => {
    if (source === 'source') {
        return 'youtube-id';
    } else {
        throw new Error('Invalid param');
    }
};

const fsLightbox = {
    props: { sources: ['source'] },
    elements: { sources: [React.createRef()] },
    collections: { sourcesLoadsHandlers: [{ handleLoad: jest.fn() }] }
};

const video = mount(<Youtube fsLightbox={ fsLightbox } i={ 0 } />);

test('useEffect', () => {
    expect(fsLightbox.collections.sourcesLoadsHandlers[0].handleLoad).toBeCalled();
});

test('sources ref', () => {
    expect(video.getDOMNode()).toBe(fsLightbox.elements.sources[0].current);
});

test('iframe src', () => {
    expect(video.getDOMNode().getAttribute('src'))
        .toBe('https://www.youtube.com/embed/youtube-id');
});
