import { SourceLoadActioner } from "./SourceLoadActioner";
import { SourceLoadHandler } from "./SourceLoadHandler";

const fsLightbox = {
    props: { maxYoutubeVideoDimensions: [{ width: 2000, height: 1000 }] },
    injector: {
        resolve: (constructor, params) => {
            if (constructor === SourceLoadActioner) {
                expect(expectedSourceLoadActionerParams).toEqual(params);
                return sourceLoadActioner;
            } else {
                throw new Error('Invalid dependency resolved');
            }
        }
    }
};
let expectedSourceLoadActionerParams;
const sourceLoadActioner = { runInitialLoadActions: jest.fn(), runNormalLoadActions: jest.fn() };

test('handleLoad', () => {
    let sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.setUpLoadForImage();
    expectedSourceLoadActionerParams = [0, 1000, 1500];
    sourceLoadHandler.handleLoad({ target: { width: 1000, height: 1500 } });
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalled();
    expect(sourceLoadActioner.runNormalLoadActions).not.toBeCalled();
    sourceLoadHandler.handleLoad();
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalledTimes(1);
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalled();

    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.setUpLoadForVideo();
    expectedSourceLoadActionerParams = [0, 1500, 1000];
    sourceLoadHandler.handleLoad({ target: { videoWidth: 1500, videoHeight: 1000 } });
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalledTimes(2);
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalledTimes(1);
    sourceLoadHandler.handleLoad();
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalledTimes(2);
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalledTimes(2);

    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.setUpLoadForYoutube();
    expectedSourceLoadActionerParams = [0, 2000, 1000];
    sourceLoadHandler.handleLoad();
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalledTimes(3);
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalledTimes(2);
    sourceLoadHandler.handleLoad();
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalledTimes(3);
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalledTimes(3);

    delete fsLightbox.props.maxYoutubeVideoDimensions;
    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.setUpLoadForYoutube();
    expectedSourceLoadActionerParams = [0, 1920, 1080];
    sourceLoadHandler.handleLoad();
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalledTimes(4);
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalledTimes(3);
    sourceLoadHandler.handleLoad();
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalledTimes(4);
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalledTimes(4);
});
