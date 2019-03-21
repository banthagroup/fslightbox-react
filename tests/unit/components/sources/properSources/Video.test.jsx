import { testImageURL, testUrls } from "../../../../schemas/testVariables";
import { mount } from "enzyme";
import { createVideoSourceForFsLightbox } from "../../../../__mocks__/helpers/createSourceForFsLightbox";
import React from "react";
import FsLightbox from "../../../../../src";
import { VideoMock } from "../../../../__mocks__/components/sources/properSources/VideoMock";

it('should add poster to video', () => {
    const videosPostersArray = [];
    videosPostersArray[1] = testImageURL;

    const fsLightbox = mount(<FsLightbox
        isOpen={ true }
        urls={ testUrls }
        videosPosters={ videosPostersArray }
    />);

    createVideoSourceForFsLightbox(fsLightbox);
    expect(fsLightbox.instance().elements.sources[1].current.poster).toEqual(videosPostersArray[1]);
});

it('should assign empty string to poster if not given', () => {
    const fsLightbox = mount(<FsLightbox
        isOpen={ true }
        urls={ testUrls }
    />);

    createVideoSourceForFsLightbox(fsLightbox);
    expect(fsLightbox.instance().elements.sources[1].current.poster).toEqual("");
});
