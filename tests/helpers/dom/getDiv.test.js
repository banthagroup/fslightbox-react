import { getDiv } from "../../../src/helpers/dom/getDiv";

it('should return div', () => {
    expect(getDiv()).toEqual(document.createElement('div'));
});