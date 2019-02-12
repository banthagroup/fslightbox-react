export const reopenFsLightbox = (fsLightbox) => {
    return new Promise((resolve => {
        fsLightbox.instance().setState({
            isOpen: false,
        }, () => {
            fsLightbox.instance().setState({
               isOpen: true,
            }, () => {
                resolve(fsLightbox);
            });
        });
    }))
};