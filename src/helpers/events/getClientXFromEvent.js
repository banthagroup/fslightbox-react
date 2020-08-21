/**
 * Function retrieves clientX from touch or mouse event
 * @param event
 */
export function getClientXFromEvent(event) {
    const { touches, clientX } = event;
    if (touches && touches[1]) return; // Return nothing if there is more than one touch point (pinch/zoom)
    const x = touches ?
        touches[0].clientX :
        clientX;
    return x;
}
