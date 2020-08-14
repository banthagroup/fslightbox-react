import React from "react";

export const TEST_IMAGE_URL = "https://i.imgur.com/Ys15LQF.jpg";
export const TEST_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
export const TEST_YOUTUBE_URL = "https://www.youtube.com/watch?v=jNQXAC9IVRw";
export const TEST_INVALID_URL = "example-invalid";

export const testSources = [
    TEST_IMAGE_URL,
    TEST_VIDEO_URL,
    TEST_YOUTUBE_URL,
    <h1 className="custom-source" style={{ width: '100px', height: '100px' }}>
        Custom source
    </h1>,
    TEST_INVALID_URL
];
export const testTypes = ['image', 'video', 'youtube', 'custom', 'invalid'];
