import FsLightbox from "../../../src";
import { testUrls } from "../../schemas/testVariables";

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

    /**
     * @return {{getFsLightbox: (function(): FsLightbox)}}
     */
    this.instantiateNewFsLightbox = () => {
        fsLightbox = new FsLightbox(testProps);
        fsLightbox.setState = (newState, callback) => {
            for (let statePropertyName in newState) {
                fsLightbox.state[statePropertyName] = newState[statePropertyName];
            }
            if (callback)
                callback();
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
        fsLightbox.elements.mediaHolder.current = document.createElement('div');
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
        throw new TypeError('You have forgotten to instantiate FsLightbox');
    };
}