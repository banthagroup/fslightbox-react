import { Simulate } from 'react-dom/test-utils';
import renderComponent from "../__tests-services__/integration/renderComponent";
import UpdatingProps from "../__tests-services__/integration/components/UpdatingProps";

renderComponent(UpdatingProps);

describe('slide change', () => {
    test('lightbox opened', () => {
        Simulate.click(document.getElementById('UpdatingSlidePropLightboxOpened'));

        Simulate.click(document.getElementById('btn-update-slide'));
        expect(getSlideNumber()).toBe(3);
    });

    test('lightbox closed', () => {
        Simulate.click(document.getElementById('UpdatingSlidePropLightboxClosed'));

        Simulate.click(document.getElementById('btn-update-slide'));
        Simulate.click(document.getElementById('btn-toggler'));
        expect(getSlideNumber()).toBe(3);
    });
});

describe('toggler change', () => {
    test('slide prop is different than stage index', () => {
        Simulate.click(document.getElementById('UpdatingTogglerSlidePropDifferentThanStageIndex'));

        Simulate.click(document.getElementById('btn-change-slide-via-keyboard'));
        Simulate.click(document.getElementById('btn-close-lightbox'));
        Simulate.click(document.getElementById('btn-toggler'));
        expect(getSlideNumber()).toBe(2);
    });
});

test('slide and toggler change', () => {
    Simulate.click(document.getElementById('UpdatingSlideAndTogglerProps'));

    Simulate.click(document.getElementById('btn-update-slide-and-toggler'));
    expect(getSlideNumber()).toBe(3);
});

function getSlideNumber() {
    return parseInt(document.querySelector('[data-test-id="slide-number"]').innerHTML);
}
