import React from 'react';
import Invalid from "../../../../src/components/sources/proper-sources/Invalid";
import { mount, shallow } from "enzyme";

const fsLightbox = {
    core: {
        sourceAnimator: {
            animateSourceFromIndex: () => ({
                fadeIn: () => {}
            })
        }
    },
    elements: {
        sources: [{
            current: null
        }]
    }
};

let invalid;

describe('ref to sources array in fsLightbox object', () => {
    beforeAll(() => {
        invalid = mount(<Invalid fsLightbox={ fsLightbox } index={ 0 }/>);
    });

    it('should be equal to Invalid', () => {
        expect(fsLightbox.elements.sources[0].current).toEqual(invalid.getDOMNode());
    });
});

describe('on render', () => {
    let fadeIn;

    beforeAll(() => {
        fadeIn = jest.fn();
        fsLightbox.core.sourceAnimator.animateSourceFromIndex = jest.fn((index) => {
            if (index === 2) {
                return {
                    fadeIn: fadeIn
                }
            }
        });
        invalid = mount(<Invalid fsLightbox={ fsLightbox } index={ 2 }/>);
    });

    it('should call animateSourceFromIndex', () => {
        expect(fsLightbox.core.sourceAnimator.animateSourceFromIndex).toBeCalled();
    });

    it('should call fadeIn', () => {
        expect(fadeIn).toBeCalled();
    });
});

describe('Invalid DOM', () => {
    beforeAll(() => {
        invalid = shallow(<Invalid fsLightbox={ fsLightbox } index={ 0 }/>);
    });

    it('should match snapshot', () => {
        expect(invalid).toMatchSnapshot();
    });
});
