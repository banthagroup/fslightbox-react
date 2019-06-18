import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FsLightbox from "../../src/FsLightbox";
import { testUrls } from "../__tests-helpers__/testVariables";

// simulating server behaviour - deleting window and document
delete global.window;
delete global.document;

it('should not throw error when lightbox is closed on init', () => {
    expect(() => {
        ReactDOMServer.renderToString(<FsLightbox toggler={ false } sources={ testUrls }/>)
    }).not.toThrowError();
});

it('should not throw error when lightbox is open on init', () => {
    expect(() => {
        ReactDOMServer.renderToString(<FsLightbox toggler={ true } sources={ testUrls }/>)
    }).not.toThrowError();
});
