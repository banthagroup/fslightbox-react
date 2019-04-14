import { SourceSizeAdjusterIterator } from "./Sizes/SourceSizeAdjusterIterator";
import { SourceAnimator } from "./Animations/SourceAnimator";
import { StageSources } from "./Stage/StageSources";
import { FullscreenToggler } from "./Fullscreen/FullscreenToggler";
import { SourceHoldersTransformer } from "./Transforms/SourceHoldersTransformer";
import { CloseOpenLightbox } from "./CloseOpenLightbox";
import { SlideChanger } from "./Slide/SlideChanger";
import { EventsControllers } from "./EventsControllers/EventsControllers";
import { GlobalResizingController } from "./Sizes/GlobalResizingController";
import { SlideSwiping } from "./SlideSwiping/SlideSwiping";
import { ProperSourceController } from "./Sources/ProperSourceController";
import { SourceComponentGetter } from "./Sources/Creating/SourceComponentGetter";

/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function Core(fsLightbox) {
    // we are setting up Core to this scope because in Core objects we use another Core objects
    // so we need Core to be already defined
    fsLightbox.core = this;

    this.stageSources = new StageSources(fsLightbox);
    this.sourceFactory = new SourceComponentGetter(fsLightbox);
    this.sourceAnimator = new SourceAnimator(fsLightbox);
    // TODO: TEST
    this.properSourceController = new ProperSourceController(fsLightbox);
    this.fullscreenToggler = new FullscreenToggler(fsLightbox);
    this.sourceHoldersTransformer = new SourceHoldersTransformer(fsLightbox);
    this.slideChanger = new SlideChanger(fsLightbox);
    this.slideSwiping = new SlideSwiping(fsLightbox);
    this.globalResizingController = new GlobalResizingController(fsLightbox);
    this.eventsControllers = new EventsControllers(fsLightbox);
    this.closeOpenLightbox = new CloseOpenLightbox(fsLightbox);
}