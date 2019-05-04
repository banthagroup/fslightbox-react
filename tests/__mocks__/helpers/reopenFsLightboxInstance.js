/**
 *
 * @param { FsLightbox } fsLightboxInstance
 * @return {Promise<FsLightbox>}
 */
export const reopenFsLightboxInstance = (fsLightboxInstance) => {
    return new Promise(resolve => {
        fsLightboxInstance.setState({
            toggler: false,
        }, () => {
            fsLightboxInstance.setState({
               toggler: true,
            }, () => {
                resolve(fsLightboxInstance);
            });
        });
    });
};