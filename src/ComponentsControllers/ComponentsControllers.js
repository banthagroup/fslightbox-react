import { ProperSourcesController } from "./Sources/ProperSources/ProperSourcesController";


/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function ComponentsControllers(fsLightbox) {
    this.sources = {
        properSources: new ProperSourcesController(fsLightbox)
    };
}