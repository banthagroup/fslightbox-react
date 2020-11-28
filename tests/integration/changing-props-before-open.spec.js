import { Simulate } from 'react-dom/test-utils';
import ChangingPropsBeforeOpen
    from "../__tests-services__/integration/components/ChangingPropsBeforeOpen";
import renderComponent from "../__tests-services__/integration/renderComponent";

test('changing-slide-before-initialize', () => {
    renderComponent(ChangingPropsBeforeOpen);
    Simulate.click(document.getElementById('btn-update-props'));
    Simulate.click(document.getElementById('btn-toggler'));
    expect(document.querySelector('[data-test-id="slide-number"]').innerHTML).toBe('2');
});