import React from 'react';
import { shallow } from 'enzyme';
import SlideButtonLeft from "../../../../src/components/SlideButtons/SlideButtonLeft";

const previousSlideNumber = 4;
const fsLightbox = {
    core: {
        stageSources: {
            getPreviousSlideNumber: jest.fn(() => previousSlideNumber)
        },
        slideChanger: {
            changeSlideTo: jest.fn()
        }
    }
};

const slideButtonLeft = shallow(<SlideButtonLeft fsLightbox={ fsLightbox }/>);

describe('SlideButtonLeft DOM', () => {
    it('should be div', () => {
        expect(slideButtonLeft.type()).toEqual('div');
    });

    it('should have correct title', () => {
        expect(slideButtonLeft.prop('title')).toBe('Previous slide');
    });

    it('should have right className', () => {
        expect(slideButtonLeft.prop('className'))
            .toBe('fslightbox-slide-btn-container fslightbox-slide-btn-left-container');
    });

    it('should only one child', () => {
        expect(slideButtonLeft.children().length).toBe(1);
    });

    describe('slide button (the only child of SlideButtonLeft should be div with static classes and one child)', () => {
        const slideButton = slideButtonLeft.childAt(0);

        it('should be div', () => {
            expect(slideButton.type()).toBe('div');
        });

        it('should right className', () => {
            expect(slideButton.prop('className')).toBe('fslightbox-slide-btn fslightbox-flex-centered');
        });

        it('should have only one child', () => {
            expect(slideButtonLeft.children().length).toBe(1);
        });

        describe('Svg (the only child of slide button should be Svg component with right static props passed)', () => {
            const svg = slideButton.find('Svg');

            it('should be Svg component', () => {
                expect(svg.length).toBe(1);
            });

            it('should have right viewBox prop', () => {
                expect(svg.prop('viewBox')).toEqual('0 0 20 20');
            });

            it('should have right size prop', () => {
                expect(svg.prop('size')).toEqual('26px');
            });

            it('should have right d prop', () => {
                expect(svg.prop('d')).toEqual('M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z');
            });

            it('should not have more children (in this component)', () => {
                expect(svg.children().length).toBe(0);
            });
        });
    });
});

describe('after clicking SlideButtonLeft calling changeSlideTo with slide number received from getPreviousSlideNumber', () => {
    beforeAll(() => {
        slideButtonLeft.simulate('click');
    });

    it('should call getPreviousSlideNumber', () => {
        expect(fsLightbox.core.stageSources.getPreviousSlideNumber).toBeCalled();
    });

    it('should call changeSlideTo with previous slide number', () => {
        expect(fsLightbox.core.slideChanger.changeSlideTo).toBeCalledWith(previousSlideNumber);
    });
});

