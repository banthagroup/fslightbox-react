import { LightboxUpdateActioner } from "./LightboxUpdateActioner";

export function setUpLightboxUpdater(fsLightbox) {
    const {
        core: { lightboxUpdater: self, },
        resolve,
    } = fsLightbox;

    const actioner = resolve(LightboxUpdateActioner);

    self.handleUpdate = (q) => {
        var p = fsLightbox.props, o = fsLightbox.o;
	if (p.toggler!=q.toggler) (document.documentElement.contains(o.elements.container)) ? o.close() : o.open(p.sourceIndex || p.slide - 1);
    };
}
