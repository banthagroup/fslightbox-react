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

        if (!this.props._.sourcesData.sourcesTypes[this.props.i])
            this.initRequest();

        isMounted = false;
        isTypeCheckedAndSourceIsNotCreated = false;
    }

    initRequest() {
        const sourceTypeChecker = new SourceTypeChecker();
        sourceTypeChecker.setUrlToCheck(this.props._.data.urls[this.props.i]);
        sourceTypeChecker.getSourceType()
            .then(this.processReceivedSourceType);
    }

    processReceivedSourceType(sourceType) {
        this.props._.sourcesData.sourcesTypes[this.props.i] = sourceType;
        if (isMounted) {
            if (this.source.current === null) {
                this.props._.sourcesData.sourcesToCreateOnConstruct[this.props.i] = true;
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
            <div ref={ this.props._.elements.sourceHolders[this.props.i] }
                 className="fslightbox-source-holder">
                <Source
                    _={ this.props._ }
                    i={ this.props.i }
                    ref={ this.source }
                />
            </div>
        );
    }
}

SourceHolder.propTypes = {
    _: PropTypes.object,
    i: PropTypes.number
};
export default SourceHolder;