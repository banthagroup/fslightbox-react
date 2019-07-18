import React from 'react';
import SourceHolder from "./SourceHolder";
import { mount, shallow } from "enzyme";
import Loader from "../Loader";
import Image from "./proper-sources/Image";

const fsLightbox = {
    componentsStates: {
        sourcesHoldersUpdatersCollection: []
    },
    elements: {
        sourcesComponents: [],
        sourcesHolders: [{
            current: null
        }]
    }
};

const sourcesHoldersUpdatersStateCollection = fsLightbox.componentsStates.sourcesHoldersUpdatersCollection;

let sourceHolder = shallow(<SourceHolder
    fsLightbox={ fsLightbox }
    index={ 0 }
/>);

test('setting to shouldSourceHolderBeUpdatedStateCollection correct state object', () => {
    expect(sourcesHoldersUpdatersStateCollection[0].get()).toBe(false);
    sourcesHoldersUpdatersStateCollection[0].set(true);
    expect(sourcesHoldersUpdatersStateCollection[0].get()).toBe(true);
});

test('sourcesHolders array ref', () => {
    sourceHolder = mount(<SourceHolder
        fsLightbox={ fsLightbox }
        index={ 0 }
    />);
    expect(fsLightbox.elements.sourcesHolders[0].current).toEqual(sourceHolder.getDOMNode());
});

test('rendering sourceLoader', () => {
    fsLightbox.elements.sourcesComponents[0] = null;
    sourceHolder.update();
    expect(sourceHolder.find('Loader').equals(<Loader/>)).toBe(true);
});

test('rendering sourceComponent', () => {
    const sourceComponent = <Image fsLightbox={ fsLightbox } index={ 0 }/>;
    fsLightbox.elements.sourcesComponents[0] = <Image
        fsLightbox={ fsLightbox }
        index={ 0 }
    />;
    sourceHolder = shallow(<SourceHolder
        fsLightbox={ fsLightbox } index={ 0 }
    />);

    expect(sourceHolder.find('Image').equals(sourceComponent)).toBe(true);
    expect(sourceHolder.contains(<Loader/>)).toEqual(false);
});

test('SourceHolder DOM', () => {
    fsLightbox.elements.sourcesComponents[0] = null;
    sourceHolder = shallow(<SourceHolder
        fsLightbox={ fsLightbox }
        index={ 0 }
    />);
    expect(sourceHolder).toMatchSnapshot();
});



