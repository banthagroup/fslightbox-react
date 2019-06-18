import { SourceHolderTransformer } from "../transforms/SourceHolderTransformer";

export function getSourcesHoldersTransformersCollection(
    {
        elements: {
            sourcesHolders
        },
        injector: {
            injectDependency
        }
    }
) {
    const collection = [];
    for (let i = 0; i < sourcesHolders.length; i++) {
        const sourceHolderTransformer = injectDependency(SourceHolderTransformer);
        sourceHolderTransformer.setSourceHolder(sourcesHolders[i]);
        collection.push(sourceHolderTransformer);
    }
    return collection;
}
