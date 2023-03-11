import React, { Component } from "react";
import ReactDOM from "react-dom";
import O from "./o.jsx";

class DemoComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lightboxController: {
                toggler: false,
                slide: 1
            }
        };

        this.openLightboxOnSlide = this.openLightboxOnSlide.bind(this);
    }

    openLightboxOnSlide(number) {
        this.setState({
            lightboxController: {
                toggler: !this.state.lightboxController.toggler,
                slide: number
            }
        });
    }

    render() {
        return (
            <>
                <button onClick={() => this.openLightboxOnSlide(1)}>
			1
                </button>
                <button onClick={() => this.openLightboxOnSlide(2)}>
			2
                </button>

                <O
                    toggler={this.state.lightboxController.toggler}
                    sources={[
			"1.jpg",
			""
                    ]}
                    slide={this.state.lightboxController.slide}
                />
            </>
        );
    }
}

ReactDOM.render(<DemoComponent />, document.getElementById("app"));
