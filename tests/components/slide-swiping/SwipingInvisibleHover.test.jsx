import React from 'react';
import { shallow } from "enzyme/build";
import SwipingInvisibleHover from "../../../src/components/slide-swiping/SwipingInvisibleHover";


const fsLightbox = {
    data: {
        sourcesCount: 4
    },
    componentsStates: {
        hasMovedWhileSwiping: {}
    }
};
let swipingInvisibleHover = shallow(<SwipingInvisibleHover fsLightbox={ fsLightbox }/>);

describe('isSwipingSlide components state', () => {
    it('should by default return false', () => {
        expect(fsLightbox.componentsStates.hasMovedWhileSwiping.get()).toBeFalsy();
    });

    it('should return true, because we set hasMovedWhileSwiping to true', () => {
        fsLightbox.componentsStates.hasMovedWhileSwiping.set(true);
        expect(fsLightbox.componentsStates.hasMovedWhileSwiping.get()).toBeTruthy();
    });
});

describe('hasMovedWhileSwiping DOM', () => {
    describe('user is not swipingSlides', () => {
        beforeAll(() => {
            fsLightbox.componentsStates.hasMovedWhileSwiping.set(false);
        });

        it('should return null', () => {
            expect(swipingInvisibleHover.html()).toBeNull();
        });
    });

    describe('user is swiping slides', () => {
        beforeAll(() => {
            fsLightbox.componentsStates.hasMovedWhileSwiping.set(true);
        });

        it('should match snapshot', () => {
            expect(swipingInvisibleHover).toMatchSnapshot();
        });
    });
});
