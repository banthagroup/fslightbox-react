import React from 'react';
import { mount } from "enzyme";
import { testSourceDimensions, testUrls } from "../../schemas/testVariables";
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../src/constants/CoreConstants";
import { getYoutubeVideoIDFromURL } from "../../../src/utils/SourceType/getYoutubeVideoIDFromURL";
import Image from "../../../src/components/sources/properSources/Image";
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";
import Video from "../../../src/components/sources/properSources/Video";
import Source from "../../../src/components/sources/Source";
import { getMountedImageForFsLightboxInstance } from "../../__mocks__/helpers/getMountedImageForFsLightboxInstance";


describe('Source', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.getInstance();
    fsLightboxInstance.sourceDimensions[0] = testSourceDimensions;
    getMountedImageForFsLightboxInstance(fsLightboxInstance);

    /**
     * @type {Source}
     */
    let sourceInstance;
    let source;
    beforeEach(() => {
        source = mount(<Source
            _={ fsLightboxInstance }
            i={ 0 }
        />);
        sourceInstance = source.instance()
        ;
        sourceInstance.onSourceLoad = jest.fn();
    });

    it('should call onSourceLoad', () => {
        sourceInstance.onFirstSourceLoad();
        expect(sourceInstance.onSourceLoad).toBeCalled();
    });

    it('should set isSourceAlreadyLoaded to true', () => {
        fsLightboxInstance.sourceComponentsCreators[0].createSourceSizeAdjuster = jest.fn();
        sourceInstance.onFirstSourceLoad();
        expect(fsLightboxInstance.isSourceAlreadyLoaded[0]).toBeTruthy();
    });

    it('should call createSourceSizeAdjuster', () => {
        fsLightboxInstance.sourceComponentsCreators[0].createSourceSizeAdjuster = jest.fn();
        sourceInstance.onFirstSourceLoad();
        expect(fsLightboxInstance.sourceComponentsCreators[0].createSourceSizeAdjuster).toBeCalled();
    });

    it('should call onSourceLoad on componentDidMount after source was previously loaded', () => {
        fsLightboxInstance.sourceComponentsCreators[0].createSourceSizeAdjuster = jest.fn();
        sourceInstance.onFirstSourceLoad();
        expect(sourceInstance.onSourceLoad).toBeCalledTimes(1);
        sourceInstance.componentDidMount();
        expect(sourceInstance.onSourceLoad).toBeCalledTimes(2);
    });
});



describe('Creating correct sources depending on source type', () => {
    const mock = new FsLightboxMock();
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();
    getMountedImageForFsLightboxInstance(fsLightboxInstance);

    describe('Image', () => {
        const source = fsLightbox.find('Source').at(0);
        fsLightboxInstance.sourcesTypes[0] = IMAGE_TYPE;
        /**
         * @type { Source }
         */
        const sourceInstance = source.instance();
        sourceInstance.createSource();

        it('should create Image component and assign it to sources array', () => {
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
        fsLightboxInstance.sourcesTypes[1] = VIDEO_TYPE;
        /**
         * @type { Source }
         */
        const sourceInstance = source.instance();
        sourceInstance.createSource();

        it('should create Video component and assign it to sources array', () => {
            const imgChild = mount(fsLightboxInstance.elements.sourcesJSXComponents[1]);
            expect(fsLightboxInstance.elements.sources[1].current).toEqual(imgChild.find('video').instance());
        });

        it('should assign correct attributes to video', () => {
            const video = fsLightboxInstance.elements.sources[1].current;
            expect(video.firstChild.src).toEqual(testUrls[1]);
            expect(video.controls).toBeTruthy();
            expect(video.classList.contains('fslightbox-video')).toBeTruthy();
        });
    });


    describe('YouTube', () => {
        const source = fsLightbox.find('Source').at(2);
        fsLightboxInstance.sourcesTypes[2] = YOUTUBE_TYPE;
        /**
         * @type { Source }
         */
        const sourceInstance = source.instance();
        sourceInstance.createSource();

        it('should create Youtube component and assign it to sources array', () => {
            const youtube = mount(fsLightboxInstance.elements.sourcesJSXComponents[2]);
            expect(fsLightboxInstance.elements.sources[2].current).toEqual(youtube.find('iframe').instance());
        });

        it('should assign correct attributes to Youtube iframe', () => {
            const youtube = fsLightboxInstance.elements.sources[2].current;
            expect(youtube.src).toEqual(
                "https://www.youtube.com/embed/" +
                getYoutubeVideoIDFromURL(fsLightboxInstance.urls[2]) +
                '?enablejsapi=1'
            );
            expect(youtube.frameBorder).toEqual("0");
        });
    });


    describe('Invalid', () => {
        const source = fsLightbox.find('Source').at(3);
        fsLightboxInstance.sourcesTypes[3] = INVALID_TYPE;
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

