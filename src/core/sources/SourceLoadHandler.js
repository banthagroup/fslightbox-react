/**
 * @constructor
 */
export function SourceLoadHandler(
    {
        core: {
            sourceController
        }
    }
) {
    let sourceIndex;
    let sourceWidth;
    let sourceHeight;
    let setUpSourceDimensions = () => {};

    this.setIndex = (index) => {
        sourceIndex = index;
    };

    this.setUpLoadForImage = () => {
        setUpSourceDimensions = ({ target: { width, height } }) => {
            sourceWidth = width;
            sourceHeight = height;
        }
    };

    this.setUpLoadForVideo = () => {
        setUpSourceDimensions = ({ target: { videoWidth, videoHeight } }) => {
            sourceWidth = videoWidth;
            sourceHeight = videoHeight;
        }
    };

    this.setUpLoadForYoutube = () => {
        sourceWidth = 1920;
        sourceHeight = 1080;
    };

    this.handleLoad = (e) => {
        setUpSourceDimensions(e);
        sourceController.setIndex(sourceIndex);
        sourceController.setSourceWidth(sourceWidth);
        sourceController.setSourceHeight(sourceHeight);
        sourceController.runInitialLoadActions();
        this.handleLoad = () => {
            sourceController.setIndex(sourceIndex);
            sourceController.runNormalLoadActions();
        };
    };
}
