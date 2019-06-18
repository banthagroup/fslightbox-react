import React from 'react';
import { mount, shallow } from 'enzyme/build';
import SourceHoldersWrapper from "../../../src/components/sources/SourceHoldersWrapper";
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";
import SourceHolder from "../../../src/components/sources/SourceHolder";

let fsLightbox = {
    data: {
        sourcesCount: 4
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

describe('attaching element to sourcesHoldersWrapper ref from fsLightbox elements object', () => {
    let completeFsLightboxObject;

    beforeAll(() => {
        const fsLightboxMock = new FsLightboxMock();
        completeFsLightboxObject = fsLightboxMock.getFsLightbox();
        sourcesHoldersWrapper = mount(<SourceHoldersWrapper fsLightbox={ completeFsLightboxObject }/>);
    });

    it('should attach element to ref', () => {
        expect(completeFsLightboxObject.elements.sourcesHoldersWrapper.current).toEqual(sourcesHoldersWrapper.getDOMNode());
    });
});

describe('SourcesHoldersWrapper DOM', () => {
    beforeAll(() => {
        sourcesHoldersWrapper = shallow(<SourceHoldersWrapper fsLightbox={ fsLightbox }/>)
    });

    it('should match snapshot', () => {
        expect(sourcesHoldersWrapper).toMatchSnapshot();
    });
});


describe('calling on mouseDown and touchStart events', () => {
    beforeEach(() => {
        fsLightbox.core.slideSwiping.down.listener = jest.fn();
        sourcesHoldersWrapper = shallow(<SourceHoldersWrapper fsLightbox={ fsLightbox }/>);
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

describe('rendering sources holders', () => {
    beforeAll(() => {
        sourcesHoldersWrapper = shallow(<SourceHoldersWrapper fsLightbox={ fsLightbox }/>)
    });

    describe('rendering equivalent to sourcesCount number of sources holders', () => {
        it('should render 4 sources holders', () => {
            expect(sourcesHoldersWrapper.find('SourceHolder').length).toEqual(4);
        });
    });

    describe('SourceHolders (testing correct props and dom)', () => {
        for (let i = 0; i < fsLightbox.data.sourcesCount; i++) {
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

