import { FSLIGHTBOX_STYLES_ID } from "../../constants/dom-constants";
import { styles } from "./styles";

export function createAndAppendStyles() {
    const style = document.createElement('style');
    style.id = FSLIGHTBOX_STYLES_ID;
    style.appendChild(document.createTextNode(styles));
    document.head.appendChild(style);
}
