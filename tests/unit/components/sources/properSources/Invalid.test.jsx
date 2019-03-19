import React from 'react';
import { shallow } from "enzyme";
import Invalid from "../../../../../src/components/sources/properSources/Invalid";


it('should set isSourcesAlreadyLoadedArray index to true on construct', () => {
    for (let i = 0; i < 100; i++) {
        const invalid = shallow(<Invalid
            sources={ [] }
            sourcesData={ { isSourceAlreadyLoadedArray: [] } }
            i={ 1 }
        />);
    }
});