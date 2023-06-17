export function fr(){var i=false;return function(){if(i){return false}i=true;requestAnimationFrame(function(){i=false});return true}}
//There is no need to run a"requestAnimationFrame" resistant to a lightbox close or remont,as this function is not supposed to be ever executed in such conditions.
