import React, { Component } from 'react';
import Svg from "../Helpers/Svg.jsx";

class ToolbarButton extends Component {
    render() {
        return (
            <div onClick={ this.props.onClick } className="fslightbox-toolbar-button button-style">
                <Svg viewBox={ this.props.viewBox } size={ this.props.size } d={ this.props.d }/>
            </div>
        );
    }
}

export default ToolbarButton;