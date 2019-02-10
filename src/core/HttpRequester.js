export default class HttpRequester {
    constructor() {
        this.url = '';
        this.sourceType = null;
        this.xhr = new XMLHttpRequest();
        this.resolve = null;
        this.onRequestStateChange = this.onRequestStateChange.bind(this);
    }

    setUrl(url) {
        this.url = url;
    }

    getSourceType() {
        return new Promise(((resolve) => {
            this.xhr.open('GET', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', true);
            this.resolve = resolve;
            this.xhr.onreadystatechange = this.onRequestStateChange;
            this.xhr.send(null);
        }));
    }

    onRequestStateChange() {
        if (this.xhr.readyState === 2) {
            this.sourceType = this.xhr.status;
            const responseType = this.xhr.getResponseHeader('content-type');
            this.sourceType = responseType.slice(0, responseType.indexOf('/'));
            this.xhr.abort();
            this.resolve();
        }
    }
}