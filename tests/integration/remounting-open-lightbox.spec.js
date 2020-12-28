import Remounting from "../__tests-services__/integration/components/Remounting";
import renderComponent from "../__tests-services__/integration/renderComponent";

renderComponent(Remounting);

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
    expect(document.getElementsByClassName('fslightbox-container')).toHaveLength(1);
});
