import React from 'react';
import { act } from 'react-dom/test-utils';
import { ANIMATION_TIME } from "../src/constants/css-constants";
import { mountedLightbox } from "./__tests-services__/mountedLightbox";

const sourcesOutersWrapper = mountedLightbox.find('SourcesOutersWrapper');

let requestAnimationFrameCallback;
window.requestAnimationFrame = (callback) => {
    requestAnimationFrameCallback = callback;
};

it('should change slide to previous without throwing error', () => {
    const changingSlideToPreviousViaSlideSwiping = () => {
        act(() => {
            mountedLightbox.instance().stageIndexes.previous = 4;

            jest.useFakeTimers();

            sourcesOutersWrapper.simulate('mouseDown', {
                clientX: 100
            });

            // by default slide move ticks are delayed by requestAnimationFrame
            // so if we want to make work multiple slide swipe tests on one lightbox instance
            // we need to call thi callback
            if (requestAnimationFrameCallback) {
                requestAnimationFrameCallback();
            }
            const mouseMoveEvent = new Event('mousemove');
            Object.defineProperty(mouseMoveEvent, 'clientX', {
                value: 200
            });
            document.dispatchEvent(mouseMoveEvent);

            document.dispatchEvent(new Event('mouseup'));

            jest.runTimersToTime(ANIMATION_TIME);
        });
    };
    expect(changingSlideToPreviousViaSlideSwiping).not.toThrowError();
    expect(mountedLightbox.instance().stageIndexes).toEqual({
        previous: 3,
        current: 4,
        next: 0
    });
});

it('should change slide to next without throwing error', () => {
    mountedLightbox.instance().stageIndexes.next = 1;

    const changingSlideToNextViaSlideSwiping = () => {
        act(() => {
            jest.useFakeTimers();

            sourcesOutersWrapper.simulate('mouseDown', {
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
            document.dispatchEvent(mouseMoveEvent);

            document.dispatchEvent(new Event('mouseup'));

            jest.runTimersToTime(ANIMATION_TIME);
        });
    };
    expect(changingSlideToNextViaSlideSwiping).not.toThrowError();
    expect(mountedLightbox.instance().stageIndexes).toEqual({
        previous: 0,
        current: 1,
        next: 2
    });
});

it('should close lightbox when clicking in overlay', () => {
    const closeLightboxWhenClickingInOverlay = () => {
        act(() => {
            jest.useFakeTimers();

            mountedLightbox.instance().stageIndexes.previous = 3;
            const element = document.createElement('div');
            element.contains = () => false;

            // simulation that mouse down clientX is equal to mouse move clientX
            // so user just clicked and click target was not source lightbox should be closed
            sourcesOutersWrapper.simulate('mouseDown', {
                clientX: 333,
                target: element
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
            document.dispatchEvent(mouseMoveEvent);

            document.dispatchEvent(new Event('mouseup'));

            // lightbox should close with fade out
            jest.runTimersToTime(ANIMATION_TIME);
        });
    };
    expect(closeLightboxWhenClickingInOverlay).not.toThrowError();
    // lightbox should be closed
    expect(mountedLightbox.getDOMNode()).toBeNull();
}); 
