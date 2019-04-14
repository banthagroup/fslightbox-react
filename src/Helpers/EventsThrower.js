import { EVENTS_CONSTANTS_NAMES } from "../Constants/EventsConstants";

export class EventsThrower {
    constructor(props) {
        this.props = props;
    }

    throw(event) {
        return this.props[EVENTS_CONSTANTS_NAMES[event]]();
    }
}

