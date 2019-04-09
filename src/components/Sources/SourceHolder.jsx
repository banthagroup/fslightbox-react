import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Source from "./Source.jsx";

const SourceHolder = ({ fsLightbox, index }) => {
    const {
        elements: {
            sourceHolders
        },
        componentsControllers: {
            sourceHolders: sourceHoldersControllers
        }
    } = fsLightbox;
    sourceHoldersControllers[index].init();

    useEffect(() => {
        sourceHoldersControllers[index].componentDidMount();
    });

    return (
        <div ref={ sourceHolders[index] }
             className="fslightbox-source-holder fslightbox-full-dimension">
            <Source
                fsLightbox={ fsLightbox }
                index={ index }
            />
        </div>
    );
};

SourceHolder.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number
};

export default SourceHolder;