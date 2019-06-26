import React from 'react';
import FsLightbox from "../../src/FsLightbox";
import { testTypes, testSources } from "../__tests-stores__/testVariables";
import { mount } from "enzyme";
import { act } from 'react-dom/test-utils';
import { ANIMATION_TIME } from "../../src/constants/css-constants";
import { PREFIX } from "../../src/constants/classes-names";

const fsLightboxWrapper = mount(<FsLightbox
    toggler={ true }
    urls={ testSources }
    types={ testTypes }
/>);
const sourcesHoldersWrapper = fsLightboxWrapper.find('SourcesHoldersWrapper');

let requestAnimationFrameCallback;

window.requestAnimationFrame = (callback) => {
    requestAnimationFrameCallback = callback;
};

it('should change slide to previous without throwing error', () => {
    fsLightboxWrapper.instance().stageIndexes.next = 1;

    const changingSlideToNextViaSlideSwiping = () => {
        act(() => {
            jest.useFakeTimers();

            sourcesHoldersWrapper.simulate('mouseDown', {
                clientX: 1000
            });

            // by default slide move ticks are delayed by requestAnimationFrame
            // so if we want to make work multiple slide swipe tests on one lightbox instance
            // we need to call thi callback
            if (requestAnimationFrameCallback)
                requestAnimationFrameCallback();
            const mouseMoveEvent = new Event('mousemove');
            Object.defineProperty(mouseMoveEvent, 'clientX', {
                value: 500
            });
            window.dispatchEvent(mouseMoveEvent);

            window.dispatchEvent(new Event('mouseup'));

            jest.runTimersToTime(ANIMATION_TIME);
        });
    };
    expect(changingSlideToNextViaSlideSwiping).not.toThrowError();
    expect(fsLightboxWrapper.instance().stageIndexes).toEqual({
        previous: 0,
        current: 1,
        next: 2
    });
});

it('should change slide to next without throwing error', () => {
    const changingSlideToPreviousViaSlideSwiping = () => {
        act(() => {
            fsLightboxWrapper.instance().stageIndexes.previous = 3;

            jest.useFakeTimers();

            sourcesHoldersWrapper.simulate('mouseDown', {
                clientX: 100
            });

            // by default slide move ticks are delayed by requestAnimationFrame
            // so if we want to make work multiple slide swipe tests on one lightbox instance
            // we need to call thi callback
            if (requestAnimationFrameCallback)
                requestAnimationFrameCallback();
            const mouseMoveEvent = new Event('mousemove');
            Object.defineProperty(mouseMoveEvent, 'clientX', {
                value: 200
            });
            window.dispatchEvent(mouseMoveEvent);

            window.dispatchEvent(new Event('mouseup'));

            jest.runTimersToTime(ANIMATION_TIME);
        });
    };
    expect(changingSlideToPreviousViaSlideSwiping).not.toThrowError();
    expect(fsLightboxWrapper.instance().stageIndexes).toEqual({
        previous: 2,
        current: 3,
        next: 0
    });
});

it('should close lightbox when clicking in overlay', () => {
    const closeLightboxWhenClickingInOverlay = () => {
        act(() => {
            jest.useFakeTimers();

            fsLightboxWrapper.instance().stageIndexes.previous = 3;

            // simulation that mouse down clientX is equal to mouse move clientX
            // so user just clicked and click target was not source lightbox should be closed
            sourcesHoldersWrapper.simulate('mouseDown', {
                clientX: 333,
                target: {
                    classList: {
                        contains: (className) => {
                            if (className === `${ PREFIX }source`) {
                                return false;
                            }
                        }
                    }
                }
            });

            // by default slide move ticks are delayed by requestAnimationFrame
            // so if we want to make work multiple slide swipe tests on one lightbox instance
            // we need to call thi callback
            if (requestAnimationFrameCallback)
                requestAnimationFrameCallback();
            const mouseMoveEvent = new Event('mousemove');
            Object.defineProperty(mouseMoveEvent, 'clientX', {
                value: 333
            });
            window.dispatchEvent(mouseMoveEvent);

            window.dispatchEvent(new Event('mouseup'));

            // lightbox should close with fade out
            jest.runTimersToTime(ANIMATION_TIME);
        });
    };
    expect(closeLightboxWhenClickingInOverlay).not.toThrowError();
    // lightbox should be closed
    expect(fsLightboxWrapper.getDOMNode()).toBeNull();
}); 
