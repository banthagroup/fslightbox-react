import { getClassListOfElementInArrayByIndex } from "../../../src/helpers/source/getClassListOfElementInArrayByIndex";

const classList = {
    key: 2,
};
const elements = [
    {
        current: {
            classList: {
                key: "ima should not be returned"
            }
        }
    },
    {
        current: {
            classList: classList
        }
    },
];

describe('getting class list of element in given elements array by index', () => {
    it('should be equal to test class list 2', () => {
        expect(getClassListOfElementInArrayByIndex(elements, 1)).toEqual(classList);
    });
});