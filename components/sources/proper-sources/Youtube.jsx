import React, { useEffect } from "react";
import { PREFIX, SOURCE_CLASS_NAME } from "../../../constants/classes-names";

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
	var p = url.split("?")[1];

	return <iframe
		ref={sourcesElements[i]}
		className={`${SOURCE_CLASS_NAME} ${PREFIX}youtube-iframe`}
		src={
			`https://www.youtube.com/embed/${getYouTubeVideoIdFromUrl(url)}?${p ? p : ""}`
		}
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

function getYouTubeVideoIdFromUrl() {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	return url.match(regExp)[2];
}
