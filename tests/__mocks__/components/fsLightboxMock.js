import { mount } from "enzyme";
import { testUrls } from "../../schemas/testVariables";
import React from "react";
import FsLightbox from "../../../src/FsLightbox.js";

export class FsLightboxMock {
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
     * @return {FsLightbox}
     */
    getInstance() {
        return this.wrapper.instance();
    }
}