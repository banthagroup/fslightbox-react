export function fillIndexedCollection(fsLightbox, collectionName, constructor) {
    for (let i = 0; i < fsLightbox.props.sources.length; i++) {
        fsLightbox.collections[collectionName][i] = fsLightbox.resolve(constructor, [i]);
    }
}