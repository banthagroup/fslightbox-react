import React from 'react';
import { mount } from "enzyme";
import { testSourceDimensions, testUrls } from "../../schemas/testVariables";
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../src/constants/CoreConstants";
import { getYoutubeVideoIDFromURL } from "../../../src/utils/SourceType/getYoutubeVideoIDFromURL";
import Image from "../../../src/components/Sources/ProperSources/Image";
import { FsLightboxEnzymeMock } from "../../__mocks__/components/fsLightboxEnzymeMock";
import Video from "../../../src/components/Sources/ProperSources/Video";
import Source from "../../../src/components/Sources/Source";
import { getMountedImageForFsLightboxInstance } from "../../__mocks__/helpers/getMountedImageForFsLightboxInstance";


describe('Source', () => {
    const mock = new FsLightboxEnzymeMock();
    const fsLightboxInstance = mock.getInstance();
    const fsLightboxWrapper = mock.getWrapper();
    fsLightboxInstance.sourcesData.sourcesDimensions[0] = testSourceDimensions;
    getMountedImageForFsLightboxInstance(fsLightboxInstance);

    /** @type {Source} */
    let sourceInstance;
    const source = fsLightboxWrapper.find('Source').at(0);
    sourceInstance = source.instance();
    sourceInstance.sourceWasCreated();
    sourceInstance.onSourceLoad = jest.fn();

    it('should call onSourceLoad on componentDidMount after source was previously loaded', () => {
        sourceInstance.onFirstSourceLoad();
        expect(sourceInstance.onSourceLoad).toBeCalledTimes(1);
        sourceInstance.componentDidMount();
        expect(sourceInstance.onSourceLoad).toBeCalledTimes(2);
    });

    it('should call onSourceLoad', () => {
        sourceInstance.onFirstSourceLoad();
        expect(sourceInstance.onSourceLoad).toBeCalled();
    });

    it('should set isSourceAlreadyLoaded to true', () => {
        sourceInstance.onFirstSourceLoad();
        expect(fsLightboxInstance.sourcesData.isSourceAlreadyLoadedArray[0]).toBeTruthy();
    });
});



describe('Creating correct Sources depending on source type', () => {
    const mock = new FsLightboxEnzymeMock();
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();
    getMountedImageForFsLightboxInstance(fsLightboxInstance);

    describe('Image', () => {
        const source = fsLightbox.find('Source').at(0);
        fsLightboxInstance.sourcesData.sourcesTypes[0] = IMAGE_TYPE;
        /**
         * @type { Source }
         */
        const sourceInstance = source.instance();
        sourceInstance.createSource();

        it('should create Image component and assign it to Sources array', () => {
            const image = mount(fsLightboxInstance.elements.sourcesJSXComponents[0]);
            expect(fsLightboxInstance.elements.sources[0].current).toEqual(image.find('img').instance());
        });

        it('should assign correct attributes to image', () => {
            const image = fsLightboxInstance.elements.sources[0].current;
            expect(image.src).toEqual(testUrls[0]);
            expect(image.alt).toEqual(testUrls[0]);
        });
    });


    describe('Video', () => {
        const source = fsLightbox.find('Source').at(1);
        fsLightboxInstance.sourcesData.videosPosters[1] = "http://example.com/example.jpg";
        fsLightboxInstance.sourcesData.sourcesTypes[1] = VIDEO_TYPE;

        /** @type { Source }*/
        const sourceInstance = source.instance();
        sourceInstance.createSource();

        it('should create Video component and assign it to Sources array', () => {
            const imgChild = mount(fsLightboxInstance.elements.sourcesJSXComponents[1]);
            expect(fsLightboxInstance.elements.sources[1].current).toEqual(imgChild.find('video').instance());
        });

        it('should assign correct attributes to video', () => {
            const video = fsLightboxInstance.elements.sources[1].current;
            expect(video.poster).toEqual(fsLightboxInstance.sourcesData.videosPosters[1]);
            expect(video.firstChild.src).toEqual(testUrls[1]);
            expect(video.controls).toBeTruthy();
            expect(video.classList.contains('fslightbox-video')).toBeTruthy();
        });
    });


    describe('YouTube', () => {
        const source = fsLightbox.find('Source').at(2);
        fsLightboxInstance.sourcesData.sourcesTypes[2] = YOUTUBE_TYPE;
        /** @type { Source } */
        const sourceInstance = source.instance();
        sourceInstance.createSource();

        it('should create Youtube component and assign it to Sources array', () => {
            const youtube = mount(fsLightboxInstance.elements.sourcesJSXComponents[2]);
            expect(fsLightboxInstance.elements.sources[2].current).toEqual(youtube.find('iframe').instance());
        });

        it('should assign correct attributes to Youtube iframe', () => {
            const youtube = fsLightboxInstance.elements.sources[2].current;
            expect(youtube.src).toEqual(
                "https://www.youtube.com/embed/" +
                getYoutubeVideoIDFromURL(fsLightboxInstance.data.urls[2]) +
                '?enablejsapi=1'
            );
            expect(youtube.frameBorder).toEqual("0");
        });
    });


    describe('Invalid', () => {
        const source = fsLightbox.find('Source').at(3);
        fsLightboxInstance.sourcesData.sourcesTypes[3] = INVALID_TYPE;
        /**
         * @type { Source }
         */
        const sourceInstance = source.instance();
        sourceInstance.createSource();

        it('should create Invalid file component', () => {
            const invalid = mount(fsLightboxInstance.elements.sourcesJSXComponents[3]);
            expect(fsLightboxInstance.elements.sources[3].current).toEqual(invalid.find('.fslightbox-invalid-file-wrapper').instance());
        });
    });
});

