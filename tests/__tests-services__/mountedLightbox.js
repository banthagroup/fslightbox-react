import React from 'react';
import { mount } from "enzyme";
import FsLightbox from "../../src/FsLightbox";
import { testSources, testTypes } from "./testVars";

export const onInit = jest.fn();
export const onOpen = jest.fn();
export const onClose = jest.fn();
export const onShow = jest.fn();

export const mountedLightbox = mount(<FsLightbox
    openOnMount={ true }
    toggler={ false }
    sources={ testSources }
    customSources={ [null, null, null,
        <h1 className="custom-source" style={ { width: '100px', height: '100px' } }>Custom source</h1>] }
    types={ testTypes }
    onOpen={ onOpen }
    onClose={ onClose }
    onInit={ onInit }
    onShow={ onShow }
/>);
