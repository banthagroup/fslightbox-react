import { FSLIGHTBOX_STYLES_ID } from "../../constants/dom-constants";
import { createAndAppendStyles } from "./createAndAppendStyles";

export function injectStylesIfNotInDom() {
    if (!document.getElementById(FSLIGHTBOX_STYLES_ID)) {
        createAndAppendStyles();
    }
}
