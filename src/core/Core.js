import { SourceSizeAdjusterIterator } from "./Source/SourceSizeAdjusterIterator";
import { SourceAnimator } from "./Animations/SourceAnimator";
import { StageSources } from "./Stage/StageSources";
import { FullscreenToggler } from "./Fullscreen/FullscreenToggler";
import { SourceHoldersTransformer } from "./Transforms/SourceHoldersTransformer";
import { CloseOpenLightbox } from "./CloseOpenLightbox";
import { SlideChanger } from "./Slide/SlideChanger";
import { EventsControllers } from "./EventsControllers/EventsControllers";
import { SizeController } from "./Size/SizeController";
import { SlideSwiping } from "./SlideSwiping/SlideSwiping";
import { SwipingSlideChanger } from "./Slide/SwipingSlideChanger";

/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function Core(fsLightbox) {
    // we are setting up core to this scope because in core objects we use another core objects
    // so we need core to be already defined
    fsLightbox.core = this;

    this.stageSources = new StageSources(fsLightbox);
    this.sourceSizeAdjusterIterator = new SourceSizeAdjusterIterator(fsLightbox);
    this.sourceAnimator = new SourceAnimator(fsLightbox);
    this.fullscreenToggler = new FullscreenToggler(fsLightbox);
    this.sourceHoldersTransformer = new SourceHoldersTransformer(fsLightbox);
    this.slideChanger = new SlideChanger(fsLightbox);
    this.slideSwiping = new SlideSwiping(fsLightbox);
    this.sizeController = new SizeController(fsLightbox);
    this.eventsControllers = new EventsControllers(fsLightbox);
    this.closeOpenLightbox = new CloseOpenLightbox(fsLightbox);
}