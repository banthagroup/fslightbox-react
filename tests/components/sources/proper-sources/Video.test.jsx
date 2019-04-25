import React from 'react';
import { mount, shallow } from "enzyme";
import Video from "../../../../src/components/sources/proper-sources/Video";

const sourceController = {
    setIndex: () => {},
    setSourceWidth: () => {},
    setSourceHeight: () => {},
    normalLoad: () => {},
    initialLoad: () => {}
};
let fsLightbox = {
    data: {
        urls: [],
    },
    sourcesData: {
        videosPosters: ['asdf'],
        isSourceAlreadyInitializedArray: []
    },
    elements: {
        sources: [{
            current: null
        }]
    },
    core: {
        sourceController: sourceController
    }

};

const onLoadedMetaDataEvent = {
    target: {
        videoWidth: 0,
        videoHeight: 0
    }
};
let video;

describe('ref to sources array in fsLightbox object', () => {
    beforeAll(() => {
        video = mount(<Video
            fsLightbox={ fsLightbox }
            index={ 0 }
        />);
    });

    it('should be equal to image', () => {
        expect(fsLightbox.elements.sources[0].current).toEqual(video.getDOMNode());
    });
});

describe('onload', () => {
    describe('initial load', () => {
        beforeAll(() => {
            sourceController.setIndex = jest.fn();
            sourceController.setSourceHeight = jest.fn();
            sourceController.setSourceWidth = jest.fn();
            sourceController.normalLoad = jest.fn();
            sourceController.initialLoad = jest.fn();
            // source is loaded for first time
            fsLightbox.sourcesData.isSourceAlreadyInitializedArray[0] = false;
            video = shallow(<Video
                fsLightbox={ fsLightbox }
                index={ 0 }
            />);
            onLoadedMetaDataEvent.target.videoWidth = 100;
            onLoadedMetaDataEvent.target.videoHeight = 150;
            video.simulate('loadedmetadata', onLoadedMetaDataEvent);
        });

        it('should not call normalLoad', () => {
            expect(sourceController.normalLoad).not.toBeCalled();
        });

        it('should call setIndex with 0', () => {
            expect(sourceController.setIndex).toBeCalledWith(0);
        });

        it('should call setSourceWidth with 100', () => {
            expect(sourceController.setSourceWidth).toBeCalledWith(100);
        });

        it('should call setSourceHeight with 150', () => {
            expect(sourceController.setSourceHeight).toBeCalledWith(150);
        });

        it('should call initialLoad', () => {
            expect(sourceController.initialLoad).toBeCalled();
        });
    });


    describe('normal load', () => {
        beforeAll(() => {
            sourceController.setIndex = jest.fn();
            sourceController.setSourceHeight = jest.fn();
            sourceController.setSourceWidth = jest.fn();
            sourceController.normalLoad = jest.fn();
            sourceController.initialLoad = jest.fn();
            // source is loaded for first time
            fsLightbox.sourcesData.isSourceAlreadyInitializedArray[0] = true;
            video = shallow(<Video
                fsLightbox={ fsLightbox }
                index={ 0 }
            />);
            video.simulate('loadedmetadata', onLoadedMetaDataEvent);
        });

        it('should not call setSourceWidth', () => {
            expect(sourceController.setSourceWidth).not.toBeCalled();
        });

        it('should not call setSourceHeight', () => {
            expect(sourceController.setSourceHeight).not.toBeCalled();
        });

        it('should not call initialLoad', () => {
            expect(sourceController.initialLoad).not.toBeCalled();
        });

        it('should call setIndex with 0', () => {
            expect(sourceController.setIndex).toBeCalledWith(0);
        });

        it('should call normalLoad', () => {
            expect(sourceController.normalLoad).toBeCalled();
        });
    });
});

describe('Video DOM', () => {
    beforeAll(() => {
        video = shallow(<Video fsLightbox={ fsLightbox } index={ 0 }/>);
    });

    it('should match snapshot', () => {
        expect(video).toMatchSnapshot();
    });
});

