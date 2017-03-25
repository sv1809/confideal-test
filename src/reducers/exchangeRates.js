import { UPDATE_RATE } from "../constants/actionTypes";

const initialState = {
    USD_ETH: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_RATE:
            return Object.assign({}, state, { USD_ETH: action.rate });
        default:
            return state;
    }
};