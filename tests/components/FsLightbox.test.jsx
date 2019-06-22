import React from 'react';
import { shallow } from "enzyme";
import FsLightbox from "../../src/FsLightbox";
import { testUrls } from "../__tests-helpers__/testVariables";
import { createRefsArrayForGivenNumber } from "../../src/helpers/arrays/createRefsArrayForGivenNumber";
import * as setUpCoreObject from "../../src/core/setUpCore";
import * as runLightboxUnmountActionsObject from "../../src/core/main-component/unmounting/runLightboxUnmountActions";
import { Injector } from "../../src/injection/Injector";
import { EventsDispatcher } from "../../src/core/main-component/EventsDispatcher";
import * as runLightboxMountedActionsObject from "../../src/core/main-component/mounting/runLightboxMountedActions";
import SlideButtonPrevious from "../../src/components/slide-buttons/SlideButtonPrevious";
import SlideButtonNext from "../../src/components/slide-buttons/SlideButtonNext";
import * as getInitialCurrentIndexObject from "../../src/core/stage/getInitialCurrentIndex";
import * as getSourcesHoldersTransformersCollectionObject
    from "../../src/core/collections/getSourcesHoldersTransformersCollection";

let fsLightboxWrapper = shallow(<FsLightbox toggler={ false } sources={ testUrls }/>, {
    disableLifecycleMethods: true
});
let fsLightbox = fsLightboxWrapper.instance();

describe('stageIndexes', () => {
    beforeAll(() => {
        getInitialCurrentIndexObject.getInitialCurrentIndex = () => 950;
        fsLightbox.setUpStageIndexes();
    });

    it('should set up stage indexes object', () => {
        expect(fsLightbox.stageIndexes).toEqual({
            previous: null,
            current: 950,
            next: null
        });
    });
});

