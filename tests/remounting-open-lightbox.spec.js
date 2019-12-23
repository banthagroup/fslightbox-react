import { renderComponentToDOM } from "./__tests-services__/renderComponentToDOM";
import TestLightboxForRemounting from "./__tests-services__/test-lightbox/TestLightboxForRemounting";

renderComponentToDOM(TestLightboxForRemounting);

test('remounting open lightbox', () => {
    // remounting open lightbox
    jest.useFakeTimers();
    document.getElementById('btn-toggle').click();
    document.getElementById('btn-remount').click();
    jest.runAllTimers();

    // testing if listeners are removed
    window.dispatchEvent(new Event('resize'));

    // opening lightbox after close caused by remount
    document.getElementById('btn-toggle').click();
});
