import React from 'react';
import { mount, shallow } from "enzyme";
import Video from "../../../../src/components/sources/proper-sources/Video";
import Image from "../../../../src/components/sources/proper-sources/Image";

let fsLightbox = {
    data: {
        urls: [],
    },
    sourcesData: {
        videosPosters: ["test-poster"]
    },
    elements: {
        sources: [{
            current: null
        }]
    },
    collections: {
        sourcesLoadHandlers: [{
            handleLoad: () => {}
        }]
    }
};

let video;

describe('ref to sources array in fsLightbox object', () => {
    beforeAll(() => {
        video = mount(<Video
            fsLightbox={ fsLightbox }
            index={ 0 }
        />);
    });

    it('should be equal to image', () => {
        expect(fsLightbox.elements.sources[0].current).toEqual(video.getDOMNode());
    });
});

describe('on load', () => {
    beforeAll(() => {
        fsLightbox.collections.sourcesLoadHandlers[2] = {
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
        expect(fsLightbox.collections.sourcesLoadHandlers[2].handleLoad).toBeCalledWith({
            key: 'video-load-event'
        });
    });
});

describe('Video DOM', () => {
    beforeAll(() => {
        video = shallow(<Video fsLightbox={ fsLightbox } index={ 0 }/>);
    });

    it('should match snapshot', () => {
        expect(video).toMatchSnapshot();
    });
});

