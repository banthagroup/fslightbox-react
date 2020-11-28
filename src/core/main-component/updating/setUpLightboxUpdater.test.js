import { setUpLightboxUpdater } from "./setUpLightboxUpdater";
import { LightboxUpdateActioner } from "./LightboxUpdateActioner";
import * as getLightboxUpdaterConditionerObject
    from "../../../../src/core/main-component/updating/getLightboxUpdaterConditioner";

const fsLightbox = {
    core: { lightboxUpdater: {} },
    props: {
        slide: undefined,
        source: undefined,
        sourceIndex: undefined,
        sources: []
    },
    resolve: (constructorDependency) => {
        if (constructorDependency === LightboxUpdateActioner) {
            return lightboxUpdatingActions;
        }
    }
};
const lightboxUpdatingActions = { runCurrentStageIndexUpdateActionsFor: () => {} };
const lightboxUpdaterConditioner = {
    setPrevProps: () => {},
    setCurrProps: () => {},
    hasTogglerPropChanged: () => {},
    hasSlidePropChanged: () => {},
    hasSourcePropChanged: () => {},
    hasSourceIndexPropChanged: () => {}
};
getLightboxUpdaterConditionerObject.getLightboxUpdaterConditioner = () => lightboxUpdaterConditioner;

let previousProps = {
    slide: undefined,
    source: undefined,
    sourceIndex: undefined
};

const lightboxUpdater = fsLightbox.core.lightboxUpdater;
setUpLightboxUpdater(fsLightbox);

describe('passing props to LightboxUpdaterConditioner', () => {
    beforeAll(() => {
        lightboxUpdaterConditioner.setPrevProps = jest.fn();
        lightboxUpdaterConditioner.setCurrProps = jest.fn();
        previousProps.key = 'previous-props';
        fsLightbox.props.key = 'current-props';
        lightboxUpdater.handleUpdate(previousProps);
    });

    it('should set up right props', () => {
        expect(lightboxUpdaterConditioner.setPrevProps).toBeCalledWith({
            slide: undefined,
            source: undefined,
            sourceIndex: undefined,
            key: 'previous-props'
        });
        expect(lightboxUpdaterConditioner.setCurrProps).toBeCalledWith(fsLightbox.props);
    });
});

describe('handling toggler', () => {
    beforeEach(() => {
        lightboxUpdatingActions.runTogglerUpdateActions = jest.fn();
    });

    it('should not call runTogglerUpdateActions due to toggler prop has changed', () => {
        lightboxUpdaterConditioner.hasTogglerPropChanged = () => false;
        lightboxUpdater.handleUpdate(previousProps);
        expect(lightboxUpdatingActions.runTogglerUpdateActions).not.toBeCalled()
    });

    it('should call runTogglerUpdateActions due to toggler prop has changed', () => {
        lightboxUpdaterConditioner.hasTogglerPropChanged = () => true;
        lightboxUpdater.handleUpdate(previousProps);
        expect(lightboxUpdatingActions.runTogglerUpdateActions).toBeCalled()
    });
});

describe('handling change of props: slide, source, sourceIndex', () => {
    beforeEach(() => {
        lightboxUpdatingActions.runCurrentStageIndexUpdateActionsFor = jest.fn();
    });

    describe('all props has changed', () => {
        beforeEach(() => {
            lightboxUpdaterConditioner.hasSourcePropChanged = () => true;
            lightboxUpdaterConditioner.hasSourceIndexPropChanged = () => true;
            lightboxUpdaterConditioner.hasSlidePropChanged = () => true;

            fsLightbox.props.slide = 10;
            fsLightbox.props.sources[0] = undefined;
            fsLightbox.props.sources[1] = 'current-source';
            fsLightbox.props.source = 'current-source';
            fsLightbox.props.sourceIndex = 5;

            lightboxUpdater.handleUpdate(previousProps);
        });

        it('should run current stage index update actions for source prop change', () => {
            expect(lightboxUpdatingActions.runCurrentStageIndexUpdateActionsFor).toBeCalledWith(1);
        });
    });

    describe('source index prop and source prop has changed', () => {
        beforeEach(() => {
            lightboxUpdaterConditioner.hasSourcePropChanged = () => true;
            lightboxUpdaterConditioner.hasSourceIndexPropChanged = () => true;
            lightboxUpdaterConditioner.hasSlidePropChanged = () => false;

            fsLightbox.props.slide = 20;
            fsLightbox.props.sources[0] = undefined;
            fsLightbox.props.sources[1] = undefined;
            fsLightbox.props.sources[2] = 'current-source';
            fsLightbox.props.source = 'current-source';
            fsLightbox.props.sourceIndex = 10;

            lightboxUpdater.handleUpdate(previousProps);
        });

        it('should run current stage index update actions for source prop change', () => {
            expect(lightboxUpdatingActions.runCurrentStageIndexUpdateActionsFor).toBeCalledWith(2);
        });
    });

    describe('source index prop has changes', () => {
        beforeEach(() => {
            lightboxUpdaterConditioner.hasSlidePropChanged = () => false;
            lightboxUpdaterConditioner.hasSourcePropChanged = () => false;
            lightboxUpdaterConditioner.hasSourceIndexPropChanged = () => true;

            fsLightbox.props.slide = 50;
            fsLightbox.props.sources[0] = 'current-source';
            fsLightbox.props.source = 'current-source';
            fsLightbox.props.sourceIndex = 25;

            lightboxUpdater.handleUpdate(previousProps);
        });

        it('should run current stage index update actions for source index prop change', () => {
            expect(lightboxUpdatingActions.runCurrentStageIndexUpdateActionsFor).toBeCalledWith(25);
        });
    });

    describe('none prop has changed', () => {
        beforeEach(() => {
            lightboxUpdaterConditioner.hasSlidePropChanged = () => false;
            lightboxUpdaterConditioner.hasSourcePropChanged = () => false;
            lightboxUpdaterConditioner.hasSourceIndexPropChanged = () => false;

            lightboxUpdater.handleUpdate(previousProps);
        });

        it('should not run current stage index update actions', () => {
            expect(lightboxUpdatingActions.runCurrentStageIndexUpdateActionsFor).not.toBeCalled();
        });
    });
});
