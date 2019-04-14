import React from 'react';
import { mount, shallow } from 'enzyme/build';
import SourcesHoldersWrapper from "../../../../src/components/Sources/SourcesHoldersWrapper";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { IMAGE_TYPE } from "../../../../src/constants/CoreConstants";
import SourceHolder from "../../../../src/components/Sources/SourceHolder";

let fsLightbox = {
    data: {
        totalSlides: 4
    },
    elements: {
        sourcesHoldersWrapper: {
            current: null
        }
    },
    core: {
        slideSwiping: {
            down: jest.fn()
        }
    }
};
let sourcesHoldersWrapper;

describe('attaching element to sourcesWrapper ref from fsLightbox elements object', () => {
    let completeFsLightboxObject;

    beforeAll(() => {
        const fsLightboxMock = new FsLightboxMock();
        completeFsLightboxObject = fsLightboxMock.getFsLightbox();
        // as we are using mount
        // we mock sourcesTypes to not load sources via Xhr, because that would be waste of performance
        completeFsLightboxObject.sourcesData.sourcesTypes = [IMAGE_TYPE, IMAGE_TYPE, IMAGE_TYPE, IMAGE_TYPE];
        sourcesHoldersWrapper = mount(<SourcesHoldersWrapper fsLightbox={ completeFsLightboxObject }/>);
    });

    it('should attach element to ref', () => {
        expect(completeFsLightboxObject.elements.sourcesWrapper.current).toEqual(sourcesHoldersWrapper.getDOMNode());
    });
});

describe('MediaHolder DOM', () => {
    beforeAll(() => {
        sourcesHoldersWrapper = shallow(<SourcesHoldersWrapper fsLightbox={ fsLightbox }/>)
    });

    it('should match snapshot', () => {
        expect(sourcesHoldersWrapper).toMatchSnapshot();
    });
});


describe('calling on mouseDown and touchStart events', () => {
    beforeEach(() => {
        fsLightbox.core.slideSwiping.down.listener = jest.fn();
        sourcesHoldersWrapper = shallow(<SourcesHoldersWrapper fsLightbox={ fsLightbox }/>);
    });

    describe('onMouseDown', () => {
        beforeEach(() => {
            sourcesHoldersWrapper.simulate('mouseDown');
        });

        it('should call down listener', () => {
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });


    describe('onTouchStart', () => {
        beforeEach(() => {
            sourcesHoldersWrapper.simulate('touchStart');
        });

        it('should call down listener', () => {
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });
});

describe('rendering source holders', () => {
    beforeAll(() => {
        sourcesHoldersWrapper = shallow(<SourcesHoldersWrapper fsLightbox={ fsLightbox }/>)
    });

    describe('rendering equivalent to totalSlides number of source holders', () => {
        it('should render 4 source holders', () => {
            expect(sourcesHoldersWrapper.find('SourceHolder').length).toEqual(4);
        });
    });

    describe('SourceHolders (testing correct props and dom)', () => {
        for (let i = 0; i < fsLightbox.data.totalSlides; i++) {
            let sourceHolder;
            beforeAll(() => {
                sourceHolder = sourcesHoldersWrapper.childAt(i);
            });

            it(`should be equal to SourceHolder with key and index equals to iteration number 
                and fsLightbox passed`, () => {
                expect(sourceHolder.equals(
                    <SourceHolder
                        fsLightbox={ fsLightbox }
                        index={ i }
                        key={ i }
                    />
                )).toBeTruthy();
            });
        }
    });
});

