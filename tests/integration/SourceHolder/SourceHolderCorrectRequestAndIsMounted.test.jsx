import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";
import { SourceHolderMock } from "../../__mocks__/components/sources/sourceHolderMock";
import { IMAGE_TYPE } from "../../../src/constants/CoreConstants";

const fsLightboxMock = new FsLightboxMock();
fsLightboxMock.instantiateNewFsLightbox();
const fsLightbox = fsLightboxMock.getFsLightbox();

let sourceHolderMock;
/** @var { SourceHolder } sourceHolder */
let sourceHolder;

beforeEach(() => {
    sourceHolderMock = new SourceHolderMock(fsLightbox);
    sourceHolderMock.setIndex(0);
    sourceHolder = sourceHolderMock.getSourceHolder();
    // emptying sourcesToCreateOnConstruct because we use this in tests so tests would affect each other
    fsLightbox.sourcesData.sourcesToCreateOnConstruct = [];
});


describe('processReceivedSourceType - if component is mounted', () => {
    describe('source is null (request have succeeded when lightbox is closed', () => {
        beforeEach(() => {
            // source is null and component is mounted
            sourceHolder.componentDidMount();
            sourceHolder.source.current = null;
        });

        it('should set sourcesToCreateOnConstruct for source to true', () => {
            sourceHolder.processReceivedSourceType(IMAGE_TYPE);
            expect(fsLightbox.sourcesData.sourcesToCreateOnConstruct[0]).toBeTruthy();
        });
    });

    describe('source is not null (normal situation)', () => {
        beforeEach(() => {
            // component is mounted and source is not null
            sourceHolder.componentDidMount();
            sourceHolder.source.current = {
                createSource: jest.fn()
            };
        });

        it('should set sourcesToCreateOnConstruct for source to true', () => {
            sourceHolder.processReceivedSourceType(IMAGE_TYPE);
            expect(fsLightbox.sourcesData.sourcesToCreateOnConstruct[0]).toBeFalsy();
        });

        it('should call createSource', () => {
            sourceHolder.processReceivedSourceType(IMAGE_TYPE);
            expect(sourceHolder.source.current.createSource).toBeCalled();
        });
    });
});