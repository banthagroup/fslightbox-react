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
            fsLightbox={ fsLightbox }
            i={ (index) ? index : 0 }
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