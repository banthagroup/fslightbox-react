import { SourceHolderTransformer } from "../transforms/SourceHolderTransformer";

export function getSourcesHoldersTransformersCollection(
    {
        elements: {
            sourcesOuters
        },
        injector: {
            resolve
        }
    }
) {
    const collection = [];
    for (let i = 0; i < sourcesOuters.length; i++) {
        const sourceHolderTransformer = resolve(SourceHolderTransformer);
        sourceHolderTransformer.setSourceHolder(sourcesOuters[i]);
        collection.push(sourceHolderTransformer);
    }
    return collection;
}
