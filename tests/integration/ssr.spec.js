import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FsLightbox from "../../src/FsLightbox";
import { testSources } from "../__tests-services__/testVars";

// simulating server behaviour - deleting window and document
delete global.window;
delete global.document;

it('should not throw error when lightbox is closed on init', () => {
    expect(() => {
        ReactDOMServer.renderToString(<FsLightbox toggler={false} openOnMount={false} sources={testSources} />)
    }).not.toThrowError();
});

it('should not throw error when lightbox is open on init', () => {
    expect(() => {
        ReactDOMServer.renderToString(<FsLightbox toggler={false} openOnMount={true} sources={testSources} />)
    }).not.toThrowError();
});
