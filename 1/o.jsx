import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const a=[];
const aop=[];
function r(o1,o2){if(o1===o2)return 1;var k=Object.keys(o1);if(k.length!==Object.keys(o2).length)return 0;return k.every(k=>r(o1[k],o2[k]))}
function dp(o){delete o.toggler;delete o.sourceIndex;delete o.slide;}

function FsLightbox (p) {var tp={};Object.assign(tp,p);
	var c = useRef(), s = [], [i, si] = useState(-1);
	for (var j = 0; j < p.sources.length; j++)
		s[j] = useRef();
	function n(){var t = new window.FsLightbox();
			Object.assign(t.props, p);
			t.props.sources = p.sources.map((e,j)=>{if (typeof e=="string") return e;c.current.removeChild(s[j].current);return s[j].current});
			i++;a[i]=t;si(i);}
	useEffect((b) => {
		if (i===-1) {
			require("./i.js");n();dp(tp);aop[i]=tp;return
		}var op=aop[i],ot=op.toggler,osi=op.sourceIndex,osl=op.slide,pt=tp.toggler,psi=tp.sourceIndex,psl=tp.slide;dp(tp);console.log(op,tp);if(!r(op,tp)){delete a[i];n()}var j=p.sourceIndex;if(j===undefined)j=p.slide;if(j)j--;else j=0;a[i].open(j);aop[i]=tp;
	}, [p]);
	return <div ref={c} style={{display:"none"}}>{p.sources.map((e,j)=>typeof e!="string"&&<div ref={s[j]} className="fslightboxs"key={j}>{e}</div>)}</div>
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
