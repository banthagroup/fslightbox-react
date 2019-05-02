import { Injector } from "../../src/injection/Injector";

const fsLightbox = {
    key: 'fsLightbox'
};

const injector = new Injector(fsLightbox);
// setting up array of params we will be testing if those params are passed to lightbox
const arrayOfParams = [];
for (let i = 0; i < 100; i++) {
    arrayOfParams.push({ key: i });
}
let passedParams = [];

function Dependency() {
    passedParams = arguments;
}

beforeEach(() => {
    passedParams = [];
});

describe('returning correct dependency', () => {
    it('should be typeof dependency', () => {
        expect(injector.injectDependency(Dependency)).toBeInstanceOf(Dependency);
    });
});

describe('returning dependency with lightbox', () => {
    beforeEach(() => {
        injector.injectDependency(Dependency);
    });

    it('should be equal to fsLightbox', () => {
        expect(passedParams[0]).toEqual(fsLightbox);
    });
});

describe('returning dependency without lightbox', () => {
    beforeEach(() => {
        injector.injectDependency(Dependency, [], false);
    });

    it('should be empty', () => {
        expect(Array.from(passedParams).length).toBe(0);
    });
});

describe('returning correct params with fsLightbox', () => {
    beforeEach(() => {
        injector.injectDependency(Dependency, arrayOfParams.slice());
    });

    it('should be equal to fsLightbox', () => {
        expect(passedParams[0]).toEqual(fsLightbox);
    });

    it('should be equal to params array with fsLightbox', () => {
        let passedParamsArray = Array.from(passedParams);
        let params = arrayOfParams.slice();
        params.unshift(fsLightbox);
        expect(passedParamsArray).toEqual(params);
    });
});

describe('returing correct params without fsLightbox', () => {
    beforeEach(() => {
        injector.injectDependency(Dependency, arrayOfParams.slice(), false);
    });

    it('should be equal to params array', () => {
        expect(Array.from(passedParams)).toEqual(arrayOfParams);
    });
});