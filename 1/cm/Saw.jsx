import React,{useState,useEffect} from "react";export default function({o:{elements:{sourcesComponents},props:{loadOnlyCurrentSource},saw,sawu,st,stageIndexes:{current}},i}){var[u,su]=useState(false);sawu[i]=function(){su(!u)};return<div ref={saw[i]}>{(i===current||(!loadOnlyCurrentSource&&st.i(i)))?sourcesComponents[i]:<div className="fslightboxl"><div/><div/><div/><div/></div>}</div>}
