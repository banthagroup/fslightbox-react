import { mount } from "enzyme";
import { testUrls } from "../../schemas/testVariables";
import React from "react";
import FsLightbox from "../../../src/FsLightbox.jsx";

export class FsLightboxEnzymeMock {
    constructor() {
        this.wrapper = mount(<FsLightbox isOpen={ true } urls={ testUrls }/>)
    }

    setOpenToFalse() {
        this.wrapper = mount(<FsLightbox isOpen={ false } urls={ testUrls }/>)
    }

    /**
     * @return {ReactWrapper<C["props"], C["state"], React.Component> | ReactWrapper<any, any>}
     */
    getWrapper() {
        return this.wrapper;
    }

    /**
     * @return { FsLightbox }
     */
    getInstance() {
        return this.wrapper.instance();
    }

    setSourcesTypes(sourcesTypesArray) {
        this.getInstance().sourcesData.sourcesTypes = sourcesTypesArray;
    }

    setAllSourcesToDivs() {
        for (let source of this.getInstance().elements.sources) {
            source.current = document.createElement('div');
        }
        const sources = this.getInstance().elements.sources;
        return {
            getSourcesArray: () => {
                return sources;
            }
        }
    }

    setAllSourceHoldersToDivs() {
        for (let sourceHolder of this.getInstance().elements.sourceHolders) {
            sourceHolder.current = document.createElement('div');
        }
        const sourceHolders = this.getInstance().elements.sourceHolders;
        return {
            getSourceHoldersArray: () => {
                return sourceHolders;
            }
        }
    }

}