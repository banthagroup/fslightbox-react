import { removeFromElementClassIfContains } from "../../helpers/elements/removeFromElementClassIfContains";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../constants/classes-names";

export function setUpWindowResizeActioner(
    {
        collections: { sourceMainWrapperTransformers, sourceSizers },
        core: { windowResizeActioner: self },
        data,
        elements: { sources, sourceMainWrappers },
        stageIndexes
    }
) {
    self.runActions = () => {
        (innerWidth < 992) ?
            data.maxSourceWidth = innerWidth :
            data.maxSourceWidth = 0.9 * innerWidth;
        data.maxSourceHeight = 0.9 * innerHeight;

        for (let i = 0; i < sources.length; i++) {
            removeFromElementClassIfContains(sourceMainWrappers[i], TRANSFORM_TRANSITION_CLASS_NAME);

            if (i !== stageIndexes.current) {
                sourceMainWrapperTransformers[i].negative();
            }

            /**
             * Invalid type doesn't have SourceSizer so need to check if it exists.
             * Sources are created 'tick' after main elements so after reopening lightbox there might be no source with
             * created SourceSizer so there is also a need for checking if source exists.
             */
            if (sourceSizers[i] && sources[i].current) {
                sourceSizers[i].adjustSize();
            }
        }
    };
}
