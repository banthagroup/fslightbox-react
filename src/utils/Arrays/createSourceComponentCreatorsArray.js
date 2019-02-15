import { SourceComponentsCreator } from "../../core/Source/SourceComponentsCreator";

export const createSourceComponentCreatorsArray = (_) => {
    const sourceComponentsCreatorsArray = [];
    for (let i = 0; i < _.totalSlides; i++) {
        const sourceComponentCreator = new SourceComponentsCreator(_);
        sourceComponentCreator.setIndex(i);
        sourceComponentsCreatorsArray.push(sourceComponentCreator);
    }
    return sourceComponentsCreatorsArray;
};