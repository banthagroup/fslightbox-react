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

describe('ref to sources array in fsLightbox object and component mount', () => {
    beforeAll(() => {
        fsLightbox.collections.sourcesLoadsHandlers[0] = {
            handleLoad: jest.fn()
        };
        youtube = mount(<Youtube
            fsLightbox={ fsLightbox }
            index={ 0 }
        />);
    });

    it('should be equal to youtube', () => {
        expect(fsLightbox.elements.sources[0].current).toEqual(youtube.getDOMNode());
    });

    describe('component mounted', () => {
        it('should call handleLoad', () => {
            expect(fsLightbox.collections.sourcesLoadsHandlers[0].handleLoad).toBeCalled();
        });
    });
});


describe('Video DOM', () => {
    beforeAll(() => {
        youtube = shallow(<Youtube fsLightbox={ fsLightbox } index={ 0 }/>);
    });

    describe('src', () => {
        it('should be equal to base embed youtube url + youtube id + js api enables', () => {
            expect(youtube.prop('src')).toBe("https://www.youtube.com/embed/testId?enablejsapi=1");
        });
    });

    describe('static DOM', () => {
        it('should match snapshot', () => {
            expect(youtube).toMatchSnapshot();
        });
    });
});
