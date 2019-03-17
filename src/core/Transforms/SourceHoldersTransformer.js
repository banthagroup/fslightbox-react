import { StageHoldersTransformer } from "./StageHoldersTransformer";

export class SourceHoldersTransformer {
    /** @param fsLigthbox { FsLightbox } */
    constructor(fsLigthbox) {
        this.fsLigthbox = fsLigthbox;
    }

    transformStageSources() {
        return new StageHoldersTransformer(this.fsLigthbox);
    }

    transformNegative(i) {
        this._getStyleOfSourceHolderByIndex(i).transform = 'translate(' + -this.fsLigthbox.sourcesData.slideDistance * window.innerWidth + 'px,0)';
    }

    transformZero(i) {
        this._getStyleOfSourceHolderByIndex(i).transform = 'translate(0,0)';
    }

    transformPositive(i) {
        this._getStyleOfSourceHolderByIndex(i).transform = 'translate(' + this.fsLigthbox.sourcesData.slideDistance * window.innerWidth + 'px,0)';
    }

     _getStyleOfSourceHolderByIndex(index) {
        return this.fsLigthbox.elements.sourceHolders[index].current.style;
    }
}