import React from 'react';
import { mount, shallow } from "enzyme/build";
import { act } from 'react-dom/test-utils';
import SlideNumber from "../../../src/components/nav/SlideNumber";

const fsLightbox = {
    props: {},
    data: {
        sourcesCount: 4,
        sourceIndexOnLightboxOpen: 0
    },
    componentsStates: {
        currentIndex: {}
    }
};
const currentIndexState = fsLightbox.componentsStates.currentIndex;
let slideNumber;

describe('slide - components state', () => {
    beforeAll(() => {
        fsLightbox.data.sourceIndexOnLightboxOpen = 4;
        slideNumber = mount(<SlideNumber fsLightbox={ fsLightbox }/>);
    });

    it('should be initially sourceIndexOnLightboxOpen', () => {
        expect(currentIndexState.get()).toBe(4);
    });

    it('should set to 2', () => {
        act(() => {
            currentIndexState.set(2);
        });
        expect(currentIndexState.get()).toBe(2);
    });

    describe('onUpdate', () => {
        let actionToBeCalled = jest.fn();

        beforeAll(() => {
            fsLightbox.data.sourceIndexOnLightboxOpen = 1;
            currentIndexState.onUpdate = () => {
                actionToBeCalled();
            };
            // updating state
            act(() => {
                currentIndexState.set(3);
            });
        });

        it('should set sourceIndexOnLightboxOpen to new slide', () => {
            expect(fsLightbox.data.sourceIndexOnLightboxOpen).toBe(3);
        });

        it('should call onUpdate', () => {
            expect(actionToBeCalled).toBeCalled();
        });
    });
});

describe('SlideNumber DOM', () => {
    describe('sourcesCount > 1', () => {
        beforeAll(() => {
            fsLightbox.data.sourcesCount = 5;
            fsLightbox.data.sourceIndexOnLightboxOpen = 6;
            slideNumber = shallow(<SlideNumber fsLightbox={ fsLightbox }/>);
        });

        describe('slide (first child of wrapper)', () => {
            it('should be 7 (sourceIndexOnLightboxOpen + 1)', () => {
                expect(slideNumber.childAt(0).text()).toBe('7');
            });

            it('should be 4, we set index to 3 so slide number will be 4', () => {
                fsLightbox.componentsStates.currentIndex.set(3);
                expect(slideNumber.childAt(0).text()).toBe('4');
            });
        });

        describe('static DOM', () => {
            it('should match snapshot', () => {
                expect(slideNumber).toMatchSnapshot();
            });
        });
    });

    describe('sourcesCount === 1', () => {
        beforeAll(() => {
            fsLightbox.data.sourcesCount = 1;
            slideNumber = shallow(<SlideNumber fsLightbox={ fsLightbox }/>);
        });

        it('should be null', () => {
            expect(slideNumber.html()).toBeNull();
        });
    });
});
