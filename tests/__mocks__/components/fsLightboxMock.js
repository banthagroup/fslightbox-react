import FsLightbox from "../../../src";
import { testUrls } from "../../schemas/testVariables";
import { isIfStatement } from "@babel/types";

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
    this.instantiateFsLightbox = () => {
        fsLightbox = new FsLightbox(testProps);
        fsLightbox.setState = (newState, callback) => {
            for (let statePropertyName in newState) {
                fsLightbox.state[statePropertyName] = newState[statePropertyName];
            }
            callback();
        };
        return {
            getFsLightbox: () => this.getFsLightbox(),
        }
    };

    this.setAllSourcesToDivs = () => {
        if (!fsLightbox)
            throw Error('You have forgotten to instantiate FsLightbox');
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
        if (!fsLightbox)
            throw Error('You have forgotten to instantiate FsLightbox');
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

    this.mockSourceHoldersTransformerTransformZero = () => {
        if (!fsLightbox)
            throw Error('You have forgotten to instantiate FsLightbox');
        fsLightbox.core.sourceHoldersTransformer.transformZero = jest.fn();
    };


    this.mockTransformStageSources = () => {
        if (!fsLightbox)
            throw Error('You have forgotten to instantiate FsLightbox');
        fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders = () => ({
            withTimeout: jest.fn(),
            withoutTimeout: jest.fn()
        });
    };

    /**
     * @return {FsLightbox}
     */
    this.getFsLightbox = () => {
        if (!fsLightbox)
            throw Error('You have forgotten to instantiate FsLightbox');
        return fsLightbox;
    };
}