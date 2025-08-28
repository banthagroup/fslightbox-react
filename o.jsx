import React, { useEffect, useRef } from "react";

var r=0;
if (typeof window==="object"){require("../../1/1/o.js");r=1}

export default function (p) {
	var c = useRef(), s = [], o = useRef(), g = useRef(p.toggler);
	for (var j = 0; j < p.sources.length; j++)
		s[j] = useRef();
        function op(){var j=p.sourceIndex;if(j===undefined)j=p.slide;if(j)j--;else j=0;o.current.open(j)}
	if (React.useInsertionEffect)
		React.useInsertionEffect(()=>{if(!r){require("../../1/1/o.js");r=1}},[]);
	useEffect((b) => {
		if(!r){require("../../1/1/o.js");r=1}
		if (!o.current) {
			var t = new window.FsLightbox();
			Object.assign(t.props, p);
			t.props.sources=p.sources.map((e,j)=>{if(typeof e=="string")return e;c.current.removeChild(s[j].current);return s[j].current});t.props.onSourceLoad=(o,e,i)=>{if(typeof p.sources[i]!="string"){e.firstChild.style.width="100%";e.firstChild.style.height="100%"}if(p.onSourceLoad)p.onSourceLoad(o,e,i)};t.props.maxYoutubeDimensions=p.maxYoutubeVideoDimensions;o.current=t;
                        if (p.openOnMount) op();
                        return
		}
		if (p.toggler!=g.current){g.current=p.toggler;op()}
	}, [p.toggler]);
	return !o.current&&<div ref={c} style={{display:"none"}}>{p.sources.map((e,j)=>typeof e!="string"&&<div ref={s[j]} key={j}>{e}</div>)}</div>
}
// The storage of old toggler's value in a ref is required due to double call of "useEffect" in, e.g., Next.js@15.4.1.
