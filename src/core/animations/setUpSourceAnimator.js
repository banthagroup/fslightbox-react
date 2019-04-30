import {
    FADE_IN_CLASS_NAME,
    LONG_FADE_IN_CLASS_NAME,
    FADE_OUT_CLASS_NAME
} from "../../constants/cssConstants";
import { getClassListOfElementInArrayByIndex } from "../../helpers/source/getClassListOfElementInArrayByIndex";

export function setUpSourceAnimator(
    {
        elements: { sources },
        core: {
            sourceAnimator: self
        }
    }
) {
    /** @var { DOMTokenList } animatedSourceClassList */
    let animatedSourceClassList;

    /**
     * @param index
     * @return { self }
     */
    self.animateSourceFromIndex = (index) => {
        setClassListForSourceByIndex(index);
        return self;
    };

    /**
     * @param slideNumber
     * @return { self }
     */
    self.animateSourceFromSlide = (slideNumber) => {
        setClassListForSourceByIndex(slideNumber - 1);
        return self;
    };

    const setClassListForSourceByIndex = (index) => {
        animatedSourceClassList = getClassListOfElementInArrayByIndex(sources, index);
    };

    self.fadeOut = () => {
        animatedSourceClassList.add(FADE_OUT_CLASS_NAME);
    };

    self.fadeIn = () => {
        animatedSourceClassList.add(FADE_IN_CLASS_NAME);
    };

    self.longFadeIn = () => {
        animatedSourceClassList.add(LONG_FADE_IN_CLASS_NAME);
    };

    self.removeFadeOut = () => {
        animatedSourceClassList.remove(FADE_OUT_CLASS_NAME);
    };

    self.removeFadeIn = () => {
        if (animatedSourceClassList.contains(FADE_IN_CLASS_NAME))
            animatedSourceClassList.remove(FADE_IN_CLASS_NAME);
        if (animatedSourceClassList.contains(LONG_FADE_IN_CLASS_NAME))
            animatedSourceClassList.remove(LONG_FADE_IN_CLASS_NAME);
    };

    self.removeFadeOutFromAllSources = () => {
        for (let i = 0; i < sources.length; i++) {
            const sourceClassList = getClassListOfElementInArrayByIndex(sources, i);
            if (sourceClassList.contains(FADE_OUT_CLASS_NAME)) {
                sourceClassList.remove(FADE_OUT_CLASS_NAME);
            }
        }
    };
}

