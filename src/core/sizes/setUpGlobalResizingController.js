import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../constants/responsiveConstants";
import { SourceSizeAdjusterIterator } from "./SourceSizeAdjusterIterator";

export function setUpGlobalResizingController(
    {
        data: { sourcesCount },
        data,
        elements: {
            sourcesHoldersWrapper
        },
        collections: {
            sourcesHoldersTransformers
        },
        injector: {
            injectDependency
        },
        core: {
            stageManager,
            stageSourcesHoldersTransformer,
            globalResizingController: self
        }
    }
) {
    const {
        adjustAllSourcesSizes
    } = injectDependency(SourceSizeAdjusterIterator);

    self.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize = () => {
        saveMaxSourcesDimensions();
        adjustSourcesWrapperSize();
    };

    self.runAllResizingActions = () => {
        self.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize();
        adjustAllSourcesSizes();
        stageSourcesHoldersTransformer.transform().withoutTimeout();
        transformNegativeAllSourcesWhichAreNotInStage();
    };

    const saveMaxSourcesDimensions = () => {
        (window.innerWidth < SOURCE_DIMENSIONS_BREAK) ?
            data.maxSourceWidth = window.innerWidth :
            data.maxSourceWidth = getDecreasedByResponsiveValueDimension(window.innerWidth);
        data.maxSourceHeight = getDecreasedByResponsiveValueDimension(window.innerHeight);
    };

    const getDecreasedByResponsiveValueDimension = (value) => value - (value * SOURCE_DIMENSIONS_DECREASE_VALUE);

    const adjustSourcesWrapperSize = () => {
        getSourceHoldersWrapperStyle().width = data.maxSourceWidth + 'px';
        getSourceHoldersWrapperStyle().height = data.maxSourceHeight + 'px';
    };

    /** @return { CSSStyleDeclaration } */
    const getSourceHoldersWrapperStyle = () => {
        return sourcesHoldersWrapper.current.style;
    };

    const transformNegativeAllSourcesWhichAreNotInStage = () => {
        for (let i = 0; i < sourcesCount; i++) {
            if (!stageManager.isSourceInStage(i)) {
                sourcesHoldersTransformers[i].negative();
            }
        }
    };
}
