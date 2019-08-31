import { SourceLoadActioner } from "./SourceLoadActioner";

export function SourceLoadHandler({ props: { maxYoutubeVideoDimensions }, injector: { resolve } }, i) {
    let defaultWidth;
    let defaultHeight;
    let setUpSourceDimensions = () => {};

    this.setUpLoadForImage = () => {
        setUpSourceDimensions = ({ target: { width, height } }) => {
            defaultWidth = width;
            defaultHeight = height;
        }
    };

    this.setUpLoadForVideo = () => {
        setUpSourceDimensions = ({ target: { videoWidth, videoHeight } }) => {
            defaultWidth = videoWidth;
            defaultHeight = videoHeight;
        }
    };

    this.setUpLoadForYoutube = () => {
        if (maxYoutubeVideoDimensions && maxYoutubeVideoDimensions[i]) {
            defaultWidth = maxYoutubeVideoDimensions[i].width;
            defaultHeight = maxYoutubeVideoDimensions[i].height;
        } else {
            defaultWidth = 1920;
            defaultHeight = 1080;
        }
    };

    this.handleLoad = (e) => {
        setUpSourceDimensions(e);

        const sourceLoadActioner = resolve(SourceLoadActioner, [i, defaultWidth, defaultHeight]);
        sourceLoadActioner.runInitialLoadActions();

        this.handleLoad = sourceLoadActioner.runNormalLoadActions;
    };
}
