import React from 'react';
import Invalid from "../../../../../src/Components/Sources/ProperSources/Invalid";
import { mount } from "enzyme";

const fsLightbox =  {
    sourcesData: {
        isSourceAlreadyLoadedArray: []
    },
    elements: {
        sources: [{
            current: {}
        }]
    }
};

const invalid = mount(<Invalid
    fsLightbox={ fsLightbox }
    i={ 0 }
/>);

it('should set isSourcesAlreadyLoadedArray index to true on construct', () => {
    expect(fsLightbox.sourcesData.isSourceAlreadyLoadedArray[0]).toBeTruthy();
});

it('should set Sources ref', () => {
    expect(fsLightbox.elements.sources[0].current).toEqual(
        invalid.find('.fslightbox-invalid-file-wrapper').getDOMNode()
    );
});