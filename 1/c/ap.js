export function ap({ap:a,elements:{sources},iap}){a.p=(i)=>{p(i,"play")};a.c=(o,n)=>{p(o,"pause");p(n,"play")};function p(i,f){if(f=="play"&&!iap)return;var e=sources[i];if(!e)return;e=e.current;if(e){var t=e.tagName;if(t=="VIDEO")e[f]();else if(t=="IFRAME"){var w=e.contentWindow;if(w)w.postMessage(`{"event":"command","func":"${f}Video","args":""}`,"*")}}}}
