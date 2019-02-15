import { SourceTransformer } from "../Transforms/SourceTransformer";
import { SourceSizeAdjuster } from "./SourceSizeAdjuster";

export class SourceComponentsCreator {
    constructor(_) {
        this._ = _;
        this.i = null;
    }

    setIndex(index) {
        this.i = index;
    }

    createSourceTransformer() {
        const sourceTransfomer = new SourceTransformer(this._);
        sourceTransfomer.setIndex(this.i);
        this._.sourceTransformers[this.i] = sourceTransfomer;
    }

    createSourceSizeAdjuster() {
        const sourceSizeAdjuster = new SourceSizeAdjuster(this._);
        sourceSizeAdjuster.setIndex(this.i);
        this._.sourceSizeAdjusters[this.i] = sourceSizeAdjuster;
    }
}