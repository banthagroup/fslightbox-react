import React from "react";
import { mount } from 'enzyme';
import { act } from "react-dom/test-utils";
import { ANIMATION_TIME } from "../../src/constants/css-constants";
import FsLightbox from "../../src/FsLightbox";
import { testSources, testTypes } from "../__tests-services__/testVars";

test('opening events', () => {
    jest.useFakeTimers();

    const onInit = jest.fn();
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const onShow = jest.fn();

    const lightbox = mount(<FsLightbox
        openOnMount={true}
        toggler={false}
        sources={testSources}
        types={testTypes}
        onOpen={onOpen}
        onClose={onClose}
        onInit={onInit}
        onShow={onShow}
    />);

    expect(onInit).toBeCalledTimes(1);
    expect(onOpen).toBeCalledTimes(1);
    expect(onShow).toBeCalledTimes(0);
    expect(onClose).toBeCalledTimes(0);

    lightbox.setProps({
        toggler: !lightbox.prop('toggler')
    });

    expect(onInit).toBeCalledTimes(1);
    expect(onOpen).toBeCalledTimes(1);
    expect(onShow).toBeCalledTimes(0);
    expect(onClose).toBeCalledTimes(0);

    act(() => {
        jest.runTimersToTime(ANIMATION_TIME);
    });

    expect(onInit).toBeCalledTimes(1);
    expect(onOpen).toBeCalledTimes(1);
    expect(onShow).toBeCalledTimes(0);
    expect(onClose).toBeCalledTimes(1);

    lightbox.setProps({
        toggler: !lightbox.prop('toggler')
    });

    expect(onInit).toBeCalledTimes(1);
    expect(onOpen).toBeCalledTimes(2);
    expect(onShow).toBeCalledTimes(1);
    expect(onClose).toBeCalledTimes(1);
});
