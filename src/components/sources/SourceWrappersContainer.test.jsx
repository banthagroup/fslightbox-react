import React from 'react';
import { shallow } from 'enzyme';
import SourceWrappersContainer from "./SourceWrappersContainer";
import SourceMainWrapper from "./SourceMainWrapper";

let fsLightbox = {
    core: { slideSwipingDown: { listener: jest.fn() } },
    elements: { sourceMainWrappersWrapper: React.createRef() },
    props: { sources: { length: 4 } }
};
const sourceMainWrappersWrapper = shallow(<SourceWrappersContainer fsLightbox={fsLightbox} />);

test('ref', () => {
    expect(sourceMainWrappersWrapper.getElement().ref).toBe(fsLightbox.elements.sourceMainWrappersWrapper);
});

test('calling on mouseDown and touchStart events', () => {
    sourceMainWrappersWrapper.simulate('mouseDown');
    expect(fsLightbox.core.slideSwipingDown.listener).toBeCalled();
    sourceMainWrappersWrapper.simulate('touchStart');
    expect(fsLightbox.core.slideSwipingDown.listener).toBeCalledTimes(2);
});

test('rendering sources outers', () => {
    expect(sourceMainWrappersWrapper.find('SourceMainWrapper').length).toEqual(4);
    for (let i = 0; i < fsLightbox.props.sources.length; i++) {
        let sourceHolder;
        sourceHolder = sourceMainWrappersWrapper.childAt(i);
        expect(sourceHolder.equals(
            <SourceMainWrapper
                fsLightbox={fsLightbox}
                i={i}
                key={i}
            />
        )).toBeTruthy();
    }
});

