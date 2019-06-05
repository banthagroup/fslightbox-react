import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../constants/responsiveConstants";
import { SourceSizeAdjusterIterator } from "./SourceSizeAdjusterIterator";

export function setUpGlobalResizingController(
    {
        data,
        sourcesData,
        elements: {
            sourcesHoldersWrapper
        },
        injector: {
            injectDependency
        },
        core: {
            stage,
            sourceHoldersTransformer,
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
        sourceHoldersTransformer.transformStageSourceHolders().withoutTimeout();
        transformNegativeAllSourcesWhichAreNotInStage();
    };

    const saveMaxSourcesDimensions = () => {
        (window.innerWidth < SOURCE_DIMENSIONS_BREAK) ?
            sourcesData.maxSourceWidth = window.innerWidth :
            sourcesData.maxSourceWidth = getDecreasedByResponsiveValueDimension(window.innerWidth);
        sourcesData.maxSourceHeight = getDecreasedByResponsiveValueDimension(window.innerHeight);
    };

    const getDecreasedByResponsiveValueDimension = (value) => value - (value * SOURCE_DIMENSIONS_DECREASE_VALUE);

    const adjustSourcesWrapperSize = () => {
        getSourceHoldersWrapperStyle().width = sourcesData.maxSourceWidth + 'px';
        getSourceHoldersWrapperStyle().height = sourcesData.maxSourceHeight + 'px';
    };

    /** @return { CSSStyleDeclaration } */
    const getSourceHoldersWrapperStyle = () => {
        return sourcesHoldersWrapper.current.style;
    };

    const transformNegativeAllSourcesWhichAreNotInStage = () => {
        for (let i = 0; i < data.totalSlides; i++) {
            if (!stage.isSourceInStage(i)) {
                sourceHoldersTransformer.transformSourceHolderAtIndex(i).negative();
            }
        }
    };
}
