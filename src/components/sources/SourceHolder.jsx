import React, { Component } from 'react';
import Source from "./Source.jsx";
import PropTypes from 'prop-types';
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

    componentDidMount() {
        isMounted = true;
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
                    core={ this.props.core }
                    data={ this.props.data }
                    elements={ this.props.elements }
                    slide={ this.props.slide }
                    sourcesData={ this.props.sourcesData }
                    sourceSizeAdjusters={ this.props.sourceSizeAdjusters }
                />
            </div>
        );
    }
}

SourceHolder.propTypes = {
    i: PropTypes.number,
    core: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    slide: PropTypes.number.isRequired,
    elements: PropTypes.object.isRequired,
    sourcesData: PropTypes.object.isRequired,
    sourceSizeAdjusters: PropTypes.array.isRequired
};

export default SourceHolder;