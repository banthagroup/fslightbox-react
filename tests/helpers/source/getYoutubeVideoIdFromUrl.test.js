import { getYoutubeVideoIdFromUrl } from "../../../src/helpers/source/getYoutubeVideoIdFromUrl";

const id = '13jkljdf0923jf';
const url = 'https://www.youtube.com/watch?v=' + id;

describe('getting youtube video Id from url', () => {
    it('should be equal to tested id', () => {
        expect(getYoutubeVideoIdFromUrl(url)).toEqual(id);
    });
});