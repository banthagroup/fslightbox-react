import T from"./T.jsx";import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import O from "../o.jsx";class B extends Component {render(){return <div style={{width:"500px",height:"1000px",background:"yellow"}}>B</div>}}
var S=[["t/2.jpg"],["t/ocean.jpg"]];
class DemoComponent extends Component {
    	constructor(props) {
        super(props);

        this.state = {
            lightboxController: {
                toggler: false,
                slide: 1
            },k:0,b:0
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
                <button onClick={()=>{/*setTimeout(()=>{this.setState({b:this.state.b+1})});setTimeout(()=>{this.setState({b:this.state.b+5})},50);*/var k=this.state.k;this.setState({k:k+1})}}>
			U
                </button><T/>

                <O
                    toggler={this.state.lightboxController.toggler}
                    sources={S[this.state.k]}
                    slide={this.state.lightboxController.slide} autoplay openOnMount={false}disableLocalStorage={true}exitFullscreenOnClose={false}loadOnlyCurrentSource={true}disableSlideSwiping={true}key={this.state.k}
                />
            </>
        );
    }
}

ReactDOM.render(<DemoComponent />, document.getElementById("a"));
