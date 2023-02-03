import React, { useEffect } from "react";
import { PREFIX, SOURCE_CLASS_NAME } from "../cn/classes-names";

export default function(
    {
        fsLightbox: {
            elements: { sources: sourcesElements },
            collections: { sourceLoadHandlers },
            props: { customAttributes, sources }
        }, i
    }
) {
	useEffect(sourceLoadHandlers[i].handleYoutubeLoad);

	var url = sources[i];

	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var id = url.match(regExp)[2];

	var p = url.split("?")[1];
	p = p ? p : "";

	return <iframe
		ref={sourcesElements[i]}
		className={`${SOURCE_CLASS_NAME} ${PREFIX}youtube-iframe`}
		src={`https://www.youtube.com/embed/${id}?${p}`}
		allowFullScreen={true}
		{
			...(
				customAttributes && customAttributes[i]
					? customAttributes[i]
					: {}
			)
		}
        />;
}
