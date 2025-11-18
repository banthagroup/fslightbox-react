import { SourceLoadActioner } from "./SourceLoadActioner";

/**
 * As sources are recreated on lightbox reopen SourceLoadHandler must also be recreated to run source initial load
 * actions again.
 */
export function SourceLoadHandler({ elements: { sources }, props, resolve}, i) {
    const sourceLoadActioner = resolve(SourceLoadActioner, [i]);

    let wasVideoLoadCalled;

    this.handleImageLoad = ({ target: { naturalWidth, naturalHeight } }) => {
        sourceLoadActioner.runActions(naturalWidth, naturalHeight)
    };

    this.handleVideoLoad = ({ target: { videoWidth, videoHeight } }) => {
        wasVideoLoadCalled = true;
        sourceLoadActioner.runActions(videoWidth, videoHeight)
    };

    this.handleNotMetaDatedVideoLoad = () => {
        if (!wasVideoLoadCalled) {
            this.handleYoutubeLoad();
        }
    };

    this.handleYoutubeLoad = () => {
        let width = 1920;
        let height = 1080;

        if (props.maxYoutubeVideoDimensions) {
            width = props.maxYoutubeVideoDimensions.width;
            height = props.maxYoutubeVideoDimensions.height;
        }

        sourceLoadActioner.runActions(width, height);
    };

    this.handleCustomLoad = () => {
	var s = sources[i].current;

	if (!s) return;
	
	var w=s.offsetWidth,h=s.offsetHeight;
	if (!w || !h) {
		setTimeout(this.handleCustomLoad);
		return;
	}if(s.firstChild.style){s.firstChild.style.width="100%";s.firstChild.style.height="100%";}

        sourceLoadActioner.runActions(w,h);
    };
}
