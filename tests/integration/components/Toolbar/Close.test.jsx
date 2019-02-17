import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

it('should close Lightbox', () => {
    jest.useFakeTimers();
    const mock = new FsLightboxMock();
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();
    expect(fsLightboxInstance.state.isOpen).toBeTruthy();
    const closeButton = fsLightbox.find('.fslightbox-toolbar-button').at(1);
    closeButton.simulate('click');
    jest.runAllTimers();
    expect(fsLightboxInstance.state.isOpen).toBeFalsy();
});