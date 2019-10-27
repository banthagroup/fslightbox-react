import React from "react";
import { resolvePropertyChainAtObject } from "./resolvePropertyChainAtObject";

export function testComponentStateForStateChainAndFsLightbox(stateChain, fsLightbox) {
    describe('getter returning false by default', () => {
        it('should return false', () => {
            expect(resolvePropertyChainAtObject(stateChain, fsLightbox.componentsServices).get()).toBe(false);
        });
    });

    describe('after setting true getter should return true', () => {
        beforeAll(() => {
            resolvePropertyChainAtObject(stateChain, fsLightbox.componentsServices).set(true);
        });

        it('should return true', () => {
            expect(resolvePropertyChainAtObject(stateChain, fsLightbox.componentsServices).get()).toBe(true);
        });
    });

    describe('after setting to true and than to false getter should return false', () => {
        beforeAll(() => {
            resolvePropertyChainAtObject(stateChain, fsLightbox.componentsServices).set(true);
            resolvePropertyChainAtObject(stateChain, fsLightbox.componentsServices).set(false);
        });

        it('should return false', () => {
            expect(resolvePropertyChainAtObject(stateChain, fsLightbox.componentsServices).get()).toBe(false);
        });
    });
}
