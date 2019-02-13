import React, { Component } from 'react';
import Source from "./Source.jsx";
import PropTypes from 'prop-types';
import SourceTypeChecker from "../../core/Source/SourceTypeChecker";

class SourceHolder extends Component {

    constructor(props) {
        super(props);
        this.source = React.createRef();

        if (!this.props.fsLightbox.sourcesTypes[this.props.index])
            this.initRequest();
        // component need to be mounted to call method from child by ref
        this._isMounted = false;
        this._isTypeChecked = false;
    }

    initRequest() {
        this.sourceTypeChecker = new SourceTypeChecker();
        this.sourceTypeChecker.setUrlToCheck(this.props.fsLightbox.urls[this.props.index]);
        this.sourceTypeChecker.getSourceType()
            .then(() => this.processReceivedSourceType());
    }

    processReceivedSourceType() {
        this.props.fsLightbox.sourcesTypes[this.props.index] = this.sourceTypeChecker.sourceType;
        if (this._isMounted) {
            if (this.source.current === null) {
                this.props.fsLightbox.sourcesToCreateOnConstruct[this.props.index] = true;
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
            <div ref={ this.props.fsLightbox.elements.sourceHolders[this.props.index] }
                 className="fslightbox-source-holder">
                <Source
                    fsLightbox={ this.props.fsLightbox }
                    index={ this.props.index }
                    ref={ this.source }
                />
            </div>
        );
    }
}

SourceHolder.propTypes = {
    fsLightbox: PropTypes.object,
    index: PropTypes.number
};
export default SourceHolder;