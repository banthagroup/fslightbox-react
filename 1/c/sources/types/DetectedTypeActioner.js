import React from 'react';
import { CUSTOM_TYPE, IMAGE_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../cn/core-constants";
import I from "../../../cm/I.jsx";
import V from "../../../cm/V.jsx";
import Y from "../../../cm/Y.jsx";
import Inv from "../../../cm/Inv.jsx";
import C from "../../../cm/C.jsx";

export function DetectedTypeActioner(fsLightbox) {
    const {
        componentsServices: { isLightboxOpenManager },
        elements: { sourcesComponents },
	sawu
    } = fsLightbox;

    this.runActionsForSourceTypeAndIndex = (type, i) => {
        let BaseSourceComponent;

        switch (type) {
            case IMAGE_TYPE:
                BaseSourceComponent = I;
                break;
            case VIDEO_TYPE:
                BaseSourceComponent = V;
                break;
            case YOUTUBE_TYPE:
                BaseSourceComponent = Y;
                break;
            case CUSTOM_TYPE:
                BaseSourceComponent = C;
                break;
            default:
                BaseSourceComponent = Inv;
                break;
        }

        sourcesComponents[i] = <BaseSourceComponent
            o={fsLightbox}
            i={i}
        />;

        if (isLightboxOpenManager.get()) {
            sawu[i]();
        }
    };
}
