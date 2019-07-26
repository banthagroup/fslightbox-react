import { runLightboxMountedActions } from "./runLightboxMountedActions";
import * as injectStylesIfNotInDomObject from "../../styles/injectStylesIfNotInDom";
import * as getScrollbarWidthObject from "../../scrollbar/getScrollbarWidth";

const fsLightbox = {
    core: { lightboxOpeningActions: { runActions: jest.fn() } },
    data: {},
    props: {}
};

injectStylesIfNotInDomObject.injectStylesIfNotInDom = jest.fn();

test('actions', () => {
    getScrollbarWidthObject.getScrollbarWidth = () => 15;

    runLightboxMountedActions(fsLightbox);

    expect(injectStylesIfNotInDomObject.injectStylesIfNotInDom).toBeCalled();
    expect(fsLightbox.data.scrollbarWidth).toBe(15);
    expect(fsLightbox.core.lightboxOpeningActions.runActions).not.toBeCalled();

    fsLightbox.props.openOnMount = true;
    runLightboxMountedActions(fsLightbox);
    expect(fsLightbox.core.lightboxOpeningActions.runActions).toBeCalled();
});

