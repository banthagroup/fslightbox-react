import { FsLightboxEnzymeMock } from "../../../__mocks__/components/fsLightboxEnzymeMock";

it('should close Lightbox', () => {
    jest.useFakeTimers();
    const mock = new FsLightboxEnzymeMock();
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();
    expect(fsLightboxInstance.state.isOpen).toBeTruthy();
    const closeButton = fsLightbox.find('.fslightbox-toolbar-button').at(1);
    closeButton.simulate('click');
    jest.runAllTimers();
    expect(fsLightboxInstance.state.isOpen).toBeFalsy();
});