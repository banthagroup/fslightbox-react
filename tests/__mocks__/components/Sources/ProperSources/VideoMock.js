import React from 'react';
import { mount } from "enzyme";
import Video from "../../../../../src/components/Sources/ProperSources/Video";
import { testSourceDimensions } from "../../../../schemas/testVariables";

/**
 * @class VideoMock
 * @param { FsLightbox } fsLightbox
 */
export function VideoMock(fsLightbox) {
    let index;
    let onFirstSourceLoad;
    let imageMock

    this.fakeSourceDimensions = () => {
        fsLightbox.sourcesData.sourcesDimensions[0] = testSourceDimensions;
    };

    this.setIndex = (i) => {
        index = i;
    };

    this.setOnFirstSourceLoad = (func) => {
        onFirstSourceLoad = func;
    };

    this.createVideoMock = () => {
        imageMock = mount(<Video
            urls={ fsLightbox.data.urls }
            sourcesData={ fsLightbox.sourcesData }
            sources={ fsLightbox.elements.sources }
            i={ (index) ? index : 0 }
            onFirstSourceLoad={ (onFirstSourceLoad) ? onFirstSourceLoad : jest.fn }
        />);

        return returnObjectWithGetVideoMockFunction();
    };

    const returnObjectWithGetVideoMockFunction = () => {
        return {
            getVideoMock: () => imageMock
        }
    };
}