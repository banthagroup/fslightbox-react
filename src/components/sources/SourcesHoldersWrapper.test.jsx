import React from 'react';
import { mount, shallow } from 'enzyme/build';
import SourcesHoldersWrapper from "./SourcesHoldersWrapper";
import SourceHolder from "./SourceHolder";
import FsLightbox from "../../FsLightbox";

let fsLightbox = {
    data: {
        sourcesCount: 4
    },
    elements: {
        sourcesHoldersWrapper: {
            current: null
        }
    },
    core: {
        slideSwiping: {
            down: jest.fn()
        }
    }
};
let sourcesHoldersWrapper;

describe('attaching element to sourcesHoldersWrapper ref from fsLightbox elements object', () => {
    let completeFsLightboxObject;

    beforeAll(() => {
        completeFsLightboxObject = new FsLightbox({
            toggler: false,
            sources: ['test']
        });
        sourcesHoldersWrapper = mount(<SourcesHoldersWrapper fsLightbox={ completeFsLightboxObject }/>);
    });

    it('should attach element to ref', () => {
        expect(completeFsLightboxObject.elements.sourcesHoldersWrapper.current).toEqual(sourcesHoldersWrapper.getDOMNode());
    });
});

test('SourcesHoldersWrapper DOM', () => {
    sourcesHoldersWrapper = shallow(<SourcesHoldersWrapper fsLightbox={ fsLightbox }/>)
    expect(sourcesHoldersWrapper).toMatchSnapshot();
});


describe('calling on mouseDown and touchStart events', () => {
    beforeEach(() => {
        fsLightbox.core.slideSwiping.down.listener = jest.fn();
        sourcesHoldersWrapper = shallow(<SourcesHoldersWrapper fsLightbox={ fsLightbox }/>);
    });

    test('onMouseDown', () => {
        sourcesHoldersWrapper.simulate('mouseDown');
        expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
    });


    test('onTouchStart', () => {
        sourcesHoldersWrapper.simulate('touchStart');
        expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
    });
});

describe('rendering sources holders', () => {
    beforeAll(() => {
        sourcesHoldersWrapper = shallow(<SourcesHoldersWrapper fsLightbox={ fsLightbox }/>)
    });

    test('rendering equivalent to sourcesCount number of sources holders', () => {
        expect(sourcesHoldersWrapper.find('SourceHolder').length).toEqual(4);
    });

    test('SourceHolders (testing correct props and dom)', () => {
        for (let i = 0; i < fsLightbox.data.sourcesCount; i++) {
            let sourceHolder;
            sourceHolder = sourcesHoldersWrapper.childAt(i);
            expect(sourceHolder.equals(
                <SourceHolder
                    fsLightbox={ fsLightbox }
                    index={ i }
                    key={ i }
                />
            )).toBeTruthy();
        }
    });
});

