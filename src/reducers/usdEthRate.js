import { UPDATE_RATE } from "../constants/actionTypes";

export default (state = null, action) => {
    switch (action.type) {
        case UPDATE_RATE:
            return +action.rate;
        default:
            return state;
    }
};