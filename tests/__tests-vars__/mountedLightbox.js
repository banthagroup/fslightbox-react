import React from 'react';
import { mount } from "enzyme";
import FsLightbox from "../../src/FsLightbox";
import {
    TEST_IMAGE_URL,
    TEST_INVALID_URL,
    TEST_VIDEO_URL,
    TEST_YOUTUBE_URL,
    testTypes
} from "./testVariables";

export const onInit = jest.fn();
export const onOpen = jest.fn();
export const onClose = jest.fn();
export const onShow = jest.fn();

export const mountedLightbox = mount(<FsLightbox
    openOnMount={ true }
    toggler={ false }
    sources={ [TEST_IMAGE_URL, TEST_VIDEO_URL, TEST_YOUTUBE_URL, null, TEST_INVALID_URL] }
    customSources={ [null, null, null,
        <h1 className="custom-source" style={ { width: '100px', height: '100px' } }>Custom source</h1>] }
    types={ testTypes }
    onOpen={ onOpen }
    onClose={ onClose }
    onInit={ onInit }
    onShow={ onShow }
/>);
