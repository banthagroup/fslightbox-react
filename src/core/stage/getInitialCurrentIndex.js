export function getInitialCurrentIndex(
    {
        data: { sources },
        props: { slide, sourceIndex, source },
    }
) {
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
