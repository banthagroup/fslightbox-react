import { eventsPropsNames } from "../constants/eventsPropsNames";

export class EventsThrower {
    constructor(props) {
        this.props = props;
    }

    throw(event) {
        return this.props[eventsPropsNames[event]]();
    }
}

