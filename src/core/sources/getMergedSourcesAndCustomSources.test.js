import { getMergedSourcesAndCustomSources } from './getMergedSourcesAndCustomSources';

const fsLightbox = {
    props: {
        customSources: ['first-custom-source', 'second-custom-source']
    }
};

test('merging sources and custom sources into data sources', () => {
    expect(getMergedSourcesAndCustomSources(fsLightbox)).toEqual(['first-custom-source', 'second-custom-source']);

    fsLightbox.props.sources = ['first-source', undefined, 'third-source', 'fourth-source'];

    expect(getMergedSourcesAndCustomSources(fsLightbox)).toEqual([
        'first-custom-source',
        'second-custom-source',
        'third-source',
        'fourth-source'
    ]);

    delete fsLightbox.props.customSources;
    expect(getMergedSourcesAndCustomSources(fsLightbox)).toEqual(['first-source', undefined, 'third-source', 'fourth-source']);

    fsLightbox.props.sources = ['first-source', 'second-source', null]
    fsLightbox.props.customSources = [null, null, null, 'fourth-custom-source']
    expect(getMergedSourcesAndCustomSources(fsLightbox)).toEqual(['first-source', 'second-source', null, 'fourth-custom-source']);
});
