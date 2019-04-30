/**
 * @constructor
 */
export function Injector(fsLightbox) {
    /**
     * @param { FunctionConstructor } dependency Constructor function from which will be created object.
     * @param { Array } paramsArray Array with parameters which will be passed to new object.
     * @param { Boolean } Boolean if set to false FsLightbox object won't be passed to new dependency object.
     * @return { Object } New object created with params from given constructor dependency.
     */
    this.injectDependency = (dependency, params = [], withLightbox = true) => {
        if (withLightbox)
            params.unshift(fsLightbox);
        return new dependency(...params);
    };
}