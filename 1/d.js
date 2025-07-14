import T from"./T.jsx";import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import O from "./o.jsx";class B extends Component {render(){return <div style={{width:"1000px",height:"500px",background:"yellow"}}>B</div>}}

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
                </button><T/>

                <O
                    toggler={this.state.lightboxController.toggler}
                    sources={[<T/>,<B/>,
			"t/1.jpg",<>Test</>,"t/1.jpg"
                    ]}
                    slide={this.state.lightboxController.slide} autoplay
                />
            </>
        );
    }
}

ReactDOM.render(<DemoComponent />, document.getElementById("a"));
console.log(ReactDOMServer.renderToString(<DemoComponent />));
