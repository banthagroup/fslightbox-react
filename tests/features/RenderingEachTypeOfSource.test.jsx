import React from 'react';
import { mountedLightbox } from "../__tests-vars__/mountedLightbox";

it('should render each type of source without error', () => {
    expect(mountedLightbox.find('Image')).toHaveLength(1);
    expect(mountedLightbox.find('Video')).toHaveLength(1);
    expect(mountedLightbox.find('Youtube')).toHaveLength(1);
    expect(mountedLightbox.find('Invalid')).toHaveLength(1);
});
