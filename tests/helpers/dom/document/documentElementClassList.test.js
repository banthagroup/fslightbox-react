import { documentElementClassList } from "../../../../src/helpers/dom/document/documentElementClassList";

it('should be equal to document.documentElement.classList', () => {
    expect(documentElementClassList).toEqual(document.documentElement.classList);
});
