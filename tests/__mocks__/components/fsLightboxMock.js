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
        for (let source of fsLightbox.elements.sources) {
            source.current = document.createElement('div');
        }
        const sources = fsLightbox.elements.sources;
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
        for (let sourceHolder of fsLightbox.elements.sourceHolders) {
            sourceHolder.current = document.createElement('div');
        }
        const sourceHolders = fsLightbox.elements.sourceHolders;
        return {
            getSourceHoldersArray: () => {
                return sourceHolders;
            }
        }
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