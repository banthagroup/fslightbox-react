import { EVENTS_CONSTANTS_NAMES } from "../constants/EventsConstants";

export class EventsThrower {
    constructor(props) {
        this.props = props;
    }

    throw(event) {
        return this.props[EVENTS_CONSTANTS_NAMES[event]]();
    }
}

