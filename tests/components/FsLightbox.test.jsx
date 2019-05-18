import React from 'react';
import { shallow } from "enzyme";
import FsLightbox from "../../src/FsLightbox";
import { testUrls } from "../__tests-helpers__/testVariables";
import { createRefsArrayForGivenNumber } from "../../src/helpers/arrays/createRefsArrayForGivenNumber";
import * as setUpCoreObject from "../../src/core/setUpCore";
import { getScrollbarWidth } from "../../src/core/scrollbar/getScrollbarWidth";
import * as runLightboxUnmountActionsObject from "../../src/core/main-component/unmounting/runLightboxUnmountActions";
import { Injector } from "../../src/injection/Injector";
import { EventsDispatcher } from "../../src/core/main-component/EventsDispatcher";

let fsLightboxWrapper = shallow(<FsLightbox toggler={ false } urls={ testUrls }/>, {
    disableLifecycleMethods: true
});
let fsLightbox = fsLightboxWrapper.instance();

describe('data', () => {
    describe('urls', () => {
        it('should be equal to urls', () => {
            expect(fsLightbox.data.urls).toEqual(testUrls);
        });
    });

    describe('totalSlides', () => {
        it('should be equal to urls array length', () => {
            expect(fsLightbox.data.totalSlides).toEqual(testUrls.length);
        });
    });

    describe('isInitialized', () => {
        it('should be equal to false', () => {
            expect(fsLightbox.data.isInitialized).toBe(false);
        });
    });

    describe('slideOnLightboxOpen', () => {
        describe('slide prop is not set', () => {
            beforeAll(() => {
                fsLightboxWrapper.setProps({
                    slide: undefined
                });
                fsLightbox.setUpData();
            });

            it('should be equal to 1', () => {
                expect(fsLightbox.data.slideOnLightboxOpen).toBe(1);
            });
        });

        describe('slide props is set', () => {
            beforeAll(() => {
                fsLightboxWrapper.setProps({
                    slide: 10
                });
                fsLightbox.setUpData();
            });

            it('should be equal to 10', () => {
                expect(fsLightbox.data.slideOnLightboxOpen).toBe(10);
            });
        });
    });

    describe('scrollbarWidth', () => {
        it('should be equal to value returned from getScrollbarWidth', () => {
            expect(fsLightbox.data.scrollbarWidth).toBe(getScrollbarWidth());
        });
    });

    describe('isSwipingSlides', () => {
        it('should be false', () => {
            expect(fsLightbox.data.isSwipingSlides).toBe(false);
        });
    });
});

describe('sourcesData', () => {
    describe('isSourceAlreadyInitializedArray', () => {
        it('should be equal empty array', () => {
            expect(fsLightbox.sourcesData.isSourceAlreadyInitializedArray).toEqual([]);
        });
    });

    describe('videosPosters', () => {
        describe('videosPosters prop was not given', () => {
            beforeAll(() => {
                fsLightbox = new FsLightbox({ urls: testUrls, toggler: false })
            });

            it('should be equal to empty array', () => {
                expect(fsLightbox.sourcesData.videosPosters).toEqual([]);
            });
        });

        describe('videosPosters prop was not given', () => {
            let videosPosters;

            beforeAll(() => {
                videosPosters = ['test'];
                fsLightbox = new FsLightbox({ videosPosters: videosPosters, urls: testUrls, toggler: false })
            });

            it('should be equal', () => {
                expect(fsLightbox.sourcesData.videosPosters).toEqual(videosPosters);
            });
        });
    });

    describe('maxSourceWidth', () => {
        it('should be 0', () => {
            expect(fsLightbox.sourcesData.maxSourceWidth).toBe(0);
        });
    });

    describe('maxSourceHeight', () => {
        it('should be 0', () => {
            expect(fsLightbox.sourcesData.maxSourceHeight).toBe(0);
        });
    });

    describe('slideDistance', () => {
        describe('slideDistance prop was not given', () => {
            beforeAll(() => {
                fsLightbox = new FsLightbox({ urls: testUrls, toggler: false });
            });

            it('should be equal 1.3', () => {
                expect(fsLightbox.sourcesData.slideDistance).toBe(0.3);
            });
        });

        describe('slideDistance prop was given', () => {
            let slideDistance;

            beforeAll(() => {
                slideDistance = 2;
                fsLightbox = new FsLightbox({ slideDistance: 2, urls: testUrls, toggler: false });
            });

            it('should be equal 2', () => {
                expect(fsLightbox.sourcesData.slideDistance).toBe(2);
            });
        });
    });
});

