import { SourceStyler } from "./SourceStyler";
import { OPACITY_1_CLASS_NAME } from "../../constants/classes-names";

export function SourceLoadActioner(
    {
        componentsStates: { isSourceLoadedCollection },
        collections: { sourcesStylers },
        data: { initialAnimation },
        elements: { sourcesOuters, sources },
        injector: { resolve }
    }, i, defaultWidth, defaultHeight
) {
    this.runNormalLoadActions = () => {
        sources[i].current.classList.add(OPACITY_1_CLASS_NAME);
        sourcesOuters[i].current.classList.add(initialAnimation);
        isSourceLoadedCollection[i].set(true);
    };

    this.runInitialLoadActions = () => {
        this.runNormalLoadActions();
        const sourceStyler = resolve(SourceStyler, [i, defaultWidth, defaultHeight]);
        sourceStyler.styleSize();
        sourcesStylers[i] = sourceStyler;
    };
}
