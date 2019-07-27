import { SourceHolderTransformer } from "../transforms/SourceHolderTransformer";

export function getSourcesHoldersTransformersCollection(
    {
        elements: {
            sourcesHolders
        },
        injector: {
            resolve
        }
    }
) {
    const collection = [];
    for (let i = 0; i < sourcesHolders.length; i++) {
        const sourceHolderTransformer = resolve(SourceHolderTransformer);
        sourceHolderTransformer.setSourceHolder(sourcesHolders[i]);
        collection.push(sourceHolderTransformer);
    }
    return collection;
}
