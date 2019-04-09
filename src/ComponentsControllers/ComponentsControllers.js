import { ProperSourceController } from "./Sources/ProperSources/ProperSourceController";
import { SourceController } from "./Sources/SourceController";

/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function ComponentsControllers(fsLightbox) {
    fsLightbox.componentsControllers = this;

    this.sources = fsLightbox.collectionsCreator
        .setClassModule(SourceController)
        .setNumberOfItems(fsLightbox.data.totalSlides)
        .getCollection();

    this.properSource = new ProperSourceController(fsLightbox);
}