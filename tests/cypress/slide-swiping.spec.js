import { computeStyle, getComponentChain } from '../__tests-services__/cypress/helpers';

specify('change slide to previous', () => {
    getComponentChain()
        .get('[data-test-id="source-wrappers-container"]')
        .trigger('mousedown', {
            screenX: 200
        })
        .document()
        .trigger('mousemove', {
            screenX: 400
        })
        .trigger('mouseup')
        .get('[data-test-id="slide-number"]')
        .contains(5)
        .then(() => {
            const expectedDistanceBetweenSlides = 800 + 0.3 * 800;
            assertSourceMainWrapperAtIndexShouldHaveTransform(0, `translate(${expectedDistanceBetweenSlides}px, 0px)`);
            assertSourceMainWrapperAtIndexShouldHaveTransform(1, `translate(${-expectedDistanceBetweenSlides}px, 0px)`);
            assertSourceMainWrapperAtIndexShouldHaveTransform(2, `translate(${-expectedDistanceBetweenSlides}px, 0px)`);
            assertSourceMainWrapperAtIndexShouldHaveTransform(3, `translate(${-expectedDistanceBetweenSlides}px, 0px)`);
            assertSourceMainWrapperAtIndexShouldHaveTransform(4, `translate(0px, 0px)`);
        })
});

specify('change slide to next', () => {
    getComponentChain()
        .get('[data-test-id="source-wrappers-container"]')
        .trigger('mousedown', {
            screenX: 400
        })
        .document()
        .trigger('mousemove', {
            screenX: 200
        })
        .trigger('mouseup')
        .get('[data-test-id="slide-number"]')
        .contains(2)
        .then(() => {
            const expectedDistanceBetweenSlides = 800 + 0.3 * 800;
            assertSourceMainWrapperAtIndexShouldHaveTransform(0, `translate(${-expectedDistanceBetweenSlides}px, 0px)`);
            assertSourceMainWrapperAtIndexShouldHaveTransform(1, 'translate(0px, 0px)');
            assertSourceMainWrapperAtIndexShouldHaveTransform(2, `translate(-${expectedDistanceBetweenSlides}px, 0px)`);
            assertSourceMainWrapperAtIndexShouldHaveTransform(3, `translate(-${expectedDistanceBetweenSlides}px, 0px)`);
            assertSourceMainWrapperAtIndexShouldHaveTransform(4, `translate(-${expectedDistanceBetweenSlides}px, 0px)`);
        });
});

function assertSourceMainWrapperAtIndexShouldHaveTransform(index, transform) {
    return cy.get('[data-test-class="source-main-wrapper"]')
        .eq(index)
        .should('have.css', 'transform', computeStyle('transform', transform));
}
