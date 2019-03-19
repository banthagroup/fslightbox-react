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

    this.setProps = (props) => {
        testProps = props;
    };

    this.setAllSourcesToDivs = () => {
        for (let source of this.getInstance().elements.sources) {
            source.current = document.createElement('div');
        }
        const sources = this.getInstance().elements.sources;
        return {
            getSourcesArray: () => {
                return sources;
            }
        }
    };

    this.setAllSourceHoldersToDivs = () => {
        for (let sourceHolder of this.getInstance().elements.sourceHolders) {
            sourceHolder.current = document.createElement('div');
        }
        const sourceHolders = this.getInstance().elements.sourceHolders;
        return {
            getSourceHoldersArray: () => {
                return sourceHolders;
            }
        }
    };

    this.getFsLightbox = () => {
        setUpFsLightbox();
        return fsLightbox;
    };

    const setUpFsLightbox = () => {
        fsLightbox = new FsLightbox(testProps);
    };
}