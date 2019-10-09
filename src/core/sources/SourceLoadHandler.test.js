import { SourceLoadActioner } from "./SourceLoadActioner";
import { SourceLoadHandler } from "./SourceLoadHandler";

const fsLightbox = {
    elements: { sources: [{ current: { offsetWidth: 1111, offsetHeight: 555 } }] },
    props: {},
    resolve: (constructor, params) => {
        if (constructor === SourceLoadActioner) {
            expect(expectedSourceLoadActionerParams).toEqual(params);
            return sourceLoadActioner;
        } else {
            throw new Error('Invalid dependency resolved');
        }
    }
};
let expectedSourceLoadActionerParams;
const sourceLoadActioner = { runInitialLoadActions: jest.fn(), runNormalLoadActions: jest.fn() };
let sourceLoadHandler;

beforeEach(() => {
    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
});

test('handleImageLoad', () => {
    expectedSourceLoadActionerParams = [0, 1000, 1500];
    sourceLoadHandler.handleImageLoad({ target: { width: 1000, height: 1500 } });
    expect(sourceLoadHandler.handleImageLoad).toBe(sourceLoadActioner.runNormalLoadActions);
});

test('handleVideoLoad', () => {
    expectedSourceLoadActionerParams = [0, 250, 100];
    sourceLoadHandler.handleVideoLoad({ target: { videoWidth: 250, videoHeight: 100 } });
    expect(sourceLoadHandler.handleVideoLoad).toBe(sourceLoadActioner.runNormalLoadActions);
});

test('handleYoutubeLoad', () => {
    expectedSourceLoadActionerParams = [0, 1920, 1080];
    sourceLoadHandler.handleYoutubeLoad();
    expect(sourceLoadHandler.handleYoutubeLoad).toBe(sourceLoadActioner.runNormalLoadActions);

    expectedSourceLoadActionerParams = [0, 100, 50];
    fsLightbox.props.maxYoutubeVideoDimensions = { width: 100, height: 50 };
    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.handleYoutubeLoad();
});

test('handleCustomLoad', () => {
    expectedSourceLoadActionerParams = [0, 1111, 555];
    sourceLoadHandler.handleCustomLoad();
    expect(sourceLoadHandler.handleCustomLoad).toBe(sourceLoadActioner.runNormalLoadActions);
});
