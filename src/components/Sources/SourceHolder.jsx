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

        if (!this.props.sourcesData.sourcesTypes[this.props.i])
            this.initRequest();

        isMounted = false;
        isTypeCheckedAndSourceIsNotCreated = false;
    }

    initRequest() {
        const sourceTypeChecker = new SourceTypeChecker();
        sourceTypeChecker.setUrlToCheck(this.props.data.urls[this.props.i]);
        sourceTypeChecker.getSourceType()
            .then(this.processReceivedSourceType);
    }

    processReceivedSourceType(sourceType) {
        this.props.sourcesData.sourcesTypes[this.props.i] = sourceType;
        if (isMounted) {
            if (this.source.current === null) {
                this.props.sourcesData.sourcesToCreateOnConstruct[this.props.i] = true;
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

        if(!this.props.core.stageSources.isSourceInStage(this.props.i)) {
            this.props.core.sourceHoldersTransformer.transformNegative(this.props.i);
        }

        if (isTypeCheckedAndSourceIsNotCreated) {
            this.source.current.createSource();
        }
    }

    render() {
        return (
            <div ref={ this.props.elements.sourceHolders[this.props.i] }
                 className="fslightbox-source-holder">
                <Source
                    i={ this.props.i }
                    ref={ this.source }
                    collections={ this.props.collections }
                    core={ this.props.core }
                    data={ this.props.data }
                    elements={ this.props.elements }
                    slide={ this.props.slide }
                    sourcesData={ this.props.sourcesData }
                />
            </div>
        );
    }
}

SourceHolder.propTypes = {
    i: PropTypes.number,
    collections: PropTypes.object.isRequired,
    core: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired,
    slide: PropTypes.number.isRequired,
    sourcesData: PropTypes.object.isRequired
};

export default SourceHolder;