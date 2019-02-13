import Svg from "../../src/components/helpers/Svg";
import { mount } from "enzyme";
import React from 'react';
import FsLightbox from "../../src/FsLightbox";
import { testImageURL, testUrls } from "../schemas/testVariables";
import { createVideoSourceForFsLightbox } from "../__mocks__/helpers/createSourceForFsLightbox";

describe('SVG', () => {
    it('should have props', () => {
        const size = '1em';
        const viewBox = '0 0 20 20';
        const d = "14M.A 4F";
        const svg = mount(
            <Svg size={ size } viewBox={ viewBox } d={ d }/>
        );

        expect(svg.render().hasClass('fslightbox-svg-icon')).toBeTruthy();
        expect(svg.getDOMNode().attributes.getNamedItem('width').value).toEqual(size);
        expect(svg.getDOMNode().attributes.getNamedItem('height').value).toEqual(size);
        expect(svg.getDOMNode().attributes.getNamedItem('viewBox').value).toEqual(viewBox);
        expect(svg.contains(<path d={ d }></path>)).toBeTruthy();
    });
});


describe('Video', () => {
    it('should add poster to video', () => {
        const videosPostersArray = [];
        videosPostersArray[1] = testImageURL;

        const fsLightbox = mount(<FsLightbox
            isOpen={ true }
            urls={ testUrls }
            videosPosters={ videosPostersArray }
        />);

        createVideoSourceForFsLightbox(fsLightbox);
        expect(fsLightbox.instance().elements.sources[1].current.poster).toEqual(videosPostersArray[1]);
    });
});