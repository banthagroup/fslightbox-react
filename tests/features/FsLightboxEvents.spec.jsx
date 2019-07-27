import { ANIMATION_TIME } from "../../src/constants/css-constants";
import { mountedLightbox, onClose, onInit, onOpen, onShow } from "../__tests-vars__/mountedLightbox";

test('opening events', () => {
    jest.useFakeTimers();

    expect(onInit).toBeCalledTimes(1);
    expect(onOpen).toBeCalledTimes(1);
    expect(onShow).toBeCalledTimes(0);
    expect(onClose).toBeCalledTimes(0);

    mountedLightbox.setProps({
        toggler: !mountedLightbox.prop('toggler')
    });

    expect(onInit).toBeCalledTimes(1);
    expect(onOpen).toBeCalledTimes(1);
    expect(onShow).toBeCalledTimes(0);
    expect(onClose).toBeCalledTimes(0);

    jest.runTimersToTime(ANIMATION_TIME);

    expect(onInit).toBeCalledTimes(1);
    expect(onOpen).toBeCalledTimes(1);
    expect(onShow).toBeCalledTimes(0);
    expect(onClose).toBeCalledTimes(1);

    mountedLightbox.setProps({
        toggler: !mountedLightbox.prop('toggler')
    });

    expect(onInit).toBeCalledTimes(1);
    expect(onOpen).toBeCalledTimes(2);
    expect(onShow).toBeCalledTimes(1);
    expect(onClose).toBeCalledTimes(1);
});
