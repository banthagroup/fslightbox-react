/**
 * @param { Array } arrayOfElements
 * @param { number } index
 * @return { DOMTokenList }
 */
export const getClassListOfElementInArrayByIndex = (arrayOfElements, index) => {
    return arrayOfElements[index].current.classList;
};