import React from 'react';
import { mount } from "enzyme";
import * as getYoutubeVideoIdFromUrlObject from "../../../helpers/source/getYoutubeVideoIdFromUrl";
import Custom from "./Custom";

getYoutubeVideoIdFromUrlObject.getYoutubeVideoIdFromUrl = (source) => {
    if (source === 'source') {
        return 'youtube-id';
    } else {
        throw new Error('Invalid param');
    }
};

const fsLightbox = {
    props: {
        customSources: [
            <div className="example-class">
                <h1>Custom source title</h1>
                <p>Custom source paragraph</p>
            </div>
        ]
    },
    elements: { sources: [React.createRef()] },
    collections: { sourcesLoadsHandlers: [{ handleLoad: jest.fn() }] }
};

const custom = mount(<Custom fsLightbox={ fsLightbox } i={ 0 } />);

test('useEffect', () => {
    expect(fsLightbox.collections.sourcesLoadsHandlers[0].handleLoad).toBeCalled();
});

test('displaying source from customSources prop adding fslightbox-source class and attaching ref', () => {
    expect(custom.children().getElements()).toEqual([
        <div className="example-class fslightbox-source" ref={ fsLightbox.elements.sources[0] }>
            <h1>Custom source title</h1>
            <p>Custom source paragraph</p>
        </div>
    ]);
}); 
