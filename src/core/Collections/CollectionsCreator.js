/**
 * @class
 */
export function CollectionsCreator(fsLightbox) {
    let module;
    let collection = [];
    let numberOfItems;

    this.setClassModule = (classModule) => {
        module = classModule;
        return this;
    };

    this.setNumberOfItems = (number) => {
        numberOfItems = number;
        return this;
    };

    this.getCollection = () => {
        setUpCollection();
        return collection;
    };

    const setUpCollection = () => {
        for (let i = 0; i < numberOfItems; i++) {
            let instance = new module(fsLightbox);
            instance.setIndex(i);
            collection[i] = instance;
        }
    };
}