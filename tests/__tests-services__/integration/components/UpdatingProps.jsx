import React, { useState } from 'react';
import FsLightbox from "../../../../src/FsLightbox";
import { TEST_VIDEO_URL, TEST_YOUTUBE_URL, testSources } from "../../testVars";
import ComponentSwitcher from "../../components/ComponentSwitcher";

export default function UpdatingProps() {
    return <ComponentSwitcher
        testComponents={[
            UpdatingSlidePropLightboxOpened,
            UpdatingSlidePropLightboxClosed,
            UpdatingTogglerSlidePropDifferentThanStageIndex,
            UpdatingSlideAndTogglerProps
        ]}
    />;
}

function UpdatingSlidePropLightboxOpened() {
    const [slide, setSlide] = useState(2);

    return (
        <>
            <button id="btn-update-slide" onClick={() => setSlide(3)} />

            <FsLightbox
                sources={testSources}
                slide={slide}
                openOnMount={true}
            />
        </>
    );
}

function UpdatingSlidePropLightboxClosed() {
    const [toggler, setToggler] = useState(false);
    const [sourceIndex, setSourceIndex] = useState(1);

    return (
        <>
            <button id="btn-toggler" onClick={() => setToggler(!toggler)} />
            <button id="btn-update-slide" onClick={() => setSourceIndex(2)} />

            <FsLightbox
                toggler={toggler}
                sources={testSources}
                sourceIndex={sourceIndex}
            />
        </>
    );
}

function UpdatingTogglerSlidePropDifferentThanStageIndex() {
    const [toggler, setToggler] = useState(false);

    function pressButtonWithKey(key) {
        const keydown = new KeyboardEvent('keydown', {
            key: key
        });
        document.dispatchEvent(keydown);
    }

    return (
        <>
            <button id="btn-change-slide-via-keyboard" onClick={() => pressButtonWithKey('ArrowRight')} />
            <button id="btn-close-lightbox" onClick={() => pressButtonWithKey('Escape')} />
            <button id="btn-toggler" onClick={() => setToggler(!toggler)} />

            <FsLightbox
                toggler={toggler}
                sources={testSources}
                slide={2}
                openOnMount={true}
            />
        </>
    );
}

function UpdatingSlideAndTogglerProps() {
    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        source: TEST_VIDEO_URL
    });

    return (
        <>
            <button
                id="btn-update-slide-and-toggler"
                onClick={
                    () => setLightboxController({
                        toggler: !lightboxController.toggler,
                        source: TEST_YOUTUBE_URL
                    })
                }
            />

            <FsLightbox
                toggler={lightboxController.toggler}
                sources={testSources}
                source={lightboxController.source}
            />
        </>
    );
}