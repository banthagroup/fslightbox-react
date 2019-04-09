import React from "react";
import { SourceFactory } from "../../core/Source/SourceFactory";
import { SourceSizeAdjuster } from "../../core/Source/SourceSizeAdjuster";
import { FADE_IN_CLASS_NAME, FADE_IN_COMPLETE_CLASS_NAME } from "../../constants/CssConstants";
/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function SourceController(fsLightbox) {
    let index;
    let shouldCallUpdateAfterMount;
    let setIsProperSourceRendered;

    this.setIndex = (sourceIndex) => {
        index = sourceIndex;
    };

    this.setIsProperSourceRenderedSetter = (setter) => {
        setIsProperSourceRendered = setter;
    };

    this.init = () => {
        shouldCallUpdateAfterMount = false;
        // request succeeded when lightbox was closed
        if (fsLightbox.sourcesData.sourcesToCreateOnConstruct[index]) {
            shouldCallUpdateAfterMount = true;
            this.createSource();
        }
    };

    this.createSource = () => {
        const sourceFactory = new SourceFactory(fsLightbox);
        sourceFactory.setSourceIndex(index);
        fsLightbox.elements.sourcesJSXComponents[index] = sourceFactory.getSourceComponent();
        if (!shouldCallUpdateAfterMount) {
            this.sourceWasCreated();
        }
    };

    this.sourceWasCreated = () => {
        // after that refresh source stored in sourcesJSXComponents is attached so we can access refs
        setIsProperSourceRendered(true);
    };

    this.componentDidMount = () => {
        if (shouldCallUpdateAfterMount) {
            this.sourceWasCreated();
        }
        // if source was already loaded we need to call onSourceLoad after component mount
        if (fsLightbox.sourcesData.isSourceAlreadyLoadedArray[index]) {
            onSourceLoad();
        }
    };


    this.onFirstSourceLoad = () => {
        // fsLightbox.elements.sources[index].current.classList.remove('fslightbox-opacity-0');
        fsLightbox.sourcesData.isSourceAlreadyLoadedArray[index] = true;
        // we are creating source size adjuster after first load because we need already source dimensions
        const sourceSizeAdjuster = new SourceSizeAdjuster(fsLightbox);
        sourceSizeAdjuster.setIndex(index);
        fsLightbox.collections.sourceSizeAdjusters[index] = sourceSizeAdjuster;

        onSourceLoad();
    };

    const onSourceLoad = () => {
        fadeInSource();
        // source size adjuster may be not set if source is invalid
        if (fsLightbox.collections.sourceSizeAdjusters[index])
            fsLightbox.collections.sourceSizeAdjusters[index].adjustSourceSize();
    };


    const fadeInSource = () => {
        // we are fading in source only if it's in stage
        if (!fsLightbox.core.stageSources.isSourceInStage(index))
            return;

        // we will add longer fade-in for better UX
        if (index === fsLightbox.state.slide - 1) {
            fsLightbox.elements.sources[index].current.classList.add(FADE_IN_COMPLETE_CLASS_NAME)
        } else {
            fsLightbox.elements.sources[index].current.classList.add(FADE_IN_CLASS_NAME);
        }
    };
}