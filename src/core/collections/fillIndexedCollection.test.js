import { SourceMainWrapperTransformer } from "../transforms/SourceMainWrapperTransformer";
import { fillIndexedCollection } from "./fillIndexedCollection";

const fsLightbox = {
    collections: {
        sourceMainWrapperTransformers: []
    },
    props: {
        sources: {
            length: 4
        }
    },
    resolve: (constructor) => {
        if (constructor === SourceMainWrapperTransformer) {
            return 'source-main-wrapper-transformer';
        }
    }
};

it('should work', () => {
    fillIndexedCollection(fsLightbox, 'sourceMainWrapperTransformers', SourceMainWrapperTransformer);
    expect(fsLightbox.collections.sourceMainWrapperTransformers).toEqual([
        'source-main-wrapper-transformer',
        'source-main-wrapper-transformer',
        'source-main-wrapper-transformer',
        'source-main-wrapper-transformer'
    ]);
});

