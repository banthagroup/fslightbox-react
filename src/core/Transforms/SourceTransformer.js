import { CURRENT_POSITION, NEXT_POSITION, PREVIOUS_POSITION } from "../../constants/CoreConstants";

export class SourceTransformer {
    /**
     * @param _ {FsLightbox}
     */
    constructor(_) {
        this._ = _;
        this.i = null;
        this.source = null;
    }

    setIndex(index) {
        this.i = index;
    }

    transform() {
        this.getSourceStagePosition();
    }

    getSourceStagePosition() {
        switch (this.i - this._.slide) {
            case PREVIOUS_POSITION:
                this.transformNegative();
                break;
            case CURRENT_POSITION:
                this.transformZero();
                break;
            case NEXT_POSITION:
                this.transformPositive();
                break;
            default:
                this.notInStage();
        }
    }

    notInStage() {

    }


    transformNegative() {
        this._.elements.sources[this.i].current.style.transform = 'translate(' + -this._.slideDistance * window.innerWidth + 'px,0)';
    }

    transformZero() {
        this._.elements.sources[this.i].current.style.transform = 'translate(0,0)';
    }

    transformPositive() {
        this._.elements.sources[this.i].current.style.transform = 'translate(' + this._.slideDistance * window.innerWidth + 'px,0)';
    }
}