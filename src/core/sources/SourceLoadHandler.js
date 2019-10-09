import { SourceLoadActioner } from "./SourceLoadActioner";

export function SourceLoadHandler({ elements: { sources }, props: { maxYoutubeVideoDimensions }, resolve, }, i) {
    this.handleImageLoad = ({ target: { width, height } }) => {
        this.handleImageLoad = handleLoadAndGetFurtherActionsFunction(width, height);
    };

    this.handleVideoLoad = ({ target: { videoWidth, videoHeight } }) => {
        this.handleVideoLoad = handleLoadAndGetFurtherActionsFunction(videoWidth, videoHeight);
    };

    this.handleYoutubeLoad = () => {
        let width = 1920;
        let height = 1080;

        if (maxYoutubeVideoDimensions) {
            width = maxYoutubeVideoDimensions.width;
            height = maxYoutubeVideoDimensions.height;
        }

        this.handleYoutubeLoad = handleLoadAndGetFurtherActionsFunction(width, height);
    };

    this.handleCustomLoad = () => {
        const source = sources[i].current;
        this.handleCustomLoad = handleLoadAndGetFurtherActionsFunction(source.offsetWidth, source.offsetHeight);
    };

    const handleLoadAndGetFurtherActionsFunction = (defaultWidth, defaultHeight) => {
        const sourceLoadActioner = resolve(SourceLoadActioner, [i, defaultWidth, defaultHeight]);

        sourceLoadActioner.runInitialLoadActions();

        return sourceLoadActioner.runNormalLoadActions;
    };
}
