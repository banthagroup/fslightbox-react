import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Source from "./Source.jsx";
import { SourceTypeChecker } from "../../core/Source/SourceType/SourceTypeChecker";

/**
 * @param { FsLightbox }fsLightbox
 * @param { number } index
 */
const SourceHolder = ({ fsLightbox, index }) => {
    const {
        data: { urls },
        sourcesData: {
            sourcesTypes,
            sourcesToCreateOnConstruct,
        },
        elements: {
            sourceHolders
        },
        core: {
            sourceHoldersTransformer: { transformStageSourceHolderAtIndex },
            stageSources: { isSourceInStage }
        }
    } = fsLightbox;
    let isMounted = false;
    let isTypeCheckedAndSourceIsNotCreated = false;

    const sourceCreator = {
        createSource: () => {}
    };

    const initRequest = () => {
        const sourceTypeChecker = new SourceTypeChecker();
        sourceTypeChecker.setUrlToCheck(urls[index]);
        sourceTypeChecker.getSourceType().then(processReceivedSourceType);
    };

    const processReceivedSourceType = (sourceType) => {
        sourcesTypes[index] = sourceType;
        if (isMounted) {
            if (sourceHolders[index].current === null) {
                sourcesToCreateOnConstruct[index] = true;
                return;
            }
            sourceCreator.createSource();
        } else {
            isTypeCheckedAndSourceIsNotCreated = true;
        }
    };

    useEffect(() => {
        isMounted = true;
        if (!isSourceInStage(index)) {
            transformStageSourceHolderAtIndex(index).negative();
        }
        if (isTypeCheckedAndSourceIsNotCreated) {
            sourceCreator.createSource();
        }
    });

    if (!sourcesTypes[index])
        initRequest();

    return (
        <div ref={ sourceHolders[index] }
             className="fslightbox-source-holder fslightbox-full-dimension">
            <Source
                fsLightbox={ fsLightbox }
                index={ index }
                sourceCreator={ sourceCreator }

            />
        </div>
    );
};

SourceHolder.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number
};

export default SourceHolder;