import React from 'react';
import SourceHolder from "../../../src/components/sources/SourceHolder";
import { mount, shallow } from "enzyme";
import SourceLoader from "../../../src/components/loaders/SourceLoader";
import Image from "../../../src/components/sources/proper-sources/Image";

const fsLightbox = {
    componentsStates: {
        shouldSourceHolderBeUpdatedCollection: []
    },
    elements: {
        sourcesComponents: [],
        sourcesHolders: [{
            current: null
        }]
    }
};

let sourceHolder = shallow(<SourceHolder
    fsLightbox={ fsLightbox }
    index={ 0 }
/>);

describe('setting to shouldSourceHolderBeUpdatedStateCollection correct state object', () => {
    it('should have initial value false', () => {
        expect(fsLightbox.componentsStates.shouldSourceHolderBeUpdatedCollection[0].get()).toBe(false);
    });

    describe('setting value to true', () => {
        beforeAll(() => {
            fsLightbox.componentsStates.shouldSourceHolderBeUpdatedCollection[0].set(true);
        });

        it('should be equal true', () => {
            expect(fsLightbox.componentsStates.shouldSourceHolderBeUpdatedCollection[0].get()).toBe(true);
        });
    });
});

describe('sourcesHolders array ref', () => {
    beforeAll(() => {
        sourceHolder = mount(<SourceHolder
            fsLightbox={ fsLightbox }
            index={ 0 }
        />);
    });

    it('should be equal to source holder', () => {
        expect(fsLightbox.elements.sourcesHolders[0].current).toEqual(sourceHolder.getDOMNode());
    });
});

describe('rendering sourceLoader', () => {
    beforeAll(() => {
        fsLightbox.elements.sourcesComponents[0] = null;
        sourceHolder.update();
    });

    it('should have SourceLoader', () => {
        expect(sourceHolder.find('SourceLoader').equals(<SourceLoader/>)).toBe(true);
    });
});

describe('rendering sourceComponent', () => {
    let sourceComponent;

    beforeAll(() => {
        sourceComponent = <Image fsLightbox={ fsLightbox } index={ 0 }/>;
        fsLightbox.elements.sourcesComponents[0] = <Image
            fsLightbox={ fsLightbox }
            index={ 0 }
        />;
        sourceHolder = shallow(<SourceHolder
            fsLightbox={ fsLightbox } index={ 0 }
        />);
    });

    it('should have SourceComponent', () => {
        expect(sourceHolder.find('Image').equals(sourceComponent)).toBe(true);
    });

    it('should not have SourceLoader', () => {
        expect(sourceHolder.contains(<SourceLoader/>)).toEqual(false);
    });
});

describe('SourceHolder DOM', () => {
    beforeAll(() => {
        fsLightbox.elements.sourcesComponents[0] = null;
        sourceHolder = shallow(<SourceHolder
            fsLightbox={ fsLightbox }
            index={ 0 }
        />);
    });

    it('should match snapshot', () => {
        expect(sourceHolder).toMatchSnapshot();
    });
});



