import React, { Component } from 'react';
import Source from "./Source.jsx";
import PropTypes from 'prop-types';
import SourceTypeChecker from "../../core/Source/SourceTypeChecker";

class SourceHolder extends Component {

    constructor(props) {
        super(props);
        this.source = React.createRef();

        if (!this.props._.sourcesTypes[this.props.i])
            this.initRequest();
        // component need to be mounted to call method from child by ref
        this._isMounted = false;
        this._isTypeChecked = false;
    }

    initRequest() {
        this.sourceTypeChecker = new SourceTypeChecker();
        this.sourceTypeChecker.setUrlToCheck(this.props._.urls[this.props.i]);
        this.sourceTypeChecker.getSourceType()
            .then(() => this.processReceivedSourceType());
    }

    processReceivedSourceType() {
        this.props._.sourcesTypes[this.props.i] = this.sourceTypeChecker.sourceType;
        if (this._isMounted) {
            if (this.source.current === null) {
                this.props._.sourcesToCreateOnConstruct[this.props.i] = true;
                return;
            }
            this.source.current.createSource();
        } else {
            this._isTypeChecked = true;
        }
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isTypeChecked) {
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