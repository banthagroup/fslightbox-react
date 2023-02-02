export function getAutomaticTypeDetectorBucket() {
    return {
        isUrlYoutubeOne: (url) => {
            var parser = document.createElement("a");
            parser.href = url;
	    var h = parser.hostname;
            return h === "www.youtube.com" || h === "youtu.be";
        },

        getTypeFromResponseContentType: (responseContentType) => {
            return responseContentType.slice(0, responseContentType.indexOf('/'));
        }
    };
}
