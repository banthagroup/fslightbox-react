import { FsLightboxMock } from "../../../../__mocks__/components/fsLightboxMock";

const fsLightboxMock = new FsLightboxMock();
/** @var { FsLightbox } fsLightbox */
let fsLightbox;

beforeEach(() => {
    fsLightboxMock.instantiateNewFsLightbox();
    fsLightboxMock.setAllSourceHoldersToDivs();
    fsLightbox = fsLightboxMock.getFsLightbox();
});

// neither transform can be called when 
// user is not swiping
// or
// after swiping animation is running
describe('not calling transform ', () => {
    describe('due to user is not swiping', () => {
        it('should not call transform previous', () => {
            
        });                
        
        it('should not call transform current', () => {

        });

        it('should not call transform next', () => {

        });
    });


    // TODO: BUT LATER VERY LATER ALMOST AT END OF SLIDING IMPLEMENTATION
    describe('due to swiping animation is running', () => {

    });
});