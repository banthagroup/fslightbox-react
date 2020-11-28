import { SourceMainWrapperTransformer } from "../transforms/SourceMainWrapperTransformer";

export function fillSourceMainWrapperTransformersCollection(
    {
        collections: { sourceMainWrapperTransformers },
        props: { sources },
        resolve
    }
) {
    for (let i = 0; i < sources.length; i++) {
        sourceMainWrapperTransformers[i] = resolve(SourceMainWrapperTransformer, [i]);
    }
}
