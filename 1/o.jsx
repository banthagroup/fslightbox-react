import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

function FsLightbox (p) {
	var c = React.createRef(), s = [], [o, so] = useState(null);
	for (var i = 0; i < p.sources.length; i++)
		s[i] = React.createRef();
	useEffect(() => {
		if (!o)  {
			require("./i.js");
			var t = new window.FsLightbox();
			Object.assign(t.props, p);
			t.props.sources = p.sources.map((e,i)=>{if (typeof e=="string") return e;c.current.removeChild(s[i].current);return s[i].current});
			so(t);
		} else {
			o.open(p.sourceIndex || p.slide);
		}
	}, [p.toggler]);
	return <div ref={c} style={{display:"none"}}>{p.sources.map((e,i)=>typeof e!="string"&&<div ref={s[i]} className="fslightboxs"key={i}>{e}</div>)}</div>
}

FsLightbox.propTypes = {
    toggler: PropTypes.bool,
    sources: PropTypes.array,

    // slide number controlling
    slide: PropTypes.number,
    source: PropTypes.string,
    sourceIndex: PropTypes.number,

    // events
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onInit: PropTypes.func,
    onShow: PropTypes.func,

    // types
    disableLocalStorage: PropTypes.bool,
    types: PropTypes.array,
    type: PropTypes.string,

    // sources
    customAttributes: PropTypes.array,
    maxYoutubeVideoDimensions: PropTypes.object,
    autoplay: PropTypes.bool,

    // preferences
    disableBackgroundClose: PropTypes.bool,
    disableSlideSwiping: PropTypes.bool,
    exitFullscreenOnClose: PropTypes.bool,
    loadOnlyCurrentSource: PropTypes.bool,
    openOnMount: PropTypes.bool,
    slideDistance: PropTypes.number
};

FsLightbox.defaultProps = {
    slideDistance: 0.3
};

export default FsLightbox;
