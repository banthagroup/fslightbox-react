/** @class */
import {
    FADE_IN_CLASS_NAME,
    FADE_IN_COMPLETE_CLASS,
    FADE_OUT_CLASS_NAME
} from "../../constants/CssConstants";

export function SourceAnimator({ elements: { sources: sources } }) {
    let i = null;

    /**
     * @param slideNumber
     * @return { SourceAnimator }
     */
    this.animateSourceFromSlide = (slideNumber) => {
        i = slideNumber - 1;
        return this;
    };

    this.fadeOut = () => {
        getCurrentSourceClassList().add(FADE_OUT_CLASS_NAME);
    };

    this.fadeIn = () => {
        getCurrentSourceClassList().add(FADE_IN_CLASS_NAME);
    };

    this.removeFadeOut = () => {
        getCurrentSourceClassList().remove(FADE_OUT_CLASS_NAME);
    };

    this.removeFadeIn = () => {
        (getCurrentSourceClassList().contains(FADE_IN_CLASS_NAME)) ?
            getCurrentSourceClassList().remove(FADE_IN_CLASS_NAME) :
            getCurrentSourceClassList().remove(FADE_IN_COMPLETE_CLASS);
    };

    const getCurrentSourceClassList = () => {
        return sources[i].current.classList;
    };
}

