import { SourceSizer } from "./SourceSizer";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../constants/classes-names";

export function SourceLoadActioner(
    {
        componentsServices: { isSourceLoadedCollection },
        collections: { sourceSizers },
        elements: { sourceAnimationWrappers, sources },
        resolve
    }, i, defaultWidth, defaultHeight
) {
    this.runNormalLoadActions = () => {
        sources[i].current.classList.add(OPACITY_1_CLASS_NAME);
        sourceAnimationWrappers[i].current.classList.add(FADE_IN_STRONG_CLASS_NAME);
        isSourceLoadedCollection[i].set(true);
        sourceSizers[i].adjustSize();
    };

    this.runInitialLoadActions = () => {
        sourceSizers[i] = resolve(SourceSizer, [i, defaultWidth, defaultHeight]);
        this.runNormalLoadActions();
    };
}
