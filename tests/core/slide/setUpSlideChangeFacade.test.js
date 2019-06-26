import { setUpSlideChangeFacade } from "../../../src/core/slide/setUpSlideChangeFacade";

const fsLightbox = {
    core: {
        slideIndexChanger: {
            changeToWithActions: () => {}
        },
        slideChangeFacade: {},
        stageManager: {
            getPreviousSlideIndex: () => {},
            getNextSlideIndex: () => {}
        }
    },
    data: {
        sourcesCount: undefined
    }
};

const slideIndexChanger = fsLightbox.core.slideIndexChanger;
const stageManager = fsLightbox.core.stageManager;

const slideChangeFacade = fsLightbox.core.slideChangeFacade;

beforeEach(() => {
    stageManager.getPreviousSlideIndex = () => 25;
    stageManager.getNextSlideIndex = () => 50;
    slideIndexChanger.changeToWithActions = jest.fn();
});

describe('changeToPrevious', () => {
    it('should not call changeToWithActions due to there is only one slide', () => {
        fsLightbox.data.sourcesCount = 1;
        setUpSlideChangeFacade(fsLightbox);
        slideChangeFacade.changeToPrevious();
        expect(slideIndexChanger.changeToWithActions).not.toBeCalled();
    });

    it(`should call changeToWithActions with  previous slide index 
        due to sourcesCount > 1`, () => {
        fsLightbox.data.sourcesCount = 2;
        setUpSlideChangeFacade(fsLightbox);
        slideChangeFacade.changeToPrevious();
        expect(slideIndexChanger.changeToWithActions).toBeCalledWith(25);
    });
});

describe('changeToNext', () => {
    it('should not call changeToWithActions due to there is only one slide', () => {
        fsLightbox.data.sourcesCount = 1;
        setUpSlideChangeFacade(fsLightbox);
        slideChangeFacade.changeToNext();
        expect(slideIndexChanger.changeToWithActions).not.toBeCalled();
    });

    it(`should call changeToWithActions with next slide index 
        due to sourcesCount > 1`, () => {
        fsLightbox.data.sourcesCount = 2;
        setUpSlideChangeFacade(fsLightbox);
        slideChangeFacade.changeToNext();
        expect(slideIndexChanger.changeToWithActions).toBeCalledWith(50);
    });
});
