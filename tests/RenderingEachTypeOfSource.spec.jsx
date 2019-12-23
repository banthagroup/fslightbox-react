import React from 'react';
import { mount } from "enzyme";
import FsLightbox from "../src/FsLightbox";
import { fsLightbox } from "./__tests-services__/testLightbox";
import { ANIMATION_TIME } from "../src/constants/css-constants";
import { act } from "react-dom/test-utils";
import { testSources } from "./__tests-services__/testVars";

it('should render each type of source without error', () => {
    // loading all sources
    act(() => {
        for (let i = 0; i < fsLightbox.data.sourcesCount; i++) {
            fsLightbox.componentsServices.updateSourceInnerCollection[i]();
        }
    });

    expect(fsLightbox.elements.sources[0].current.tagName).toBe('IMG');
    expect(fsLightbox.elements.sources[1].current.tagName).toBe('VIDEO');
    expect(fsLightbox.elements.sources[2].current).toBeNull();
    expect(fsLightbox.elements.sources[3].current).toBeNull();
    expect(fsLightbox.elements.sources[4].current.tagName).toBe('H1');

    act(() => fsLightbox.core.slideIndexChanger.jumpTo(2));
    expect(fsLightbox.elements.sources[0].current.tagName).toBe('IMG');
    expect(fsLightbox.elements.sources[1].current.tagName).toBe('VIDEO');
    expect(fsLightbox.elements.sources[2].current.tagName).toBe('IFRAME');
    expect(fsLightbox.elements.sources[3].current).toBeNull();
    expect(fsLightbox.elements.sources[4].current.tagName).toBe('H1');

    jest.useFakeTimers();
    act(fsLightbox.core.lightboxCloser.closeLightbox);
    jest.runAllTimers();

    fsLightbox.stageIndexes.current = 0;
    act(fsLightbox.core.lightboxOpener.openLightbox);
    expect(fsLightbox.elements.sources[0].current.tagName).toBe('IMG');
    expect(fsLightbox.elements.sources[1].current.tagName).toBe('VIDEO');
    expect(fsLightbox.elements.sources[2].current).toBeNull();
    expect(fsLightbox.elements.sources[3].current).toBeNull();
    expect(fsLightbox.elements.sources[4].current.tagName).toBe('H1');
});

it('should not throw error when detecting type manually on each type of source', () => {
    const fsLightboxWrapper = mount(<FsLightbox
        toggler={ false }
        openOnMount={ true }
        disableLocalStorage={ true }
        sources={ testSources }
    />);
    jest.useFakeTimers();
    fsLightboxWrapper.find({ title: 'Close' }).at(0).simulate('click');
    jest.runTimersToTime(ANIMATION_TIME - 30);
    fsLightboxWrapper.update();
    expect(fsLightboxWrapper.children().getElements()).toEqual([]);
});
