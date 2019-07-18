import React from 'react';
import { mount, shallow } from "enzyme";
import Youtube from "../../../../src/components/sources/proper-sources/Youtube";

const fsLightbox = {
    data: {
        sources: ['https://www.youtube.com/watch?v=testId'],
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

let youtube;

test('ref to sources array in fsLightbox object and component mount', () => {
    fsLightbox.collections.sourcesLoadsHandlers[0] = {
        handleLoad: jest.fn()
    };
    youtube = mount(<Youtube
        fsLightbox={ fsLightbox }
        index={ 0 }
    />);

    expect(fsLightbox.elements.sources[0].current).toEqual(youtube.getDOMNode());
    expect(fsLightbox.collections.sourcesLoadsHandlers[0].handleLoad).toBeCalled();
});

test('DOM', () => {
    youtube = shallow(<Youtube fsLightbox={ fsLightbox } index={ 0 }/>);
    expect(youtube.prop('src')).toBe("https://www.youtube.com/embed/testId?enablejsapi=1");
    expect(youtube).toMatchSnapshot();
});
