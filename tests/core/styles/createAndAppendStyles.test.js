import { createAndAppendStyles } from "../../../src/core/styles/createAndAppendStyles";
import { FSLIGHTBOX_STYLES_ID } from "../../../src/constants/dom-constants";
import { styles } from "../../../src/core/styles/styles";

document.head.innerHTML = '';
createAndAppendStyles();
const stylesAppendedToHead = document.head.firstChild;

it('should be styles tag', () => {
    expect(stylesAppendedToHead.tagName).toBe('STYLE');
});

it('should have styles string innerHTML', () => {
    expect(stylesAppendedToHead.innerHTML).toBe(styles);
});

it('should have special id', () => {
    expect(stylesAppendedToHead.id).toBe(FSLIGHTBOX_STYLES_ID);
});