describe('state', () => {
    describe('toggler (it should be same as prop with the same name)', () => {
        beforeAll(() => {
            fsLightbox = new FsLightbox({ urls: testUrls, toggler: true })
        });

        it('should be truthy', () => {
            expect(fsLightbox.state.isOpen).toBeTruthy();
        });
    });
});

describe('componentsStates', () => {
    describe('slide', () => {
        it('should be equal empty object', () => {
            expect(fsLightbox.componentsStates.slide).toEqual({});
        });
    });

    describe('hasMovedWhileSwiping', () => {
        it('should be equal empty object', () => {
            expect(fsLightbox.componentsStates.hasMovedWhileSwiping).toEqual({});
        });
    });

    describe('isFullscreenOpen', () => {
        it('should be equal empty object', () => {
            expect(fsLightbox.componentsStates.isFullscreenOpen).toEqual({});
        });
    });

    describe('shouldSourceHolderBeUpdatedCollection', () => {
        it('should be equal empty array', () => {
            expect(fsLightbox.componentsStates.shouldSourceHolderBeUpdatedCollection).toEqual([]);
        });
    });
});

describe('getters', () => {
    describe('getIsOpen', () => {
        it('should return toggler state', () => {
            expect(fsLightbox.getters.getIsOpen()).toEqual(fsLightbox.state.isOpen);
            fsLightbox.state.toggler = !fsLightbox.state.isOpen;
            expect(fsLightbox.getters.getIsOpen()).toEqual(fsLightbox.state.isOpen);
        });
    });
});

describe('setters', () => {
    describe('setState', () => {
        let stateValue;
        let callback;

        beforeAll(() => {
            stateValue = { isOpen: false };
            callback = () => {};
            fsLightbox.setState = jest.fn();
            fsLightbox.setters.setState(stateValue, callback);
        });

        it('should call setState', () => {
            expect(fsLightbox.setState).toBeCalledWith(stateValue, callback);
        });
    });
});

describe('elements', () => {
    describe('container', () => {
        it('should be equal to react ref', () => {
            expect(fsLightbox.elements.container).toEqual(React.createRef());
        });
    });

    describe('sourcesHoldersWrapper', () => {
        it('should be equal to react ref', () => {
            expect(fsLightbox.elements.sourcesHoldersWrapper).toEqual(React.createRef());
        });
    });

    describe('sources', () => {
        it('should be equal to array of react refs equivalent to number of slides', () => {
            expect(fsLightbox.elements.sources).toEqual(createRefsArrayForGivenNumber(fsLightbox.data.totalSlides));
        });
    });

    describe('sourceHolders', () => {
        it('should be equal to array of react refs equivalent to number of slides', () => {
            expect(fsLightbox.elements.sourceHolders).toEqual(createRefsArrayForGivenNumber(fsLightbox.data.totalSlides));
        });
    });

    describe('sourcesComponents', () => {
        it('should be equal to empty array', () => {
            expect(fsLightbox.elements.sourcesComponents).toEqual([]);
        });
    });
});

describe('collections', () => {
    describe('sourceSizeAdjusters', () => {
        it('should be equal to empty array', () => {
            expect(fsLightbox.collections.sourceSizeAdjusters).toEqual([]);
        });
    });

    describe('sourceSizeAdjusters', () => {
        it('should be equal to empty array', () => {
            expect(fsLightbox.collections.xhrs).toEqual([]);
        });
    })
});

describe('injector', () => {
    it('should be instanceof Injector', () => {
        expect(fsLightbox.injector).toBeInstanceOf(Injector);
    });
});

