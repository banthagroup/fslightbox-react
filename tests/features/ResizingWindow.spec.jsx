import React from 'react';
import { mountedLightbox } from "../__tests-vars__/mountedLightbox";

innerWidth = 1500;
innerHeight = 1000;

it('should resize sources without error', () => {
    const resizeWindow = () => {
        dispatchEvent(new Event('resize'));
    };

    // simulating load on Image which is at index 0 so scaled will be Youtube, which not require load event and
    mountedLightbox.find('Image').simulate('load', {
        target: {
            width: 1000,
            height: 800
        }
    });

    expect(resizeWindow).not.toThrowError();

    expect(mountedLightbox.instance().elements.sources[0].current.style.width).toBe('1000px');
    expect(mountedLightbox.instance().elements.sources[0].current.style.height).toBe('800px');

    expect(mountedLightbox.instance().elements.sources[1].current.style.width).toBe('');
    expect(mountedLightbox.instance().elements.sources[1].current.style.height).toBe('');

    expect(mountedLightbox.instance().elements.sources[2].current.style.width).toBe('1350px');
    expect(mountedLightbox.instance().elements.sources[2].current.style.height).toBe(1350 / (1920 / 1080) + 'px');

    expect(mountedLightbox.instance().elements.sources[3].current.style.width).toBe('');
    expect(mountedLightbox.instance().elements.sources[3].current.style.height).toBe('');
});
