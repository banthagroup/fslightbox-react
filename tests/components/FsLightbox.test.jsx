import React from 'react';
import { shallow } from "enzyme";
import FsLightbox from "../../src/FsLightbox";
import { testSources } from "../__tests-stores__/testVariables";
import { createRefsArrayForGivenNumber } from "../../src/helpers/arrays/createRefsArrayForGivenNumber";
import * as setUpCoreObject from "../../src/core/setUpCore";
import * as runLightboxUnmountActionsObject from "../../src/core/main-component/unmounting/runLightboxUnmountActions";
import { Injector } from "../../src/injection/Injector";
import * as runLightboxMountedActionsObject from "../../src/core/main-component/mounting/runLightboxMountedActions";
import * as getInitialCurrentIndexObject from "../../src/core/stage/getInitialCurrentIndex";
import * as getSourcesHoldersTransformersCollectionObject
    from "../../src/core/collections/getSourcesHoldersTransformersCollection";
import SlideButton from "../../src/components/SlideButton";

let fsLightboxWrapper = shallow(<FsLightbox toggler={ false } sources={ testSources }/>, {
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
            previous: undefined,
            current: 950,
            next: undefined
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
        it('should be false', () => {
            expect(fsLightbox.data.isInitialized).toBe(false);
        });
    });

    describe('isSwipingSlides', () => {
        it('should be false', () => {
            expect(fsLightbox.data.isSwipingSlides).toBe(false);
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
                fsLightbox = new FsLightbox({ urls: testSources, toggler: false });
            });

            it('should be equal 1.3', () => {
                expect(fsLightbox.data.slideDistance).toBe(0.3);
            });
        });

        describe('slideDistance prop was given', () => {
            let slideDistance;

            beforeAll(() => {
                slideDistance = 2;
                fsLightbox = new FsLightbox({ slideDistance: 2, urls: testSources, toggler: false });
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
            fsLightbox = new FsLightbox({ urls: testSources, toggler: true })
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
            sourcesHoldersUpdatersCollection: []
        });
    });
});

describe('getters', () => {
    describe('getProps', () => {
        it('should return props', () => {
            expect(fsLightbox.getProps()).toBe(fsLightbox.props);
        });
    });

    describe('getStage', () => {
        it('should return state', () => {
            expect(fsLightbox.getState()).toBe(fsLightbox.state);
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
        let slideButtonPrevious;
        let slideButtonNext;

        describe('sourcesCount === 1', () => {
            beforeAll(() => {
                fsLightboxWrapper = shallow(<FsLightbox toggler={ true } sources={ ['only one'] }/>, {
                    disableLifecycleMethods: true
                });

                slideButtonPrevious = <SlideButton
                    onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToPrevious }
                    name='previous'
                    d='M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z'
                />;

                slideButtonNext = <SlideButton
                    onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToNext }
                    name='next'
                    d='M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z'
                />;
            });

            it('should not have SlideButton child', () => {
                expect(fsLightboxWrapper.find('.fslightbox-container')
                    .children()
                    .find('SlideButton'))
                    .toHaveLength(0);
            });
        });

        describe('totalSlide > 1', () => {
            beforeAll(() => {
                fsLightboxWrapper = shallow(<FsLightbox toggler={ true } sources={ ['first', 'second'] }/>, {
                    disableLifecycleMethods: true
                });

                slideButtonPrevious = <SlideButton
                    onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToPrevious }
                    name='previous'
                    d='M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z'
                />;

                slideButtonNext = <SlideButton
                    onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToNext }
                    name='next'
                    d='M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z'
                />;
            });

            it('should have direct children SlideButtonPrevious', () => {
                expect(fsLightboxWrapper.find('.fslightbox-container')
                    .children()
                    .filter('SlideButton')
                    .at(0)
                    .equals(
                        <SlideButton
                            onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToPrevious }
                            name='previous'
                            d='M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z'
                        />
                    )).toBe(true);
            });

            it('should have direct children SlideButtonNext', () => {
                expect(fsLightboxWrapper.find('.fslightbox-container')
                    .children()
                    .filter('SlideButton')
                    .at(1)
                    .equals(
                        <SlideButton
                            onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToNext }
                            name='next'
                            d='M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z'
                        />
                    )
                ).toBe(true);
            });
        });
    });
});






