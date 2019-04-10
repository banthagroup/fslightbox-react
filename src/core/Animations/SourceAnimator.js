import {
    FADE_IN_CLASS_NAME,
    LONG_FADE_IN_CLASS_NAME,
    FADE_OUT_CLASS_NAME
} from "../../constants/CssConstants";
import { getClassListOfElementInArrayByIndex } from "../../utils/Source/getClassListOfElementInArrayByIndex";

/**
 * @class
 * @param { FsLightbox.elements.sources | Array } sources
 */
export function SourceAnimator({ elements: { sources } }) {
    /** @var { DOMTokenList } animatedSourceClassList */
    let animatedSourceClassList;

    /**
     * @param index
     * @return { this }
     */
    this.animateSourceFromIndex = (index) => {
        setClassListForSourceByIndex(index);
        return this;
    };

    /**
     * @param slideNumber
     * @return { this }
     */
    this.animateSourceFromSlide = (slideNumber) => {
        setClassListForSourceByIndex(slideNumber - 1);
        return this;
    };

    const setClassListForSourceByIndex = (index) => {
        animatedSourceClassList = getClassListOfElementInArrayByIndex(sources, index);
    };

    this.fadeOut = () => {
        animatedSourceClassList.add(FADE_OUT_CLASS_NAME);
    };

    this.fadeIn = () => {
        animatedSourceClassList.add(FADE_IN_CLASS_NAME);
    };

    this.longFadeIn = () => {
        animatedSourceClassList.add(LONG_FADE_IN_CLASS_NAME);
    };

    this.removeFadeOut = () => {
        animatedSourceClassList.remove(FADE_OUT_CLASS_NAME);
    };

    this.removeFadeIn = () => {
        if (animatedSourceClassList.contains(FADE_IN_CLASS_NAME))
            animatedSourceClassList.remove(FADE_IN_CLASS_NAME);
        if (animatedSourceClassList.contains(LONG_FADE_IN_CLASS_NAME))
            animatedSourceClassList.remove(LONG_FADE_IN_CLASS_NAME);
    };

    this.removeFadeOutFromAllSources = () => {
        for (let i = 0; i < sources.length; i++) {
            const sourceClassList = getClassListOfElementInArrayByIndex(sources, i);
            if (sourceClassList.contains(FADE_OUT_CLASS_NAME)) {
                sourceClassList.remove(FADE_OUT_CLASS_NAME);
            }
        }
    };
}

