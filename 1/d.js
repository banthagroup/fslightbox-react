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
                </button>                <button onClick={() => this.openLightboxOnSlide(3)}>
			3
                </button>

                <O
                    toggler={this.state.lightboxController.toggler}
                    sources={[
			"t/1.jpg",
			"t/2.mp4","https://www.youtube.com/watch?v=3nQNiWdeH2Q"
                    ]}
                    slide={this.state.lightboxController.slide} autoplay
                />
            </>
        );
    }
}

ReactDOM.render(<DemoComponent />, document.getElementById("a"));
