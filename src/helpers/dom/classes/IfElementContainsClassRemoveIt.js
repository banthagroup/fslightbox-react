/**
 * @param element React ref - classList is at (element.current.classList)
 * @param className
 */
export function ifElementContainsClassRemoveIt(element, className) {
    const classList = element.current.classList;
    if (classList.contains(className)) {
        classList.remove(className);
    }
}