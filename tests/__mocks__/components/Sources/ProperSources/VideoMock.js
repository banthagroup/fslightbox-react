import React from 'react';
import { mount } from "enzyme";
import Video from "../../../../../src/Components/Sources/ProperSources/Video";
import { testSourceDimensions } from "../../../../schemas/testVariables";

/**
 * @class VideoMock
 * @param { FsLightbox } fsLightbox
 */
export function VideoMock(fsLightbox) {
    let index;
    let onFirstSourceLoad;
    let imageMock;

    this.setIndex = (i) => {
        index = i;
    };

    this.setOnFirstSourceLoad = (func) => {
        onFirstSourceLoad = func;
    };

    this.createVideoMock = () => {
        imageMock = mount(<Video
            fsLightbox={ fsLightbox }
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