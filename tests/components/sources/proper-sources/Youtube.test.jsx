import React from 'react';
import { mount, shallow } from "enzyme";
import Youtube from "../../../../src/components/sources/proper-sources/Youtube";
import { getYoutubeVideoIdFromUrl } from "../../../../src/helpers/source/getYoutubeVideoIdFromUrl";

const sourceController = {
    setIndex: () => {},
    setSourceWidth: () => {},
    setSourceHeight: () => {},
    normalLoad: () => {},
    initialLoad: () => {}
};
let fsLightbox = {
    data: {
        urls: ['https://www.youtube.com/watch?v=testId'],
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

let youtube;

describe('ref to sources array in fsLightbox object', () => {
    beforeAll(() => {
        youtube = mount(<Youtube
            fsLightbox={ fsLightbox }
            index={ 0 }
        />);
    });

    it('should be equal to image', () => {
        expect(fsLightbox.elements.sources[0].current).toEqual(youtube.getDOMNode());
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
            youtube = mount(<Youtube
                fsLightbox={ fsLightbox }
                index={ 0 }
            />);
        });

        it('should not call normalLoad', () => {
            expect(sourceController.normalLoad).not.toBeCalled();
        });

        it('should call setIndex with 0', () => {
            expect(sourceController.setIndex).toBeCalledWith(0);
        });

        it('should call setSourceWidth with 100', () => {
            expect(sourceController.setSourceWidth).toBeCalledWith(1920);
        });

        it('should call setSourceHeight with 150', () => {
            expect(sourceController.setSourceHeight).toBeCalledWith(1080);
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
            youtube = mount(<Youtube
                fsLightbox={ fsLightbox }
                index={ 0 }
            />);
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
        youtube = shallow(<Youtube fsLightbox={ fsLightbox } index={ 0 }/>);
    });

    describe('src', () => {
        it('should be equal to base embed youtube url + youtube id + js api enables', () => {
            expect(youtube.prop('src')).toBe("https://www.youtube.com/embed/testId?enablejsapi=1");
        });
    });

    describe('static DOM', () => {
        it('should match snapshot', () => {
            expect(youtube).toMatchSnapshot();
        });
    });
});



