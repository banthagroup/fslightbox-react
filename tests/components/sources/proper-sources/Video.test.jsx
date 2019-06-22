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

describe('ref && DOM && defined videosPosters', () => {
    beforeAll(() => {
        fsLightbox.props.videosPosters = ['test-poster'];
        fsLightbox.data.sources = ['test-url'];
        video = mount(<Video
            fsLightbox={ fsLightbox }
            index={ 0 }
        />);
    });

    it('should be equal to image', () => {
        expect(fsLightbox.elements.sources[0].current).toEqual(video.getDOMNode());
    });

    it('should match snapshot', () => {
        expect(video).toMatchSnapshot();
    });
});

describe('undefined videosPosters', () => {
    beforeAll(() => {
        delete fsLightbox.props.videosPosters;
        video = shallow(<Video fsLightbox={ fsLightbox } index={ 0 }/>);
    });

    it('should not have posters prop', () => {
        expect(video.prop('poster')).toBeUndefined();
    });
});

describe('on load', () => {
    beforeAll(() => {
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
    });

    it('should call handleLoad', () => {
        expect(fsLightbox.collections.sourcesLoadsHandlers[2].handleLoad).toBeCalledWith({
            key: 'video-load-event'
        });
    });
});

