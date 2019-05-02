/**
 * @constructor
 */
export function EventsDispatcher({ props }) {
    this.dispatch = (eventName) => {
        if (props[eventName])
            props[eventName]();
    };
}