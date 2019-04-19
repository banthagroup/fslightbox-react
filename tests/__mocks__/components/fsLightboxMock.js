import FsLightbox from "../../../src";
import { testUrls } from "../../__tests-helpers__/testVariables";

/**
 * @class FsLightboxMock
 */
export function FsLightboxMock() {
    /** @type { FsLightbox } */
    let fsLightbox;
    // by default if setProps not called
    let testProps = {
        isOpen: true,
        urls: testUrls
    };

    this.setProps = (props) => {
        testProps = props;
    };

    /**
     * @return {{getFsLightbox: (function(): FsLightbox)}}
     */
    this.instantiateNewFsLightbox = () => {
        fsLightbox = new FsLightbox(testProps);
        mockStateWithNameAndDefaultValue('slide', 1);
        mockStateWithNameAndDefaultValue('isSwipingSlides', false);
        mockStateWithNameAndDefaultValue('isFullscreenOpen', false);
        fsLightbox.setState = (newState, callback) => {
            for (let statePropertyName in newState) {
                fsLightbox.state[statePropertyName] = newState[statePropertyName];
            }
            if (callback)
                callback();
        };
    };

    const mockStateWithNameAndDefaultValue = (stateName, defaultValue) => {
        fsLightbox.componentsStates[stateName].value = defaultValue;
        fsLightbox.componentsStates[stateName].get = () => fsLightbox.componentsStates[stateName].value;
        fsLightbox.componentsStates[stateName].set = (value) => {
            fsLightbox.componentsStates[stateName].value = value;
        };
    };

    this.setAllSourcesToDivs = () => {
        if (!isInstantiated())
            return throwNotInstantiatedError();
        const sources = fsLightbox.elements.sources;
        for (let i in fsLightbox.elements.sources) {
            sources[i].current = document.createElement('div');
            sources[i].current.setAttribute('key', i);
        }
        return {
            getSourcesArray: () => {
                return sources;
            }
        }
    };

    this.setAllSourceHoldersToDivs = () => {
        if (!isInstantiated()) {
            throwNotInstantiatedError();
        }
        const sourceHolders = fsLightbox.elements.sourceHolders;
        for (let i in sourceHolders) {
            sourceHolders[i].current = document.createElement('div');
            sourceHolders[i].current.setAttribute('key', i);
        }
        return {
            getSourceHoldersArray: () => {
                return sourceHolders;
            }
        }
    };

    this.setMediaHolderToDiv = () => {
        if (!isInstantiated()) {
            throwNotInstantiatedError();
        }
        fsLightbox.elements.sourcesHoldersWrapper.current = document.createElement('div');
    };



    /**
     * @return {FsLightbox|Error}
     */
    this.getFsLightbox = () => {
        if (!isInstantiated())
            this.instantiateNewFsLightbox();
        return fsLightbox;
    };


    const isInstantiated = () => {
        return !!fsLightbox;
    };

    const throwNotInstantiatedError = () => {
        throw new TypeError('You have forgotten to instantiate main-component');
    };
}