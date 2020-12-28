import React from 'react'
import { CUSTOM_TYPE, IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import Image from "../../../components/sources/proper-sources/Image";
import Video from "../../../components/sources/proper-sources/Video";
import Youtube from "../../../components/sources/proper-sources/Youtube";
import Invalid from "../../../components/sources/proper-sources/Invalid";
import { DetectedTypeActioner } from "./DetectedTypeActioner";
import Custom from "../../../components/sources/proper-sources/Custom";

const fsLightbox = {
    componentsServices: {
        isLightboxOpenManager: { get: () => false },
        updateSourceDirectWrapperCollection: [jest.fn()]
    },
    elements: { sourcesComponents: [] }
};
let expectedSourceLoadHandlerParams;

let detectedTypeActions = new DetectedTypeActioner(fsLightbox);

test('runActionsForSourceTypeAndIndex', () => {
    expectedSourceLoadHandlerParams = [0];
    detectedTypeActions.runActionsForSourceTypeAndIndex(IMAGE_TYPE, 0);
    expect(fsLightbox.elements.sourcesComponents[0]).toEqual(<Image fsLightbox={fsLightbox} i={0} />);
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[0]).not.toBeCalled();

    fsLightbox.componentsServices.isLightboxOpenManager.get = () => true;
    detectedTypeActions = new DetectedTypeActioner(fsLightbox);
    detectedTypeActions.runActionsForSourceTypeAndIndex(VIDEO_TYPE, 0);
    expect(fsLightbox.elements.sourcesComponents[0]).toEqual(<Video fsLightbox={fsLightbox} i={0} />);
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[0]).toBeCalled();

    detectedTypeActions.runActionsForSourceTypeAndIndex(YOUTUBE_TYPE, 0);
    expect(fsLightbox.elements.sourcesComponents[0]).toEqual(<Youtube fsLightbox={fsLightbox} i={0} />);

    detectedTypeActions.runActionsForSourceTypeAndIndex(CUSTOM_TYPE, 0);
    expect(fsLightbox.elements.sourcesComponents[0]).toEqual(<Custom fsLightbox={fsLightbox} i={0} />);

    detectedTypeActions.runActionsForSourceTypeAndIndex(INVALID_TYPE, 0);
    expect(fsLightbox.elements.sourcesComponents[0]).toEqual(<Invalid fsLightbox={fsLightbox} i={0} />);
});
