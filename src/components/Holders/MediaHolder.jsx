import React from 'react';
import PropTypes from 'prop-types';
import SourceHolder from "../Sources/SourceHolder.jsx";
import { CURSOR_GRABBING_CLASS_NAME } from "../../constants/CssConstants";

const MediaHolder = ({ fsLightbox }) => {
    const {
        data,
        state,
        elements: {
            mediaHolder
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
    for (let i = 0; i < data.totalSlides; i++) {
        sourceHolders.push(
            <SourceHolder
                fsLightbox={ fsLightbox }
                index={ i }
                key={ i }
            />
        );
    }

    const cursorGrabbingClass = state.isSwipingSlides ? CURSOR_GRABBING_CLASS_NAME : '';

    return (
        <div className={ 'fslightbox-media-holder ' + cursorGrabbingClass }
             onMouseDown={ listener }
             onTouchStart={ listener }
             ref={ mediaHolder }>
            { sourceHolders }
        </div>
    );
};

MediaHolder.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default MediaHolder;