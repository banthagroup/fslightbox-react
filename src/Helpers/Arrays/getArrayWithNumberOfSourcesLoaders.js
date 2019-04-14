import React from 'react';
import SourceLoader from "../../Components/Loaders/SourceLoader.jsx";

export const getArrayWithNumberOfSourcesLoaders = (howMuchSourceLoaders) => {
    const arrayWithSourcesLoaders = [];
    for (let i = 0; i < howMuchSourceLoaders; i++) {
        arrayWithSourcesLoaders.push(<SourceLoader/>);
    }
    return arrayWithSourcesLoaders;
};