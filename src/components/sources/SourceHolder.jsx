import React, { Component } from 'react';
import Source from "./Source.jsx";
import PropTypes from 'prop-types';
import SourceTypeChecker from "../../core/Source/SourceTypeChecker";

let isMounted;
let isTypeCheckedAndSourceIsNotCreated;

class SourceHolder extends Component {
    constructor(props) {
        super(props);
        // component need to be mounted to call method from child by ref
        this.source = React.createRef();

        if (!this.props._.sourcesData.sourcesTypes[this.props.i])
            this.initRequest();

        isMounted = false;
        isTypeCheckedAndSourceIsNotCreated = false;
    }

    initRequest() {
        this.sourceTypeChecker = new SourceTypeChecker();
        this.sourceTypeChecker.setUrlToCheck(this.props._.data.urls[this.props.i]);
        this.sourceTypeChecker.getSourceType()
            .then(() => this.processReceivedSourceType());
    }

    processReceivedSourceType() {
        this.props._.sourcesData.sourcesTypes[this.props.i] = this.sourceTypeChecker.sourceType;
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