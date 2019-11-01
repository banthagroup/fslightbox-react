export function getInitialCurrentIndex({ props: { slide, sourceIndex, source, sources }, }) {
    let initialSourceIndex = 0;

    if (source) {
        initialSourceIndex = sources.indexOf(source);
    } else if (sourceIndex) {
        initialSourceIndex = sourceIndex
    } else if (slide) {
        initialSourceIndex = slide - 1;
    }

    return initialSourceIndex;
}
