import React from 'react';
import { mount, shallow } from 'enzyme';
import MediaHolder from "../../../../src/components/Holders/MediaHolder";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { IMAGE_TYPE } from "../../../../src/constants/CoreConstants";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
// as we are using mount
// we mock sourcesTypes to not load sources via Xhr, because that would be waste of performance
fsLightbox.sourcesData.sourcesTypes = [IMAGE_TYPE, IMAGE_TYPE, IMAGE_TYPE, IMAGE_TYPE];
let mediaHolder;

describe('attaching element to mediaHolder ref from fsLightbox elements object', () => {
    beforeAll(() => {
        mediaHolder = mount(<MediaHolder fsLightbox={ fsLightbox }/>);
    });

    it('should attach element to ref', () => {
        expect(fsLightbox.elements.mediaHolder.current).toEqual(mediaHolder.getDOMNode());
    });
});


describe('MediaHolder DOM', () => {
    beforeAll(() => {
        mediaHolder = shallow(<MediaHolder fsLightbox={ fsLightbox }/>)
    });

    it('should be div', () => {
        expect(mediaHolder.type()).toBe('div');
    });

    it('should have correct className prop', () => {
        expect(mediaHolder.prop('className')).toBe('fslightbox-media-holder');
    });
});


describe('calling on mouseDown and touchStart events', () => {
    beforeEach(() => {
        fsLightbox.core.slideSwiping.down.listener = jest.fn();
        mediaHolder = shallow(<MediaHolder fsLightbox={ fsLightbox }/>);
    });

    describe('onMouseDown', () => {
        beforeEach(() => {
            mediaHolder.simulate('mouseDown');
        });

        it('should call down listener', () => {
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });


    describe('onTouchStart', () => {
        beforeEach(() => {
            mediaHolder.simulate('touchStart');
        });

        it('should call down listener', () => {
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });
});

describe('rendering source holders', () => {
    beforeAll(() => {
        mediaHolder = shallow(<MediaHolder fsLightbox={ fsLightbox }/>)
    });

    describe('rendering equivalent to totalSlides number of source holders', () => {
        it('should render 4 source holders', () => {
            expect(mediaHolder.find('SourceHolder').length).toEqual(4);
        });
    });

    describe('SourceHolders (testing correct props and dom)', () => {
        for (let i = 0; i < fsLightbox.data.totalSlides; i++) {
            let sourceHolder;
            beforeAll(() => {
                sourceHolder = mediaHolder.childAt(i);
            });

            it('it should pass fsLightbox to source holders', () => {
                expect(sourceHolder.prop('fsLightbox')).toEqual(fsLightbox);
            });

            it('should pass index to source holders', () => {
                expect(sourceHolder.prop('index')).toEqual(i);
            });

            it('should have correct key', () => {
                expect(sourceHolder.key()).toEqual(i.toString());
            });

            it('should hot have more children (in this component)', () => {
                expect(sourceHolder.children().length).toBe(0);
            });
        }
    });
});

