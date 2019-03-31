import { FsLightboxMock } from "../../../../__mocks__/components/fsLightboxMock";

const fsLightboxMock = new FsLightboxMock();
/** @var { FsLightbox } fsLightbox */
let fsLightbox;
let stageSourceHoldersByValueTransformer;

beforeEach(() => {
    fsLightboxMock.instantiateNewFsLightbox();
    fsLightbox = fsLightboxMock.getFsLightbox();

});

describe('sliding all three slides, because there are three slides', () => {

});