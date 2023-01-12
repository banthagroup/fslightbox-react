import React, { Component } from "react";
import FsLightbox from "../FsLightbox.jsx";

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

                <FsLightbox
                    toggler={this.state.lightboxController.toggler}
                    sources={[
			"demo/img/1.jpeg",
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
			"https://www.youtube.com/watch?v=3nQNiWdeH2Q",
			<iframe
				src="https://player.vimeo.com/video/22439234"
				id="vimeo"
				width="1920px"
				height="1080px"
				frameBorder="0"
				allow="autoplay; fullscreen"
				allowFullScreen
			/>,
			""
                    ]}
                    slide={this.state.lightboxController.slide}
                />
            </>
        );
    }
}

export default DemoComponent;
