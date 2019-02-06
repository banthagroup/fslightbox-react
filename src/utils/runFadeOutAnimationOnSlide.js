export const runFadeOutAnimationOnSlide = (elem) => {
    elem.classList.remove('fslightbox-fade-out-animation');
    void elem.offsetWidth;
    elem.classList.add('fslightbox-fade-out-animation');
};