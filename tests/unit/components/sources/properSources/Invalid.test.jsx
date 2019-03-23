import React from 'react';
import Invalid from "../../../../../src/components/Sources/ProperSources/Invalid";
import { mount } from "enzyme";

const sourcesData = {
    isSourceAlreadyLoadedArray: []
};
const invalid = mount(<Invalid
    sources={ [
        React.createRef()
    ] }
    sourcesData={ sourcesData }
    i={ 0 }
/>);

it('should set isSourcesAlreadyLoadedArray index to true on construct', () => {
    expect(sourcesData.isSourceAlreadyLoadedArray[0]).toBeTruthy();
});

it('should set Sources ref', () => {
    expect(invalid.props().sources[0].current).toEqual(
        invalid.find('.fslightbox-invalid-file-wrapper').getDOMNode()
    );
});