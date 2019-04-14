import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SourceHolder from "./SourceHolder.jsx";
import { getArrayWithNumberOfSourcesLoaders } from "../../Helpers/Arrays/getArrayWithNumberOfSourcesLoaders";

const SourcesWrapper = ({ fsLightbox }) => {
    const {
        data: { totalSlides },
        componentsStates: {
            sourcesComponents: sourcesComponentsState
        },
        elements: {
            sourcesWrapper
        },
        core: {
            slideSwiping: {
                down: {
                    listener
                }
            }
        },
    } = fsLightbox;
    const sourceHolders = [];
    const [sourcesComponents, setSourcesComponents] = useState(getArrayWithNumberOfSourcesLoaders(totalSlides));
    sourcesComponentsState.get = () => sourcesComponents;
    sourcesComponentsState.set = setSourcesComponents;
    console.log(1);

    for (let i = 0; i < totalSlides; i++) {
        sourceHolders.push(
            <SourceHolder
                fsLightbox={ fsLightbox }
                index={ i }
                key={ i }
            />
        );
    }

    return (
        <div className={ 'fslightbox-media-holder' }
             onMouseDown={ listener }
             onTouchStart={ listener }
             ref={ sourcesWrapper }>
            { sourceHolders }
        </div>
    );
};

SourcesWrapper.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default SourcesWrapper;