describe('eventsDispatcher', () => {
    const eventsDispatcher = { key: 'eventsDispatcher' };

    beforeAll(() => {
        fsLightbox.injector.injectDependency = jest.fn(() => eventsDispatcher);
        fsLightbox.setUpEventsDispatcher();
    });

    it('should call injectDependency with EventsDispatcher', () => {
        expect(fsLightbox.injector.injectDependency).toBeCalledWith(EventsDispatcher);
    });

    it('should return eventsDispatcher', () => {
        expect(fsLightbox.eventsDispatcher).toEqual(eventsDispatcher);
    });
});

describe('core', () => {
    beforeAll(() => {
        setUpCoreObject.setUpCore = jest.fn();
        fsLightbox.setUpCore();
    });

    it('should call setUpCore', () => {
        expect(setUpCoreObject.setUpCore).toBeCalledWith(fsLightbox);
    });
});

describe('componentDidUpdate', () => {
    let prevProps = { key: 'prevProps' };

    beforeAll(() => {
        fsLightbox.core.lightboxUpdater.handleUpdate = jest.fn();
        fsLightbox.componentDidUpdate(prevProps);
    });

    it('should call handleUpdate with prevProps', () => {
        expect(fsLightbox.core.lightboxUpdater.handleUpdate).toBeCalledWith(prevProps);
    });
});

describe('componentDidMount', () => {
    describe('running or not opening actions', () => {
        describe('lightbox is closed', () => {
            beforeAll(() => {
                fsLightbox.core.lightboxOpeningActions.runActions = jest.fn();
                fsLightbox.state.isOpen = false;
                fsLightbox.componentDidMount();
            });

            it('should not call runActions', () => {
                expect(fsLightbox.core.lightboxOpeningActions.runActions).not.toBeCalled();
            });
        });

        describe('lightbox is open', () => {
            beforeAll(() => {
                fsLightbox.core.lightboxOpeningActions.runActions = jest.fn();
                fsLightbox.state.isOpen = true;
                fsLightbox.componentDidMount();
            });

            it('should call runActions', () => {
                expect(fsLightbox.core.lightboxOpeningActions.runActions).toBeCalled();
            });
        });
    });
});

describe('componentWillUnmount', () => {
    beforeAll(() => {
        runLightboxUnmountActionsObject.runLightboxUnmountActions = jest.fn();
        fsLightbox.componentWillUnmount();
    });

    it('should call runActions', () => {
        expect(runLightboxUnmountActionsObject.runLightboxUnmountActions).toBeCalled();
    });
});

describe('DOM', () => {
    describe('lightbox is open or not', () => {
        describe('isOpen === false', () => {
            beforeAll(() => {
                fsLightboxWrapper.setState({
                    isOpen: false
                });
            });

            it('should be null', () => {
                expect(fsLightboxWrapper.equals(null)).toBeTruthy();
            });
        });

        describe('isOpen === true', () => {
            beforeAll(() => {
                fsLightboxWrapper.setState({
                    isOpen: true
                });
            });

            it('should match snapshot', () => {
                expect(fsLightboxWrapper.debug()).toMatchSnapshot();
            });
        });
    });

    describe('rendering buttons or not (if there is only 1 slide buttons should not be rendered)', () => {
        describe('totalSlides === 1', () => {
            beforeAll(() => {
                fsLightboxWrapper = shallow(<FsLightbox toggler={ true } urls={ ['only one'] }/>, {
                    disableLifecycleMethods: true
                });
            });

            it('should match snapshot', () => {
                expect(fsLightboxWrapper.debug()).toMatchSnapshot();
            });
        });

        describe('totalSlide > 1', () => {
            beforeAll(() => {
                fsLightboxWrapper = shallow(<FsLightbox toggler={ true } urls={ ['first', 'second'] }/>, {
                    disableLifecycleMethods: true
                });
            });

            it('should match snapshot', () => {
                expect(fsLightboxWrapper.debug()).toMatchSnapshot();
            });
        });
    });
});







