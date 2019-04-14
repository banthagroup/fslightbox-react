import React from 'react';
import { mount, shallow } from "enzyme";
import { act } from 'react-dom/test-utils';
import SlideNumber from "../../../../src/Components/Nav/SlideNumber";

const totalSlides = 4;
const slideState = {};
const fsLightbox = {
    data: {
        totalSlides: totalSlides
    },
    componentsStates: {
        slide: slideState
    }
};

let slideNumber;

describe('slide - Components state', () => {
    beforeAll(() => {
        slideNumber = mount(<SlideNumber fsLightbox={ fsLightbox }/>);
    });

    it('should be initially 1', () => {
        expect(slideState.get()).toBe(1);
    });

    it('should set to 2', () => {
        act(() => {
            slideState.set(2);
        });
        expect(slideState.get()).toBe(2);
    });

    describe('onUpdate', () => {
        let actionToBeCalled = jest.fn();

        beforeAll(() => {
            slideState.onUpdate = () => {
                actionToBeCalled();
            };
            // updating state
            act(() => {
                slideState.set(3);
            });
        });

        it('should call onUpdate', () => {
            expect(actionToBeCalled).toBeCalled();
        });
    });
});

describe('SlideNumber DOM', () => {
    describe('totalSlides > 1', () => {
        beforeAll(() => {
            fsLightbox.data.totalSlides = 5;
            slideNumber = shallow(<SlideNumber fsLightbox={ fsLightbox }/>);
        });

        describe('slide (first child of wrapper)', () => {
            it('should be initially 1', () => {
                expect(slideNumber.childAt(0).text()).toBe("1");
            });

            it('should be 3, because we set slide state to 3', () => {
                fsLightbox.componentsStates.slide.set(3);
                expect(slideNumber.childAt(0).text()).toBe("3");
            });
        });

        describe('static DOM', () => {
            it('should match snapshot', () => {
                expect(slideNumber).toMatchSnapshot();
            });
        });
    });

    describe('totalSlides === 1', () => {
        beforeAll(() => {
            fsLightbox.data.totalSlides = 1;
            slideNumber = shallow(<SlideNumber fsLightbox={ fsLightbox }/>);
        });

        it('should be null', () => {
            expect(slideNumber.html()).toBeNull();
        });
    });
});