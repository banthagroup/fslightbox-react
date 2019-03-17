import React from 'react';
import { mount } from "enzyme";
import Image from "../../../src/components/sources/properSources/Image";
import { testSourceDimensions } from "../../schemas/testVariables";

export class ImageMock {
    /**
     * @param _ {FsLightbox}
     */
    constructor(_) {
        this.i = 0;
        this.imageMock = null;
        this.onFirstSourceLoad = jest.fn();
        this._ = _;
    }

    fakeSourceDimensions() {
        this._.sourcesDimensions[0] = testSourceDimensions;
    }

    setIndex(index) {
        this.i = index;
    }

    setOnFirstSourceLoad(onFirstSourceLoad) {
        this.onFirstSourceLoad = onFirstSourceLoad;
    }

    createImageMock() {
        this.imageMock = mount(<Image
            _={ this._ }
            i={ this.i }
            onFirstSourceLoad={ this.onFirstSourceLoad }
        />);
    }

    simulateLoad() {
        this.imageMock.simulate('load');
    }

    getMock() {
        return this.imageMock;
    }
}