export function setUpClassListsManager(
    {
        core: {
            classListManager: self
        },
        elements
    }
) {
    self.addToElementClass = (elementName, className) => {
        addToElementClass(elements[elementName], className);
    };

    self.removeFromElementClass = (elementName, className) => {
        removeFromElementClass(elements[elementName], className);
    };

    self.addToElementInArrayAtIndexClass = (elementsArrayName, index, className) => {
        addToElementClass(elements[elementsArrayName][index], className);
    };

    self.ifElementNotHasClassAddIt = (elementName, className) => {
        if (!doesElementContainsClassList(elements[elementName], className)) {
            addToElementClass(elements[elementName], className);
        }
    };

    self.ifElementHasClassRemoveIt = (elementName, className) => {
        if (doesElementContainsClassList(elements[elementName], className)) {
            removeFromElementClass(elements[elementName], className);
        }
    };

    self.ifElementFromArrayAtIndexHasClassRemoveIt = (elementsArrayName, index, className) => {
        if (doesElementContainsClassList(elements[elementsArrayName][index], className)) {
            removeFromElementClass(elements[elementsArrayName][index], className);
        }
    };

    const addToElementClass = (element, className) => {
        getClassListFromElement(element).add(className);
    };

    const removeFromElementClass = (element, className) => {
        getClassListFromElement(element).remove(className);
    };

    const doesElementContainsClassList = (element, className) => {
        return getClassListFromElement(element).contains(className);
    };

    const getClassListFromElement = (element) => {
        return element.current.classList;
    };
}
