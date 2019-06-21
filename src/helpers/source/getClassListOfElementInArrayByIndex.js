/**
 * @param { Array } arrayOfElements
 * @param { number } index
 * @return { DOMTokenList }
 */
export const getClassListOfElementInArrayByIndex = (arrayOfElements, index) => {
    // TODO: IF THERE WILL BE NO MORE USAGES DELETE IT
    return arrayOfElements[index].current.classList;
};
