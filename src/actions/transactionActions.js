import { ADD_TRANSACTION, DELETE_TRANSACTION, SORT_TRANSACTIONS, APPLY_FILTER } from "../constants/actionTypes";

export const addTransaction = transaction => ({
    type: ADD_TRANSACTION,
    transaction
});

export const deleteTransaction = id => ({
    type: DELETE_TRANSACTION,
    id
});

export const sortTransactions = sorting => ({
    type: SORT_TRANSACTIONS,
    sorting
});

export const applyFilter = filter => ({
    type: APPLY_FILTER,
    filter
});