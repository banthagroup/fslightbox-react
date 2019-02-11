import FsLightbox from "../../../src/FsLightbox";
import { mount } from "enzyme";
import { testUrls } from "../../schemas/testSchemas";
import React from 'react';
import SourceHolder from "../../../src/components/sources/SourceHolder";


describe('SourceHolder', () => {
    it('should render number of source holders equivalent to number of urls', () => {
        const fsLightbox = mount(<FsLightbox isOpen={ true } urls={ testUrls }/>);
        const mediaHolder = fsLightbox.find('.fslightbox-media-holder');
        const sourceHolders = fsLightbox.instance().elements.sourceHolders;
        for (let i = 0; i < sourceHolders.length; i++) {
            expect(sourceHolders[i].current.classList.contains('fslightbox-source-holder'))
                .toBeTruthy();
        }
        expect(mediaHolder.children().length).toEqual(testUrls.length);
    });

    describe('creating source after asynchronous type check because child was mounted', () => {
        const fsLightbox = mount(<FsLightbox isOpen={ true } urls={ testUrls }/>);
        const sourceHolderInstance = fsLightbox.find('SourceHolder').at(0).instance();
        sourceHolderInstance.source.current.createSource = jest.fn();

        it('should create source after type check', () => {
            sourceHolderInstance.processReceivedSourceType();
            expect(sourceHolderInstance.source.current.createSource).toBeCalledTimes(1);
        });

        it('should not create source after mount', () => {
            sourceHolderInstance.componentDidMount();
            expect(sourceHolderInstance.source.current.createSource).toBeCalledTimes(1);
        })
    });

    describe('not creating source after asynchronous type check because child was not yet mounted', () => {
        const fsLightbox = mount(<FsLightbox isOpen={ true } urls={ testUrls }/>);
        const sourceHolderInstance = fsLightbox.find('SourceHolder').at(0).instance();
        sourceHolderInstance.source.current.createSource = jest.fn();

        it('should not create source after type check because child was no yet mounted', () => {
            sourceHolderInstance._isMounted = false;
            expect(sourceHolderInstance._isTypeChecked).toBeFalsy();
            sourceHolderInstance.processReceivedSourceType();
            expect(sourceHolderInstance.source.current.createSource).not.toBeCalled();
        });

        it('should create source after mount', () => {
            expect(sourceHolderInstance._isTypeChecked).toBeTruthy();
            sourceHolderInstance.componentDidMount();
            expect(sourceHolderInstance.source.current.createSource).toBeCalled();
        })
    });
});