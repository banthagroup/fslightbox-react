import { ProperSourceController } from "./Sources/ProperSourceController";
import { SourceController } from "./Sources/SourceController";

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

    this.sources = collectionsCreator
        .setClassModule(SourceController)
        .setNumberOfItems(data.totalSlides)
        .getCollection();

    this.properSource = new ProperSourceController(fsLightbox);
}