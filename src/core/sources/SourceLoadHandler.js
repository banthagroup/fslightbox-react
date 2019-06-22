/**
 * @constructor
 */
export function SourceLoadHandler(
    {
        core: {
            sourceLoadActions
        }
    }
) {
    let sourceIndex;
    let defaultWidth;
    let defaultHeight;
    let setUpSourceDimensions = () => {};

    this.setIndex = (index) => {
        sourceIndex = index;
    };

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
        defaultWidth = 1920;
        defaultHeight = 1080;
    };

    this.handleLoad = (e) => {
        setUpSourceDimensions(e);
        sourceLoadActions.setIndex(sourceIndex);
        sourceLoadActions.setDefaultDimensions(defaultWidth, defaultHeight);
        sourceLoadActions.runInitialLoadActions();
        this.handleLoad = () => {
            sourceLoadActions.setIndex(sourceIndex);
            sourceLoadActions.runNormalLoadActions();
        };
    };
}
