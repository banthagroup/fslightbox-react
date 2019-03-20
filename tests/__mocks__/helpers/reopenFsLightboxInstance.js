/**
 *
 * @param { FsLightbox } fsLightboxInstance
 * @return {Promise<FsLightbox>}
 */
export const reopenFsLightboxInstance = (fsLightboxInstance) => {
    return new Promise(resolve => {
        fsLightboxInstance.setState({
            isOpen: false,
        }, () => {
            fsLightboxInstance.setState({
               isOpen: true,
            }, () => {
                resolve(fsLightboxInstance);
            });
        });
    });
};