import React from 'react';
import { shallow } from "enzyme/build";
import FsLightbox from "./FsLightbox";
import { testSources } from "../tests/__tests-stores__/testVariables";
import *  as createRefsArrayWithLength from "./helpers/arrays/createRefsArrayWithLength";
import * as setUpCoreObject from "./core/setUpCore";
import * as runLightboxUnmountActionsObject from "./core/main-component/unmounting/runLightboxUnmountActions";
import { Injector } from "./injection/Injector";
import * as runLightboxMountedActionsObject from "./core/main-component/mounting/runLightboxMountedActions";
import * as getInitialCurrentIndexObject from "./core/stage/getInitialCurrentIndex";
import * as getSourcesHoldersTransformersCollectionObject
    from "./core/collections/getSourcesHoldersTransformersCollection";
import SlideButton from "./components/SlideButton";

let fsLightboxWrapper = shallow(
    <FsLightbox
        toggler={ false }
        sources={ testSources }
    />,
    { disableLifecycleMethods: true }
);
let fsLightbox = fsLightboxWrapper.instance();

// resetting props to make them extensible
delete fsLightbox.props;
fsLightbox.props = {
    toggler: false,
    sources: testSources
};

describe('data', () => {
    it('should have valid only one possible value properties', () => {
        expect(fsLightbox.data.sourcesCount).toBe(testSources.length);
        expect(fsLightbox.data.isInitialized).toBe(false);
        expect(fsLightbox.data.isSwipingSlides).toBe(false);
        expect(fsLightbox.data.maxSourceWidth).toBe(0);
        expect(fsLightbox.data.maxSourceHeight).toBe(0);
        expect(fsLightbox.data.scrollbarWidth).toBe(0);
    });

    it('should have valid slideDistance property depending on slideDistance prop', () => {
        delete fsLightbox.props.slideDistance;
        fsLightbox.setUpData();
        expect(fsLightbox.data.slideDistance).toBe(0.3);

        fsLightbox.props.slideDistance = 2.5;
        fsLightbox.setUpData();
        expect(fsLightbox.data.slideDistance).toBe(2.5);
    });

    it('should have valid sources property depending on props', () => {
        delete fsLightbox.props.urls;
        fsLightbox.props.sources = 'sources';
        fsLightbox.setUpData();
        expect(fsLightbox.data.sources).toBe('sources');

        delete fsLightbox.props.sources;
        fsLightbox.props.urls = 'urls';
        fsLightbox.setUpData();
        expect(fsLightbox.data.sources).toBe('urls');

        fsLightbox.props.sources = 'sources';
        fsLightbox.props.urls = 'urls';
        fsLightbox.setUpData();
        expect(fsLightbox.data.sources).toBe('sources');
    });
});

test('stageIndexes', () => {
    getInitialCurrentIndexObject.getInitialCurrentIndex = () => 950;
    fsLightbox.setUpStageIndexes();

    expect(fsLightbox.stageIndexes).toEqual({
        previous: undefined,
        current: 950,
        next: undefined
    });
});

test('main component state', () => {
    fsLightbox.props.toggler = false;
    fsLightbox.setUpStates();
    expect(fsLightbox.state.isOpen).toBe(false);

    fsLightbox.props.toggler = true;
    fsLightbox.setUpStates();
    expect(fsLightbox.state.isOpen).toBe(true);
});

test('componentsStates', () => {
    expect(fsLightbox.componentsStates).toEqual({
        slideNumberUpdater: {},
        hasMovedWhileSwiping: {},
        isFullscreenOpen: {},
        sourcesHoldersUpdatersCollection: []
    });
});

test('getters', () => {
    expect(fsLightbox.getProps()).toBe(fsLightbox.props);
    expect(fsLightbox.getState()).toBe(fsLightbox.state);
});

test('setters', () => {
    fsLightbox.setState = jest.fn();
    fsLightbox.setMainComponentState('value', 'callback');
    expect(fsLightbox.setState).toBeCalledWith('value', 'callback');
});


test('elements', () => {
    createRefsArrayWithLength.createRefsArrayWithLength = () => 'refs-array';
    fsLightbox.setUpElements();

    expect(fsLightbox.elements.container).toEqual(React.createRef());
    expect(fsLightbox.elements.sourcesHoldersWrapper).toEqual(React.createRef());
    expect(fsLightbox.elements.sources).toEqual('refs-array');
    expect(fsLightbox.elements.sourcesHolders).toEqual('refs-array');
    expect(fsLightbox.elements.sourcesComponents).toEqual([]);
});

test('collections', () => {
    getSourcesHoldersTransformersCollectionObject.getSourcesHoldersTransformersCollection =
        () => 'test-collection';
    fsLightbox.setUpCollections();

    expect(fsLightbox.collections.sourcesHoldersTransformers).toBe('test-collection');
    expect(fsLightbox.collections.sourcesLoadsHandlers).toEqual([]);
    expect(fsLightbox.collections.sourcesSizesAdjusters).toEqual([]);
    expect(fsLightbox.collections.xhrs).toEqual([]);
});

test('injector', () => {
    expect(fsLightbox.injector).toBeInstanceOf(Injector);
});

test('core', () => {
    setUpCoreObject.setUpCore = jest.fn();
    fsLightbox.setUpCore();
    expect(setUpCoreObject.setUpCore).toBeCalledWith(fsLightbox);
});

test('componentDidUpdate', () => {
    fsLightbox.core.lightboxUpdater.handleUpdate = jest.fn();
    fsLightbox.componentDidUpdate('prev-props');
    expect(fsLightbox.core.lightboxUpdater.handleUpdate).toBeCalledWith('prev-props');
});

test('componentDidMount', () => {
    runLightboxMountedActionsObject.runLightboxMountedActions = jest.fn();
    fsLightbox.componentDidMount();
    expect(runLightboxMountedActionsObject.runLightboxMountedActions).toBeCalled();
});

test('componentWillUnmount', () => {
    runLightboxUnmountActionsObject.runLightboxUnmountActions = jest.fn();
    fsLightbox.componentWillUnmount();
    expect(runLightboxUnmountActionsObject.runLightboxUnmountActions).toBeCalled();
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






