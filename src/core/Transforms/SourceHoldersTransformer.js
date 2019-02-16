import { StageHoldersTransformer } from "./StageHoldersTransformer";

export class SourceHoldersTransformer {
    /**
     * @param _ { FsLightbox }
     */
    constructor(_) {
        this._ = _;
    }

    transformStageSources() {
        return new StageHoldersTransformer(this._);
    }

    transformNegative(i) {
        this._.elements.sourceHolders[i].current.style.transform = 'translate(' + -this._.slideDistance * window.innerWidth + 'px,0)';
    }

    transformZero(i) {
        this._.elements.sourceHolders[i].current.style.transform = 'translate(0,0)';
    }

    transformPositive(i) {
        this._.elements.sourceHolders[i].current.style.transform = 'translate(' + this._.slideDistance * window.innerWidth + 'px,0)';
    }
}