import { createAndAppendStyles } from "./createAndAppendStyles";
import { FSLIGHTBOX_STYLES_ID } from "../../constants/dom-constants";
import { styles } from "./styles";

document.head.innerHTML = '';
createAndAppendStyles();
const stylesAppendedToHead = document.head.firstChild;

test('actions', () => {
    expect(stylesAppendedToHead.tagName).toBe('STYLE');
    expect(stylesAppendedToHead.tagName).toBe('STYLE');
    expect(stylesAppendedToHead.innerHTML).toBe(styles);
    expect(stylesAppendedToHead.id).toBe(FSLIGHTBOX_STYLES_ID);
});