describe('data', () => {
    describe('sources', () => {
        describe('sources array is not set', () => {
            beforeAll(() => {
                fsLightboxWrapper.setProps({
                    urls: ['test-url'],
                    sources: undefined
                });
                fsLightbox.setUpData();
            });

            it('should be equal to urls prop', () => {
                expect(fsLightbox.data.sources).toEqual(['test-url']);
            });
        });

        describe('sources prop is set', () => {
            beforeAll(() => {
                fsLightboxWrapper.setProps({
                    urls: ['test-urls-prop'],
                    sources: ['test-sources-prop']
                });
                fsLightbox.setUpData();
            });

            it('should be equal to sources prop', () => {
                expect(fsLightbox.data.sources).toEqual(['test-sources-prop']);
            });
        });
    });

    describe('sourcesCount', () => {
        it('should be equal to sources array length from data', () => {
            expect(fsLightbox.data.sourcesCount).toEqual(fsLightbox.data.sources.length);
        });
    });

    describe('isInitialized', () => {
        it('should be equal to false', () => {
            expect(fsLightbox.data.isInitialized).toBe(false);
        });
    });

    describe('scrollbarWidth', () => {
        it('should be equal to value returned from getScrollbarWidth', () => {
            expect(fsLightbox.data.scrollbarWidth).toBe(0);
        });
    });

    describe('maxSourceWidth', () => {
        it('should be 0', () => {
            expect(fsLightbox.data.maxSourceWidth).toBe(0);
        });
    });

    describe('maxSourceHeight', () => {
        it('should be 0', () => {
            expect(fsLightbox.data.maxSourceHeight).toBe(0);
        });
    });

    describe('slideDistance', () => {
        describe('slideDistance prop was not given', () => {
            beforeAll(() => {
                fsLightbox = new FsLightbox({ urls: testUrls, toggler: false });
            });

            it('should be equal 1.3', () => {
                expect(fsLightbox.data.slideDistance).toBe(0.3);
            });
        });

        describe('slideDistance prop was given', () => {
            let slideDistance;

            beforeAll(() => {
                slideDistance = 2;
                fsLightbox = new FsLightbox({ slideDistance: 2, urls: testUrls, toggler: false });
            });

            it('should be equal 2', () => {
                expect(fsLightbox.data.slideDistance).toBe(2);
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
    it('should be equal to proper object', () => {
        expect(fsLightbox.componentsStates).toEqual({
            slideNumberUpdater: {},
            hasMovedWhileSwiping: {},
            isFullscreenOpen: {},
            shouldSourceHolderBeUpdatedCollection: []
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
            expect(fsLightbox.elements.sources).toEqual(createRefsArrayForGivenNumber(fsLightbox.data.sourcesCount));
        });
    });

    describe('sourcesHolders', () => {
        it('should be equal to array of react refs equivalent to number of slides', () => {
            expect(fsLightbox.elements.sourcesHolders).toEqual(createRefsArrayForGivenNumber(fsLightbox.data.sourcesCount));
        });
    });

    describe('sourcesComponents', () => {
        it('should be equal to empty array', () => {
            expect(fsLightbox.elements.sourcesComponents).toEqual({});
        });
    });
});

describe('collections', () => {
    describe('sourcesHoldersTransformers', () => {
        beforeAll(() => {
            getSourcesHoldersTransformersCollectionObject.getSourcesHoldersTransformersCollection =
                () => 'test-collection';
            fsLightbox.setUpCollections();
        });

        it('should be equal to value returned from getSourcesHoldersTransformersCollection', () => {
            expect(fsLightbox.collections.sourcesHoldersTransformers).toBe('test-collection')
        });
    });

    describe('sourcesSizesAdjusters', () => {
        it('should be equal to empty array', () => {
            expect(fsLightbox.collections.sourcesSizesAdjusters).toEqual([]);
        });
    });

    describe('sourcesSizesAdjusters', () => {
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
    beforeAll(() => {
        runLightboxMountedActionsObject.runLightboxMountedActions = jest.fn();
        fsLightbox.componentDidMount();
    });

    it('should call runLightboxMountedActions', () => {
        expect(runLightboxMountedActionsObject.runLightboxMountedActions).toBeCalled();
    });
});

describe('componentWillUnmount', () => {
    beforeAll(() => {
        runLightboxUnmountActionsObject.runLightboxUnmountActions = jest.fn();
        fsLightbox.componentWillUnmount();
    });

    it('should call runActionsForSourceTypeAndIndex', () => {
        expect(runLightboxUnmountActionsObject.runLightboxUnmountActions).toBeCalled();
    });
});

describe('DOM', () => {
    describe('lightbox is open or not', () => {
        describe('isOpen === false', () => {
            beforeAll(() => {
                fsLightboxWrapper.setState({
                    isOpen: false,
                    sources: ['test-url']
                });
            });

            it('should be null', () => {
                expect(fsLightboxWrapper.equals(null)).toBeTruthy();
            });
        });

        describe('isOpen === true', () => {
            beforeAll(() => {
                fsLightboxWrapper = shallow(<FsLightbox toggler={ true } sources={ ['test-source'] }/>, {
                    disableLifecycleMethods: true
                });
            });

            it('should match snapshot', () => {
                expect(fsLightboxWrapper.debug()).toMatchSnapshot();
            });
        });
    });

    describe('rendering toolbarButtons or not (if there is only 1 slide toolbarButtons should not be rendered)', () => {
        describe('sourcesCount === 1', () => {
            beforeAll(() => {
                fsLightboxWrapper = shallow(<FsLightbox toggler={ true } sources={ ['only one'] }/>, {
                    disableLifecycleMethods: true
                });
            });

            it('should not have SlideButtonPrevious child', () => {
                expect(fsLightboxWrapper.find('.fslightbox-container')
                    .children()
                    .find('SlideButtonPrevious'))
                    .toHaveLength(0);
            });

            it('should not have SlideButtonNext child', () => {
                expect(fsLightboxWrapper.find('.fslightbox-container')
                    .children()
                    .find('SlideButtonNext'))
                    .toHaveLength(0);
            });
        });

        describe('totalSlide > 1', () => {
            beforeAll(() => {
                fsLightboxWrapper = shallow(<FsLightbox toggler={ true } sources={ ['first', 'second'] }/>, {
                    disableLifecycleMethods: true
                });
            });

            it('should have direct children SlideButtonPrevious', () => {
                expect(fsLightboxWrapper.find('.fslightbox-container')
                    .children()
                    .filter('SlideButtonPrevious')
                    .equals(
                        <SlideButtonPrevious fsLightbox={ fsLightboxWrapper.instance() }/>
                    )).toBe(true);
            });

            it('should have direct children SlideButtonNext', () => {
                expect(fsLightboxWrapper.find('.fslightbox-container')
                    .children()
                    .filter('SlideButtonNext')
                    .equals(
                        <SlideButtonNext fsLightbox={ fsLightboxWrapper.instance() }/>
                    )
                ).toBe(true);
            });
        });
    });
});






