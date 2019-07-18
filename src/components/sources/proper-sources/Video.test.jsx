import React from 'react';
import { mount, shallow } from "enzyme";
import Video from "../../../../src/components/sources/proper-sources/Video";
import Image from "../../../../src/components/sources/proper-sources/Image";

let fsLightbox = {
    props: {
        videosPosters: []
    },
    data: {
        sources: [],
    },
    elements: {
        sources: [{
            current: null
        }]
    },
    collections: {
        sourcesLoadsHandlers: [{
            handleLoad: () => {}
        }]
    }
};

let video;

test('ref && DOM && defined videosPosters', () => {
    fsLightbox.props.videosPosters = ['test-poster'];
    fsLightbox.data.sources = ['test-url'];
    video = mount(<Video
        fsLightbox={ fsLightbox }
        index={ 0 }
    />);

    expect(fsLightbox.elements.sources[0].current).toEqual(video.getDOMNode());
    expect(video).toMatchSnapshot();
});

test('undefined videosPosters', () => {
    delete fsLightbox.props.videosPosters;
    video = shallow(<Video fsLightbox={ fsLightbox } index={ 0 }/>);

    expect(video.prop('poster')).toBeUndefined();
});

test('on load', () => {
    fsLightbox.collections.sourcesLoadsHandlers[2] = {
        handleLoad: jest.fn()
    };
    video = shallow(<Image
        fsLightbox={ fsLightbox }
        index={ 2 }
    />);
    video.simulate('load', {
        key: 'video-load-event'
    });

    expect(fsLightbox.collections.sourcesLoadsHandlers[2].handleLoad).toBeCalledWith({
        key: 'video-load-event'
    });
});

