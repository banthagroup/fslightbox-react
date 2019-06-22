import { FADE_IN_CLASS_NAME, FADE_OUT_CLASS_NAME, LONG_FADE_IN_CLASS_NAME } from "../../constants/classes-names";
import { SOURCES } from "../../constants/elements";


export function setUpSourceAnimator(
    {
        data: { sourcesCount },
        core: {
            classListManager,
            sourceAnimator: self
        },
        elements: { sources }
    }
) {
    /** @var { DOMTokenList } animatedSourceClassList */
    let animatedSourceClassList;

    /**
     * @param index
     * @return { self }
     */
    self.animateSourceFromIndex = (index) => {
        animatedSourceClassList = sources[index].current.classList;
        return self;
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
        for (let i = 0; i < sourcesCount; i++) {
            classListManager.ifElementFromArrayAtIndexHasClassRemoveIt(
                SOURCES,
                i,
                FADE_OUT_CLASS_NAME
            );
        }
    };
}

