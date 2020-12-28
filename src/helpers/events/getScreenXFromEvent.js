/**
 * Function retrieves screenX from touch or mouse event
 * @param event
 */
export function getScreenXFromEvent(event) {
    return (event.touches) ?
        event.touches[0].screenX :
        event.screenX;
}
