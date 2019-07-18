import { Injector } from "./Injector";

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

test('returning correct dependency', () => {
    expect(injector.injectDependency(Dependency)).toBeInstanceOf(Dependency);
});

test('returning correct params with fsLightbox', () => {
    injector.injectDependency(Dependency, arrayOfParams);
    // as arguments object returns object to test it wu will make array from it
    expect(Array.from(passedParams)).toEqual(arrayOfParams);
});
