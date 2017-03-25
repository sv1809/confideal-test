import { ADD_TRANSACTION } from "../constants/actionTypes";

export default (state = [], action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return [
                ...state,
                action.transaction
            ];
        default:
            return state;
    }
};