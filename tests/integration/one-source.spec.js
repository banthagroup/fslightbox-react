import OneSource from "../__tests-services__/integration/components/OneSource";
import renderComponent from "../__tests-services__/integration/renderComponent";

jest.useFakeTimers();
renderComponent(OneSource);

test('reopening lightbox', () => {
    const toggler = document.getElementById('btn-toggler');

    // opening
    toggler.dispatchEvent(new Event('click'));

    // closing
    toggler.dispatchEvent(new Event('click'));
    jest.runAllTimers();

    // reopening
    toggler.dispatchEvent(new Event('click'));
});
