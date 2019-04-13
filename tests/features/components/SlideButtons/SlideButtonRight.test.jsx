import React from 'react';
import { shallow } from 'enzyme';
import SlideButtonRight from "../../../../src/components/SlideButtons/SlideButtonRight";

const nextSlideNumber = 4;
const fsLightbox = {
    core: {
        stageSources: {
            getNextSlideNumber: jest.fn(() => nextSlideNumber)
        },
        slideChanger: {
            changeSlideTo: jest.fn()
        }
    }
};

const slideButtonLeft = shallow(<SlideButtonRight fsLightbox={ fsLightbox }/>);

describe('SlideButtonRight DOM', () => {
    it('should be div', () => {
        expect(slideButtonLeft.type()).toEqual('div');
    });

    it('should have right title', () => {
        expect(slideButtonLeft.prop('title')).toBe('Next slide');
    });

    it('should have right className', () => {
        expect(slideButtonLeft.prop('className'))
            .toBe('fslightbox-slide-btn-container fslightbox-slide-btn-right-container');
    });

    it('should only one child', () => {
        expect(slideButtonLeft.children().length).toBe(1);
    });

    describe('slide button (the only child of SlideButtonRight should be div with static classes and one child)', () => {
        const slideButton = slideButtonLeft.childAt(0);

        it('should be div', () => {
            expect(slideButton.type()).toBe('div');
        });

        it('should have right className', () => {
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
                expect(svg.prop('d')).toEqual('M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z');
            });

            it('should not have more children (in this component)', () => {
                expect(svg.children().length).toBe(0);
            });
        });
    });
});

describe('after clicking SlideButtonRight calling changeSlideTo with slide number received from getNextSlideNumber', () => {
    beforeAll(() => {
        slideButtonLeft.simulate('click');
    });

    it('should call getNextSlideNumber', () => {
        expect(fsLightbox.core.stageSources.getNextSlideNumber).toBeCalled();
    });

    it('should call changeSlideTo with next slide number', () => {
        expect(fsLightbox.core.slideChanger.changeSlideTo).toBeCalledWith(nextSlideNumber);
    });
});

