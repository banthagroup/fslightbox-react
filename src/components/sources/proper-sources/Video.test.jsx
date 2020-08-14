import React from 'react';
import { shallow } from "enzyme";
import Video from "./Video";

const fsLightbox = {
    collections: {
        sourcesLoadsHandlers: [null, {
            handleVideoLoad: jest.fn(),
            handleNotMetaDatedVideoLoad: jest.fn()
        }]
    },
    data: {
        sources: []
    },
    elements: { sources: [null, React.createRef()] },
    props: {
        customAttributes: [
            {
                poster: 'first-custom-poster'
            },
            {
                poster: 'second-custom-poster'
            }
        ],
        videosPosters: ['first-poster', 'second-poster']
    }
};
jest.useFakeTimers();
let video = shallow(<Video fsLightbox={fsLightbox} i={1} />);

test('on load', () => {
    video.simulate('loadedMetadata', 'e');
    expect(fsLightbox.collections.sourcesLoadsHandlers[1].handleVideoLoad).toBeCalledWith('e');

    expect(fsLightbox.collections.sourcesLoadsHandlers[1].handleNotMetaDatedVideoLoad).not.toBeCalled();
    jest.runTimersToTime(3000);
    expect(fsLightbox.collections.sourcesLoadsHandlers[1].handleNotMetaDatedVideoLoad).toBeCalled();
});

describe('custom attributes and poster', () => {
    test('poster is set and customAttribute is set', () => {
        expect(video.prop('poster')).toBe('second-poster');
    })

    test('customAttribute is set and poster is not set', () => {
        fsLightbox.props.customAttributes[1] = { poster: 'second-custom-poster' };
        delete fsLightbox.props.videosPosters[1];
        video.rerender();
        expect(video.prop('poster')).toBe('second-custom-poster');
    })
})
