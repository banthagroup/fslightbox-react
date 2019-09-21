import React from 'react';
import { mount, shallow } from "enzyme";
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
                <h1>First source</h1>
            </div>,
            <div>
                <h1>Second source</h1>
            </div>
        ]
    },
    elements: { sources: [React.createRef(), React.createRef()] },
    collections: { sourcesLoadsHandlers: [{ handleLoad: jest.fn() }, { handleLoad: jest.fn() }] }
};

const custom = mount(<Custom fsLightbox={ fsLightbox } i={ 0 }/>);

test('useEffect', () => {
    expect(fsLightbox.collections.sourcesLoadsHandlers[0].handleLoad).toBeCalled();
});

test('displaying source from customSources prop adding fslightbox-source class and attaching ref', () => {
    expect(custom.children().getElements()).toEqual([
        <div className="example-class fslightbox-source" ref={ fsLightbox.elements.sources[0] }>
            <h1>First source</h1>
        </div>
    ]);
});

test('displaying source without class', () => {
    expect(shallow(<Custom fsLightbox={ fsLightbox } i={ 1 }/>).getElements()).toEqual([
        <div className="fslightbox-source" ref={ fsLightbox.elements.sources[1] }>
            <h1>Second source</h1>
        </div>
    ]);
}); 
