import React, { useEffect, useRef } from "react";

var r=0,O;
if (typeof window==="object"){O=require("../../1/1/o.js");r=1}

export default function (p) {
	var c = useRef(), s = [], o = useRef(), g = useRef(p.toggler);
	for (var j = 0; j < p.sources.length; j++)
		s[j] = useRef();
        function op(){var j=p.sourceIndex;if(j===undefined)j=p.slide;if(j)j--;else j=0;o.current.open(j)}
	if (React.useInsertionEffect)
		React.useInsertionEffect(()=>{if(!r){O=require("../../1/1/o.js");r=1}},[]);
	useEffect((b) => {
		if(!r){O=require("../../1/1/o.js");r=1}
		if (!o.current) {
			var t = new O.default();
			Object.assign(t.props, p);
			t.props.sources=p.sources.map((e,j)=>{if(typeof e=="string")return e;var cs=s[j].current;c.current.removeChild(cs);return cs.childElementCount>1?cs:cs.firstChild});t.props.maxYoutubeDimensions=p.maxYoutubeVideoDimensions;o.current=t;
                        if (p.openOnMount) op();
                        return
		}
		if (p.toggler!=g.current){g.current=p.toggler;op()}
	}, [p.toggler]);
	return !o.current&&<div ref={c} style={{display:"none"}}>{p.sources.map((e,j)=>typeof e!="string"&&<div ref={s[j]} key={j}>{e}</div>)}</div>
}
// The storage of old toggler's value in a ref is required due to double call of "useEffect" in, e.g., Next.js@15.4.1.
