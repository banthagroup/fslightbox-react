import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Svg from "../Helpers/Svg.jsx";

class ToolbarButton extends Component {
    render() {
        return (
            <div onClick={ this.props.onClick } className="fslightbox-toolbar-button fslightbox-flex-centered">
                <Svg viewBox={ this.props.viewBox } size={ this.props.size } d={ this.props.d }/>
            </div>
        );
    }
}

ToolbarButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    viewBox: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    d: PropTypes.string.isRequired,
};
export default ToolbarButton;