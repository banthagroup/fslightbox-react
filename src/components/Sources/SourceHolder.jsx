import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Source from "./Source.jsx";
import { SourceTypeChecker } from "../../core/Source/SourceType/SourceTypeChecker";

let isMounted;
let isTypeCheckedAndSourceIsNotCreated;

class SourceHolder extends Component {
    constructor(props) {
        super(props);
        // component need to be mounted to call method from child by ref
        this.source = React.createRef();
        this.processReceivedSourceType = this.processReceivedSourceType.bind(this);

        if (!this.props.fsLightbox.sourcesData.sourcesTypes[this.props.i])
            this.initRequest();

        isMounted = false;
        isTypeCheckedAndSourceIsNotCreated = false;
    }

    initRequest() {
        const sourceTypeChecker = new SourceTypeChecker();
        sourceTypeChecker.setUrlToCheck(this.props.fsLightbox.data.urls[this.props.i]);
        sourceTypeChecker.getSourceType()
            .then(this.processReceivedSourceType);
    }

    processReceivedSourceType(sourceType) {
        this.props.fsLightbox.sourcesData.sourcesTypes[this.props.i] = sourceType;
        if (isMounted) {
            if (this.source.current === null) {
                this.props.fsLightbox.sourcesData.sourcesToCreateOnConstruct[this.props.i] = true;
                return;
            }
            this.source.current.createSource();
        } else {
            isTypeCheckedAndSourceIsNotCreated = true;
        }
    }

    onMouseDownListener(e) {
        e.preventDefault();
    }

    componentDidMount() {
        isMounted = true;
        if (!this.props.fsLightbox.core.stageSources.isSourceInStage(this.props.i)) {
            this.props.fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolderAtIndex(this.props.i).negative();
        }
        if (isTypeCheckedAndSourceIsNotCreated) {
            this.source.current.createSource();
        }
    }

    render() {
        return (
            <div ref={ this.props.fsLightbox.elements.sourceHolders[this.props.i] }
                 className="fslightbox-source-holder fslightbox-full-dimension">
                <Source
                    fsLightbox={ this.props.fsLightbox }
                    i={ this.props.i }
                    ref={ this.source }
                />
            </div>
        );
    }
}

SourceHolder.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    i: PropTypes.number
};

export default SourceHolder;