import BaseOpenedLightbox from "../__tests-services__/components/BaseOpenedLightbox";
import renderComponent from "../__tests-services__/integration/renderComponent";
import AutomaticTypeDetectionLightbox
    from "../__tests-services__/integration/components/AutomaticTypeDetectionLightbox";

test('rendering each type of source', () => {
    renderComponent(BaseOpenedLightbox);

    expect(document.getElementsByTagName('img')).toHaveLength(1);
    expect(document.getElementsByTagName('video')).toHaveLength(1);
    expect(document.getElementsByTagName('iframe')).toHaveLength(0);
    expect(document.getElementsByClassName('fslightbox-invalid-file-wrapper')).toHaveLength(0);
    expect(document.getElementsByTagName('h6')).toHaveLength(1);

    document.getElementsByClassName('fslightbox-slide-btn-container')[1].click();
    expect(document.getElementsByTagName('iframe')).toHaveLength(1);
    expect(document.getElementsByClassName('fslightbox-invalid-file-wrapper')).toHaveLength(0);

    document.getElementsByClassName('fslightbox-slide-btn-container')[1].click();
    expect(document.getElementsByClassName('fslightbox-invalid-file-wrapper')).toHaveLength(1);
});

test('detecting each type of source manually', () => {
    renderComponent(AutomaticTypeDetectionLightbox);
});
