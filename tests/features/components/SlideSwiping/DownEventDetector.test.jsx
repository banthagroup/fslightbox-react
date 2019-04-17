import React from 'react';
import { shallow } from "enzyme";
import DownEventDetector from "../../../../src/components/slide-swiping/DownEventDetector";

const fsLightbox = {
    core: {
        slideSwiping: {
            down: {
                listener: jest.fn()
            }
        }
    }
};

let downEventDetector = shallow(<DownEventDetector fsLightbox={ fsLightbox }/>);

describe('DownEventDetector DOM', () => {
    it('should match snapshot', () => {
        expect(downEventDetector).toMatchSnapshot();
    });
});

describe('calling listener when down event occurs', () => {
    beforeEach(() => {
        fsLightbox.core.slideSwiping.down.listener = jest.fn();
        // as we use destructuring we need to recreate DownEventDetector
        downEventDetector = shallow(<DownEventDetector fsLightbox={ fsLightbox }/>);
    });

    describe('mousedown event', () => {
        beforeEach(() => {
            downEventDetector.simulate('mousedown');
        });

        it('should call slide swiping down listener', () => {
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });

    describe('touchstart event', () => {
        beforeEach(() => {
            downEventDetector.simulate('touchstart');
        });

        it('should call slide swiping down listener', () => {
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });
});