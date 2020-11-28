import { SourceMainWrapperTransformer } from "../transforms/SourceMainWrapperTransformer";
import { fillSourceMainWrapperTransformersCollection } from "./fillSourceMainWrapperTransformersCollection";

const fsLightbox = {
    collections: { sourceMainWrapperTransformers: [] },
    resolve: (constructorDependency) => {
        if (constructorDependency === SourceMainWrapperTransformer) {
            return 'source-outer-transformer';
        }
    },
    props: { sources: { length: 2 } }
};

it('should return array containing SourceMainWrapperTransformer instances', () => {
    fillSourceMainWrapperTransformersCollection(fsLightbox);

    expect(fsLightbox.collections.sourceMainWrapperTransformers).toEqual(
        ['source-outer-transformer', 'source-outer-transformer']
    );
});
