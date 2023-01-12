/**
 * Enables pinch zooming via default browser functions
 * - 1 touch for 'down' and 'move' event
 * - 0 touches or 'up' event
 */
export function oneOrZeroTouches(e) {
    if (!e.touches) {
        return true;
    }

    return e.touches.length <= 1;
}
