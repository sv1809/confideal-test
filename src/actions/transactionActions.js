import { ADD_TRANSACTION, DELETE_TRANSACTION } from "../constants/actionTypes";

export const addTransaction = transaction => ({
    type: ADD_TRANSACTION,
    transaction
});

export const deleteTransaction = id => ({
    type: DELETE_TRANSACTION,
    id
});