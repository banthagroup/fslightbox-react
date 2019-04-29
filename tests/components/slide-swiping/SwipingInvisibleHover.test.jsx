import React from 'react';
import { shallow } from "enzyme/build";
import SwipingInvisibleHover from "../../../src/components/slide-swiping/SwipingInvisibleHover";


const fsLightbox = {
    data: {
        totalSlides: 4
    },
    componentsStates: {
        hasMovedWhileSwiping: {}
    }
};
let swipingInvisibleHover = shallow(<SwipingInvisibleHover fsLightbox={ fsLightbox }/>);

describe('isSwipingSlide components state', () => {
    it('should by default return false', () => {
        expect(fsLightbox.componentsStates.isSwipingSlides.get()).toBeFalsy();
    });

    it('should return true, because we set hasMovedWhileSwiping to true', () => {
        fsLightbox.componentsStates.isSwipingSlides.set(true);
        expect(fsLightbox.componentsStates.isSwipingSlides.get()).toBeTruthy();
    });
});

describe('hasMovedWhileSwiping DOM', () => {
    describe('user is not swipingSlides', () => {
        beforeAll(() => {
            fsLightbox.componentsStates.isSwipingSlides.set(false);
        });

        it('should return null', () => {
            expect(swipingInvisibleHover.html()).toBeNull();
        });
    });

    describe('user is swiping slides', () => {
        beforeAll(() => {
            fsLightbox.componentsStates.isSwipingSlides.set(true);
        });

        describe('totalSlides > 1 (swipingInvisibleHover should contain additional class)', () => {
            beforeAll(() => {
                fsLightbox.data.totalSlides = 4;
                swipingInvisibleHover = shallow(<SwipingInvisibleHover fsLightbox={ fsLightbox }/>);
                fsLightbox.componentsStates.isSwipingSlides.set(true);
            });

            it('should match snapshot', () => {
                expect(swipingInvisibleHover).toMatchSnapshot();
            });
        });

        describe('totalSlides === 1 (swipingInvisibleHover should not contain additional class)', () => {
            beforeAll(() => {
                fsLightbox.data.totalSlides = 1;
                swipingInvisibleHover = shallow(<SwipingInvisibleHover fsLightbox={ fsLightbox }/>);
                fsLightbox.componentsStates.isSwipingSlides.set(true);
            });

            it('should match snapshot', () => {
                expect(swipingInvisibleHover).toMatchSnapshot();
            });
        });
    });
});