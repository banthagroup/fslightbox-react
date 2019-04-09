import { ProperSourceController } from "./Sources/ProperSources/ProperSourceController";
import { SourceController } from "./Sources/SourceController";
import { SourceHolderController } from "./Sources/SourceHolderController";

/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function ComponentsControllers(fsLightbox) {
    const {
        collectionsCreator,
        data
    } = fsLightbox;
    fsLightbox.componentsControllers = this;

    this.sourceHolders = collectionsCreator
        .setClassModule(SourceHolderController)
        .setNumberOfItems(data.totalSlides)
        .getCollection();

    this.sources = collectionsCreator
        .setClassModule(SourceController)
        .setNumberOfItems(data.totalSlides)
        .getCollection();

    this.properSource = new ProperSourceController(fsLightbox);
}