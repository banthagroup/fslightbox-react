import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";

describe('Loader', () => {
    const mock = new FsLightboxMock();
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();

    it('should render loader on opening lightbox for first time', () => {
        expect(fsLightbox.exists('Loader')).toBeTruthy();
    });

    it('should hide loader after source create', () => {

    });
});