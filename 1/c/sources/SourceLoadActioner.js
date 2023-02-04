import { SourceSizer } from "./SourceSizer";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../cn/classes-names";

export function SourceLoadActioner(
    {
        collections: { sourceSizers },
        elements: { sources },
	isl,
        resolve,
	saw,
	sawu
    }, i
) {
    this.runActions = (defaultWidth, defaultHeight) => {
	isl[i]=true; sawu[i]();
        sources[i].current.classList.add(OPACITY_1_CLASS_NAME);
        saw[i].current.classList.add(FADE_IN_STRONG_CLASS_NAME);

        runNormalLoadActions(defaultWidth, defaultHeight);
        this.runActions = runNormalLoadActions;
    };

    /**
     * Normal load actions without initial actions are triggered only while using srcset.
     */
    function runNormalLoadActions(defaultWidth, defaultHeight) {
        sourceSizers[i] = resolve(SourceSizer, [i, defaultWidth, defaultHeight]);
        sourceSizers[i].adjustSize();
    }
}
