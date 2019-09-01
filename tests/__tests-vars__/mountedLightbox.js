import React from 'react';
import { mount } from "enzyme";
import FsLightbox from "../../src/FsLightbox";
import { testSources, testTypes } from "./testVariables";

export const onInit = jest.fn();
export const onOpen = jest.fn();
export const onClose = jest.fn();
export const onShow = jest.fn();

export const mountedLightbox = mount(<FsLightbox
    openOnMount={ true }
    toggler={ false }
    sources={ testSources }
    customSources={ [undefined, undefined, undefined, undefined, <h1 className="custom-source">Custom source</h1>] }
    customSourcesGlobalMaxDimensions={ { width: 1000, height: 500 } }
    customSourcesMaxDimensions={ [undefined, undefined, undefined, undefined, { width: 2000, height: 1000 }] }
    types={ testTypes }
    onOpen={ onOpen }
    onClose={ onClose }
    onInit={ onInit }
    onShow={ onShow }
/>);
