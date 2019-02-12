import React from 'react';
import { mount } from "enzyme";
import FsLightbox from "../../../src/FsLightbox";
import { testUrls } from "../../schemas/testSchemas";
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../src/constants/CoreConstants";
import { getYoutubeVideoIDFromURL } from "../../../src/utils/SourceType/getYoutubeVideoIDFromURL";

describe('Creating correct sources depending on source type', () => {

    const fsLightbox = mount(<FsLightbox isOpen={ true } urls={ testUrls }/>);
    /**
     * @type { FsLightbox }
     */
    const fsLightboxInstance = fsLightbox.instance();

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
    })
});