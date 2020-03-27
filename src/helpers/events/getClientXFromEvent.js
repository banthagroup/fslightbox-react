/**
 * Function retrieves clientX from touch or mouse event
 * @param event
 */
export function getClientXFromEvent(event) {
    const { touches, clientX } = event;
    if (touches && touches[1]) return; // Return nothing if there are more than two touch points (pinch/zoom)
    const x = touches ?
        touches[0].clientX :
        clientX;
    return x;
}
