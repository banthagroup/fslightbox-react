export function getMergedSourcesAndCustomSources({ props: { sources, customSources } }) {
    if (customSources) {
        console.warn("FsLightbox: customSources prop is deprecated, use sources prop instead!")
    }

    const mergedSources = sources ? sources.slice() : customSources.slice();

    if (customSources && sources !== customSources) {
        for (let i = 0; i < customSources.length; i++) {
            if (customSources[i]) {
                mergedSources[i] = customSources[i];
            }
        }
    }

    return mergedSources;
}
