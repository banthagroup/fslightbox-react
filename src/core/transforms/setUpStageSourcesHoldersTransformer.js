import { ANIMATION_TIME } from "../../constants/css-constants";

export function setUpStageSourcesHoldersTransformer(fsLightbox) {
    const {
        stageIndexes,
        data: { lastSourceIndex },
        collections: {
            sourcesHoldersTransformers
        },
        core: {
            stageSourcesHoldersTransformer: self
        }
    } = fsLightbox;
    let previousSourceTransformQuery;
    let currentSourceTransformQuery;
    let nextSourceTransformQuery;

    let prepareTransformQueries;
    let transformHoldersWithProperPositioning;

    self.transform = () => {
        prepareTransformQueries();
        return self;
    };

    self.byValue = (value) => {
        previousSourceTransformQuery.byValue(value);
        currentSourceTransformQuery.byValue(value);
        nextSourceTransformQuery.byValue(value);
        return self;
    };

    self.withoutTimeout = () => {
        transformHoldersWithProperPositioning();
    };

    self.withTimeout = () => {
        setTimeout(() => {
            transformHoldersWithProperPositioning();
        }, ANIMATION_TIME - 30);
    };

    // TODO: this cam be better
    // setting up prepareTransformQueries which depends on number of slides
    if (lastSourceIndex === 0) {
        prepareTransformQueries = () => {
            currentSourceTransformQuery = sourcesHoldersTransformers[stageIndexes.current];
        };
        transformHoldersWithProperPositioning = () => {
            currentSourceTransformQuery.zero();
        };
    } else {
        prepareTransformQueries = () => {
            currentSourceTransformQuery = sourcesHoldersTransformers[stageIndexes.current];
            if (typeof stageIndexes.previous !== "undefined")
                previousSourceTransformQuery = sourcesHoldersTransformers[stageIndexes.previous];
            if (typeof stageIndexes.next !== "undefined")
                nextSourceTransformQuery = sourcesHoldersTransformers[stageIndexes.next];
        };
        transformHoldersWithProperPositioning = () => {
            currentSourceTransformQuery.zero();
            if (typeof stageIndexes.previous !== "undefined")
                previousSourceTransformQuery.negative();
            if (typeof stageIndexes.next !== "undefined")
                nextSourceTransformQuery.positive();
        };
    }

    self.isStageSourceHolderAtIndexValidForTransform = (index) => {
        return typeof index !== "undefined" && index !== stageIndexes.current;
    };
}
