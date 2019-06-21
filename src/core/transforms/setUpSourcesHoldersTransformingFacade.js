export function setUpSourcesHoldersTransformingFacade(
    {
        stageIndexes,
        data: { lastSourceIndex },
        collections: {
            sourcesHoldersTransformers
        },
        core: {
            sourcesHoldersTransformingFacade: self
        }
    }
) {
    let previousSourceTransformQuery;
    let currentSourceTransformQuery;
    let nextSourceTransformQuery;

    let additionalPrepareActions = () => {};
    let additionalTransformActions = () => {};

    self.transform = () => {
        prepareTransformQueries();
        return {};
    };

    self.transformByValue = (value) => {
        prepareTransformQueries();
        previousSourceTransformQuery.byValue(value);
        currentSourceTransformQuery.byValue(value);
        nextSourceTransformQuery.byValue(value);
        transformHoldersWithProperPositioning();
    };

    const prepareTransformQueries = () => {
        currentSourceTransformQuery = sourcesHoldersTransformers[stageIndexes.current];
        additionalPrepareActions();
    };

    const transformHoldersWithProperPositioning = () => {
        currentSourceTransformQuery.zero();
        additionalTransformActions();
    };

    if (lastSourceIndex === 1) {
        if (typeof stageIndexes.previous !== "undefined") {
            additionalPrepareActions = () => {
                previousSourceTransformQuery = sourcesHoldersTransformers[stageIndexes.previous];
            };
            additionalTransformActions = () => {
                previousSourceTransformQuery.negative();
            };
        } else {
            additionalPrepareActions = () => {
                nextSourceTransformQuery = sourcesHoldersTransformers[stageIndexes.next];
            };
            additionalTransformActions = () => {
                nextSourceTransformQuery.positive();
            };
        }
    } else if (lastSourceIndex > 1) {
        additionalPrepareActions = () => {
            previousSourceTransformQuery = sourcesHoldersTransformers[stageIndexes.previous];
            nextSourceTransformQuery = sourcesHoldersTransformers[stageIndexes.next];
        };
        additionalTransformActions = () => {
            previousSourceTransformQuery.negative();
            nextSourceTransformQuery.positive();
        };
    }
}
