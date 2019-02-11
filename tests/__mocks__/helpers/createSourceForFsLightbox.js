import { VIDEO_TYPE } from "../../../src/constants/CoreConstants";

export const createVideoSourceForFsLightbox = (fsLightbox) => {
    fsLightbox.instance().sourcesTypes[1] = VIDEO_TYPE;
    /**
     * @type {Source}
     */
    const sourceInstance = fsLightbox.find('Source').at(1).instance();
    sourceInstance.createSource();
};