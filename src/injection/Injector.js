export function Injector(fsLightbox) {
    /**
     * @param { FunctionConstructor } dependency Constructor function from which will be created object.
     * @param { Array } paramsArray Array with parameters which will be passed to new object.
     * @return { Object } New object created with params from given constructor dependency.
     */
    this.resolve = (dependency, params = []) => {
        params.unshift(fsLightbox);
        return new dependency(...params);
    };
}
