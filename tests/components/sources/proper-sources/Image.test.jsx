import React from 'react';
import Image from "../../../../src/components/sources/proper-sources/Image";
import { mount, shallow } from "enzyme";

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

const onLoadEvent = {
    target: {
        width: 0,
        height: 0
    }
};
let image;

describe('ref to sources array in fsLightbox object', () => {
    beforeAll(() => {
        image = mount(<Image
            fsLightbox={ fsLightbox }
            index={ 0 }
        />);
    });

    it('should be equal to image', () => {
        expect(fsLightbox.elements.sources[0].current).toEqual(image.getDOMNode());
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
            image = shallow(<Image
                fsLightbox={ fsLightbox }
                index={ 0 }
            />);
            onLoadEvent.target.width = 100;
            onLoadEvent.target.height = 150;
            image.simulate('load', onLoadEvent);
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
            image = shallow(<Image
                fsLightbox={ fsLightbox }
                index={ 0 }
            />);
            image.simulate('load', onLoadEvent);
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

describe('Image DOM', () => {
    beforeAll(() => {
        image = shallow(<Image fsLightbox={ fsLightbox } index={ 0 }/>);
    });

    it('should match snapshot', () => {
        expect(image).toMatchSnapshot();
    });
});

