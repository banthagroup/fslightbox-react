import {
    FADE_IN_CLASS_NAME,
    FADE_IN_COMPLETE_CLASS_NAME,
    FADE_OUT_CLASS_NAME
} from "../../constants/CssConstants";

/**
 * @class
 * @param { FsLightbox.elements.sources | Array } sources
 */
export function SourceAnimator({ elements: { sources } }) {
    /** @var { DOMTokenList } animatedSourceClassList */
    let animatedSourceClassList;

    /**
     * @param slideNumber
     * @return { SourceAnimator }
     */
    this.animateSourceFromSlide = (slideNumber) => {
        animatedSourceClassList = getSourceClassListByIndex(slideNumber - 1);
        return this;
    };

    this.fadeOut = () => {
        animatedSourceClassList.add(FADE_OUT_CLASS_NAME);
    };

    this.fadeIn = () => {
        animatedSourceClassList.add(FADE_IN_CLASS_NAME);
    };

    this.removeFadeOut = () => {
        animatedSourceClassList.remove(FADE_OUT_CLASS_NAME);
    };

    this.removeFadeIn = () => {
        if (animatedSourceClassList.contains(FADE_IN_CLASS_NAME))
            animatedSourceClassList.remove(FADE_IN_CLASS_NAME);
        if (animatedSourceClassList.contains(FADE_IN_COMPLETE_CLASS_NAME))
            animatedSourceClassList.remove(FADE_IN_COMPLETE_CLASS_NAME);
    };

    this.removeFadeOutFromAllSources = () => {
        for (let i = 0; i < sources.length; i++) {
            const sourceClassList = getSourceClassListByIndex(i);
            if (sourceClassList.contains(FADE_OUT_CLASS_NAME)) {
                sourceClassList.remove(FADE_OUT_CLASS_NAME);
            }
        }
    };

    /** @return { DOMTokenList } */
    const getSourceClassListByIndex = (index) => {
        return sources[index].current.classList;
    };
}

