import { ADD_TRANSACTION, DELETE_TRANSACTION, SORT_TRANSACTIONS, APPLY_FILTER } from "../constants/actionTypes";

const initialState = {
    transactions: [],
    filter: null,
    sorting: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    action.transaction
                ]
            };
        case DELETE_TRANSACTION:
            const ind = state.transactions.findIndex(item => item.id === action.id);
            return {
                ...state,
                transactions: [
                    ...state.transactions.slice(0, ind),
                    ...state.transactions.slice(ind + 1)
                ]
            };
        case SORT_TRANSACTIONS:
            return {
                ...state,
                sorting: action.sorting
            };
        case APPLY_FILTER:
            return {
                ...state,
                filter: action.filter
            };
        default:
            return state;
    }
};