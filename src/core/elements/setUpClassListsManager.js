export function setUpClassListsManager(
    {
        core: {
            classListManager: self
        },
        elements
    }
) {
    self.addToElementClass = (elementName, className) => {
        addToClassListClass(getClassListFromElement(elements[elementName]), className);
    };

    self.removeFromElementClass = (elementName, className) => {
        removeFromClassListClass(getClassListFromElement(elements[elementName]), className);
    };

    self.addToElementInArrayAtIndexClass = (elementsArrayName, index, className) => {
        addToClassListClass(getClassListFromElement(elements[elementsArrayName][index]), className);
    };

    self.removeFromElementInArrayAtIndexClass = (elementsArrayName, index, className) => {
        removeFromClassListClass(getClassListFromElement(elements[elementsArrayName][index]), className);
    };

    self.ifElementNotHasClassAddIt = (elementName, className) => {
        let classList = getClassListFromElement(elements[elementName]);
        if (!doesClassListContainsClass(classList, className)) {
            addToClassListClass(classList, className);
        }
    };

    self.ifElementHasClassRemoveIt = (elementName, className) => {
        let classList = getClassListFromElement(elements[elementName]);
        if (doesClassListContainsClass(classList, className)) {
            removeFromClassListClass(classList, className);
        }
    };

    self.ifElementFromArrayAtIndexHasClassRemoveIt = (elementsArrayName, index, className) => {
        let classList = getClassListFromElement(elements[elementsArrayName][index]);
        if (doesClassListContainsClass(classList, className)) {
            removeFromClassListClass(classList, className);
        }
    };

    const getClassListFromElement = (element) => {
        return element.current.classList;
    };

    const addToClassListClass = (classList, className) => {
        classList.add(className);
    };

    const removeFromClassListClass = (classList, className) => {
        classList.remove(className);
    };

    const doesClassListContainsClass = (classList, className) => {
        return classList.contains(className);
    };
}
