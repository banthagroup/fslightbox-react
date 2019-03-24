import React from 'react';
import { mount } from "enzyme";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import DownEventDetector from "../../../../src/components/SlideSwiping/DownEventDetector";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

let downEventDetector;

beforeEach(() => {
    fsLightbox.core.slideSwiping.down.listener = jest.fn();
    downEventDetector = mount(<DownEventDetector
        isSwipingSlides={ fsLightbox.state.isSwipingSlides }
        core={ fsLightbox.core }
    />)
});

describe('calling listener when down event occurs', () => {
    describe('mousedown event', () => {
        it('should call slide swiping down listener', () => {
            downEventDetector.simulate('mousedown');
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });

    describe('touchstart event', () => {
        it('should call slide swiping down listener', () => {
            downEventDetector.simulate('touchstart');
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });
});