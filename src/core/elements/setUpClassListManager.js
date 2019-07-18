export function setUpClassListManager(
    {
        core: {
            classListManager: self
        },
        elements
    }
) {
    self.manageElement = (elementName) => {
        return getManagerObjectForClassList(elements[elementName]);
    };

    self.manageArrayElementAtIndex = (elementsArrayName, index) => {
        return getManagerObjectForClassList(elements[elementsArrayName][index]);
    };

    const getManagerObjectForClassList = (element) => {
        const elementClassList = element.current.classList;
        return {
            add: elementClassList.add.bind(elementClassList),
            addIfNotContains: (className) => {
                if (!elementClassList.contains(className)) {
                    elementClassList.add(className);
                }
            },
            remove: elementClassList.remove.bind(elementClassList),
            removeIfContains: (className) => {
                if (elementClassList.contains(className)) {
                    elementClassList.remove(className);
                }
            }
        }
    };
}
