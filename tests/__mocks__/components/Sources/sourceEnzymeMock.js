import React from 'react';
import { mount } from "enzyme";
import Source from "../../../../src/components/Sources/Source";

/**
 * @class SourceEnzymeMock
 * @param { FsLightbox } fsLightbox
 */
export function SourceEnzymeMock(fsLightbox) {
    let wrapper;
    let index;

    this.setIndex = (sourceIndex) => {
        index = sourceIndex
    };

    this.instantiateSource = () => {
        wrapper = mount(<Source
            i={ (index) ? index : 0 }
            collections={ fsLightbox.collections }
            core={ fsLightbox.core }
            data={ fsLightbox.data }
            elements={ fsLightbox.elements }
            slide={ fsLightbox.state.slide }
            sourcesData={ fsLightbox.sourcesData }
        />);
    };

    this.getWrapper = () => {
        if(!wrapper)
            throwInstantiateError();
        return wrapper;
    };

    /**
     * @return {Source | React.Component}
     */
    this.getInstance = () => {
        if (!wrapper)
            throwInstantiateError();
        return wrapper.instance();
    };

    const throwInstantiateError = () => {
        throw new Error('You have forgotten to instantiate source');
    }
}