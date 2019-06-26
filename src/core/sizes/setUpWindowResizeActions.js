export function setUpWindowResizeActions(
    {
        collections: {
            sourcesHoldersTransformers,
            sourcesSizesAdjusters
        },
        core: {
            windowResizeActions: self
        },
        data,
        stageIndexes
    }
) {
    self.runActions = () => {
        // decreasing max source dimensions for better UX
        (innerWidth < 1000) ?
            data.maxSourceWidth = innerWidth :
            data.maxSourceWidth = 0.9 * innerWidth;
        data.maxSourceHeight = 0.9 * innerHeight;

        for (let i = 0; i < data.sourcesCount; i++) {
            if (i !== stageIndexes.current) {
                sourcesHoldersTransformers[i].negative();
            }
            // if source is Invalid or if lightbox is initialized there are no sourcesSizesAdjusters
            // so we need to check if it exists
            if (sourcesSizesAdjusters[i]) {
                sourcesSizesAdjusters[i].adjustSourceSize();
            }
        }
    };
}
