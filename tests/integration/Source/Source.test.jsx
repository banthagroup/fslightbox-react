import React from 'react';
import { mount } from "enzyme";
import { testUrls } from "../../schemas/testSchemas";
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../src/constants/CoreConstants";
import { getYoutubeVideoIDFromURL } from "../../../src/utils/SourceType/getYoutubeVideoIDFromURL";
import Loader from "../../../src/components/sources/Loader";
import Source from "../../../src/components/sources/Source";
import Image from "../../../src/components/sources/properSources/Image";
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";
import Video from "../../../src/components/sources/properSources/Video";


describe('Loader', () => {
    const mock = new FsLightboxMock();
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();

    const source = fsLightbox.find('Source').at(0);
    const sourceWrapper = mount(<Source fsLightbox={ fsLightboxInstance } index={ 0 }/>);
    const loader = mount(<Loader/>);
    it('should render loader', () => {
        expect(source.instance().state.isSourceLoaded).toBeFalsy();
        expect(source.find('.fslightbox-loader').instance())
            .toEqual(loader.find('.fslightbox-loader').instance());
    });

    it('should hide loader', () => {
        expect(sourceWrapper.exists('Loader')).toBeTruthy();
        sourceWrapper.instance().onSourceLoad();
        sourceWrapper.update();
        expect(sourceWrapper.exists('Loader')).toBeFalsy();
        expect(sourceWrapper.instance().state.isSourceLoaded).toBeTruthy();
    });
});


describe('Creating correct sources depending on source type', () => {
    const mock = new FsLightboxMock();
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();

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


describe('Actions after proper sources load', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.getInstance();

    describe('Image', () => {
        const image = mount(<Image
            fsLightbox={ fsLightboxInstance }
            index={ 0 }
            onSourceLoad={ jest.fn() }/>);
        const classList = fsLightboxInstance.elements.sources[0].current.classList;
        const mockedEvent = {
            target: {
                width: 1920,
                height: 1080,
                classList: classList
            }
        };
        image.simulate('load', mockedEvent);

        it('should add dimensions to array', () => {
            expect(fsLightboxInstance.sourceDimensions[0]).toEqual({
                width: 1920,
                height: 1080
            });
        });

        it('should add class to image', () => {
            expect(classList.contains('fslightbox-fade-in-class')).toBeTruthy();
        });

        it('should call onSourceLoad method from props', () => {
            expect(image.props().onSourceLoad).toBeCalled();
        });
    });


    describe('Video', () => {
        const video = mount(<Video
            fsLightbox={ fsLightboxInstance }
            index={ 1 }
            onSourceLoad={ jest.fn() }
        />);
        const classList = fsLightboxInstance.elements.sources[1].current.classList;
        const mockedEvent = {
            target: {
                videoWidth: 1366,
                videoHeight: 768,
                classList: classList
            }
        };
        video.simulate('loadedmetadata', mockedEvent);
        it('should add dimensions to array', () => {
            expect(fsLightboxInstance.sourceDimensions[1]).toEqual({
                width: 1366,
                height: 768
            });
        });

        it('should add class to image', () => {
            expect(classList.contains('fslightbox-fade-in-class')).toBeTruthy();
        });

        it('should call onSourceLoad method from props', () => {
            expect(video.props().onSourceLoad).toBeCalled();
        });
    });
});